// Real `.ink.tsx` coverage via the React target. The compiler already emits a `react.tsx → .ink.tsx`
// source map; here we transpile that React output to runnable ESM (carrying a `js → react.tsx` map),
// COMPOSE the two into a single `js → .ink.tsx` map inlined into the module, then dynamic-`import()` and
// render it IN THE WORKER. Vitest's V8 coverage instruments the executed JS natively and remaps it back
// to the authored `.ink.tsx` — no child process, no NODE_V8_COVERAGE merge.
//
// `coverInkViaReact` is a no-op unless a coverage run is active, so a normal `vp test` pays nothing.

import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import * as remappingModule from "@ampproject/remapping";
import type { GeneratedFile, InklineConfig } from "@inkline/compiler";
import { compileComponent } from "./compile.ts";
import { resolveComponent } from "./resolve.ts";
import { writeStyleframeShim, rewriteStyleframeImport } from "./styleframe-shim.ts";

// @ampproject/remapping ships no package "type", so its .d.ts is read as CJS while the runtime resolves
// the ESM build; the resulting binding isn't typed as callable even though it is. Bridge with a cast.
const remapping = (remappingModule.default ?? remappingModule) as unknown as (
  map: string,
  loader: (file: string) => string | null,
) => { toString(): string };

export interface CoverResult {
  readonly html: string;
  readonly warnings: readonly string[];
}

/**
 * True only when the test run was started with coverage enabled. Read from the Vitest worker config —
 * the only reliable in-worker signal (NODE_V8_COVERAGE is unset; the V8 provider uses the inspector).
 */
function isCoverageActive(): boolean {
  const worker = (
    globalThis as { __vitest_worker__?: { config?: { coverage?: { enabled?: boolean } } } }
  ).__vitest_worker__;
  return worker?.config?.coverage?.enabled === true;
}

/** Walk up from a file to the nearest directory containing a `package.json` (filesystem root if none). */
export function findPackageRoot(startFile: string): string {
  let dir = dirname(startFile);
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "package.json"))) return dir;
    dir = dirname(dir);
  }
  return dir;
}

/**
 * Transpile one React `.tsx` GeneratedFile to ESM JS and inline a `js → .ink.tsx` source map composed
 * from the TypeScript transpile map (`js → react.tsx`) and the compiler's map (`react.tsx → .ink.tsx`).
 */
export function transformReactFileToMjs(file: GeneratedFile): string {
  const transpiled = ts.transpileModule(file.contents, {
    fileName: file.path,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      sourceMap: true,
    },
  });

  let code = transpiled.outputText.replace(/\n?\/\/# sourceMappingURL=.*$/m, "");
  const mapB = transpiled.sourceMapText;
  const mapA = file.sourceMap;
  if (mapB && mapA) {
    // Loader returns Map A (react.tsx → .ink.tsx) for the intermediate; null once the chain reaches
    // the original .ink.tsx. Result: a single js → .ink.tsx map.
    const composed = remapping(mapB, (f) => (f.endsWith(".ink.tsx") ? null : mapA));
    const b64 = Buffer.from(composed.toString()).toString("base64");
    code += `\n//# sourceMappingURL=data:application/json;base64,${b64}\n`;
  }
  return code;
}

/** Point extensionless relative specifiers at their `.mjs` siblings for Node ESM resolution. */
function addMjsExtensions(code: string): string {
  return code.replace(
    /(from\s*")(\.{1,2}\/[^"]+)(")/g,
    (match, pre: string, spec: string, post: string) =>
      /\.(mjs|js|css)$/.test(spec) ? match : `${pre}${spec}.mjs${post}`,
  );
}

const reactTsx = (files: readonly GeneratedFile[]) => files.filter((f) => f.path.endsWith(".tsx"));

async function compileToReact(
  absPath: string,
  config?: Partial<InklineConfig>,
): Promise<readonly GeneratedFile[]> {
  const result = await compileComponent(absPath, { targets: ["react"], config });
  return result.filesFor("react");
}

const cleanedRoots = new Set<string>();
const prepared = new Map<string, Promise<string>>();

/**
 * Compile the styled entry + its headless parts to React, lay them out as `styled/` and `headless/`
 * `.mjs` siblings (matching the inter-file `../headless/X` specifiers the compiler emits), and return
 * the entry module's path. Cached per component, per worker.
 */
async function prepare(
  importMetaUrl: string,
  styledRel: string,
  headlessRels: readonly string[],
  config: Partial<InklineConfig> | undefined,
): Promise<string> {
  const entryAbs = resolveComponent(importMetaUrl, styledRel);
  let pending = prepared.get(entryAbs);
  if (pending) return pending;

  pending = (async () => {
    const workerId = process.env.VITEST_WORKER_ID ?? "0";
    const root = join(findPackageRoot(entryAbs), ".coverage-artifacts", `w${workerId}`);
    if (!cleanedRoots.has(root)) {
      rmSync(root, { recursive: true, force: true });
      cleanedRoots.add(root);
    }
    const subdir = join(root, basename(entryAbs).replace(/\W+/g, "_"));

    const styledFiles = await compileToReact(entryAbs, config);
    const headlessGroups = await Promise.all(
      headlessRels.map((rel) => compileToReact(resolveComponent(importMetaUrl, rel), config)),
    );

    mkdirSync(subdir, { recursive: true });
    writeStyleframeShim(subdir, [...styledFiles, ...headlessGroups.flat()]);

    const layout: { file: GeneratedFile; outRel: string }[] = [];
    for (const f of reactTsx(styledFiles)) {
      layout.push({ file: f, outRel: `styled/${f.path.replace(/\.tsx$/, ".mjs")}` });
    }
    for (const group of headlessGroups) {
      for (const f of reactTsx(group)) {
        layout.push({ file: f, outRel: `headless/${f.path.replace(/\.tsx$/, ".mjs")}` });
      }
    }

    for (const { file, outRel } of layout) {
      const code = addMjsExtensions(rewriteStyleframeImport(transformReactFileToMjs(file), outRel));
      const outPath = join(subdir, outRel);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, code, "utf-8");
    }

    const entryFile = reactTsx(styledFiles)[0]!;
    return join(subdir, "styled", entryFile.path.replace(/\.tsx$/, ".mjs"));
  })();

  prepared.set(entryAbs, pending);
  return pending;
}

/**
 * Ungated implementation: prepares the React modules, imports the entry, and renders it with `props`.
 * Exported for direct unit testing (the public `coverInkViaReact` gates this behind a coverage run).
 * Render failures are reported as warnings — coverage must never fail a behavioral test.
 */
export async function renderForCoverage(
  importMetaUrl: string,
  styledRel: string,
  headlessRels: readonly string[] = [],
  props: Record<string, unknown> = {},
  config?: Partial<InklineConfig>,
): Promise<CoverResult> {
  const warnings: string[] = [];
  try {
    const entryMjs = await prepare(importMetaUrl, styledRel, headlessRels, config);
    const mod = (await import(pathToFileURL(entryMjs).href)) as Record<string, unknown>;
    // The compiled React module exports a single component function (named, no default export); a
    // missing/non-function export falls through to createElement and is caught below as a warning.
    const component = Object.values(mod).find((v) => typeof v === "function");

    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const { __slots, ...rest } = props as { __slots?: Record<string, string> };
    const children = __slots?.default;
    const html = renderToStaticMarkup(
      createElement(component as never, rest as Record<string, unknown>, children),
    );
    return { html, warnings };
  } catch (err) {
    warnings.push(`Coverage render failed for ${styledRel}: ${(err as Error).message}`);
    return { html: "", warnings };
  }
}

/**
 * Drive the same component the behavioral test mounts, but through the React target, so V8 coverage
 * attributes the execution back to the authored `.ink.tsx`. No-op unless coverage is active.
 */
export async function coverInkViaReact(
  importMetaUrl: string,
  styledRel: string,
  headlessRels: readonly string[] = [],
  props: Record<string, unknown> = {},
  config?: Partial<InklineConfig>,
): Promise<CoverResult> {
  if (!isCoverageActive()) return { html: "", warnings: [] };
  return renderForCoverage(importMetaUrl, styledRel, headlessRels, props, config);
}
