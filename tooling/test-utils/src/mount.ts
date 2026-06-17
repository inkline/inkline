import { mkdtempSync, writeFileSync, mkdirSync, rmSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import type { GeneratedFile, TargetName } from "@inkline/compiler";

export interface MountResult {
  readonly html: string;
  readonly warnings: readonly string[];
}

/**
 * How to mount an Angular attribute-selector entry. A styling directive (`[inkButton]`) can't be
 * reflected for a host tag and isn't a standalone element, so the caller (which knows the registry)
 * supplies the native host tag, the stacked attribute selectors, and the chain's exported class
 * names to import from the entry module. Omit for `ink-*` element/wrapper entries (auto-reflected).
 */
export interface AngularMountHost {
  readonly tag: string;
  readonly attrs: readonly string[];
  readonly imports: readonly string[];
}

const MOUNTABLE_TARGETS: ReadonlySet<TargetName> = new Set([
  "react",
  "vue",
  "solid",
  "svelte",
  "angular",
]);

export function isMountable(target: TargetName): boolean {
  return MOUNTABLE_TARGETS.has(target);
}

/**
 * SSR-render a generated component and return its HTML. `supportingFiles` are sibling generated
 * files (e.g. the headless components a styled component imports) written alongside the entry so
 * relative imports resolve. Files importing `virtual:styleframe` get a deterministic stub recipe
 * module (each recipe returns its base class, e.g. `inputGroupRecipe()` → `"input-group"`, plus
 * `--key-value` modifiers for set props).
 *
 * For Angular, `props.__slots` (a `{ slotName: html }` record, `"default"` for the default slot)
 * projects content into the component's slots.
 */
export async function mountForTarget(
  target: TargetName,
  file: GeneratedFile,
  props?: Record<string, unknown>,
  supportingFiles?: readonly GeneratedFile[],
  angularHost?: AngularMountHost,
): Promise<MountResult> {
  if (!isMountable(target)) {
    throw new Error(
      `Target "${target}" does not support SSR mounting. Supported: ${[...MOUNTABLE_TARGETS].join(", ")}`,
    );
  }

  const warnings: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

  try {
    const { html, stderr } = await mountViaTempFile(
      target,
      file,
      props,
      supportingFiles ?? [],
      angularHost,
    );
    // The sandbox routes runtime logging to stderr; surface it as warnings for debuggability.
    if (stderr.trim()) warnings.push(...stderr.trim().split("\n"));
    return { html, warnings };
  } finally {
    console.warn = origWarn;
  }
}

async function mountViaTempFile(
  target: TargetName,
  file: GeneratedFile,
  props: Record<string, unknown> | undefined,
  supportingFiles: readonly GeneratedFile[],
  angularHost: AngularMountHost | undefined,
): Promise<{ html: string; stderr: string }> {
  const tmp = mkdtempSync(join(tmpdir(), "ink-mount-"));

  try {
    const allFiles = [file, ...supportingFiles];
    let entryPath = file.path;

    if (target === "angular") {
      entryPath = (await writeAngularModules(tmp, allFiles)).get(file.path)!;
    } else {
      writeStyleframeShim(tmp, allFiles);
      for (const f of allFiles) {
        const fullPath = join(tmp, f.path);
        mkdirSync(dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, rewriteStyleframeImport(f.contents, f.path), "utf-8");
      }
    }

    const nodeModulesSource = join(process.cwd(), "node_modules");
    const nodeModulesDest = join(tmp, "node_modules");
    if (existsSync(nodeModulesSource) && !existsSync(nodeModulesDest)) {
      symlinkSync(nodeModulesSource, nodeModulesDest, "dir");
    }

    const mountScript = buildMountScript(target, `./${entryPath}`, props, angularHost);
    const mountPath = join(tmp, "__mount__.mjs");
    writeFileSync(mountPath, mountScript, "utf-8");

    const { execFile } = await import("node:child_process");
    return await new Promise<{ html: string; stderr: string }>((resolve, reject) => {
      execFile(
        process.execPath,
        ["--experimental-strip-types", "--experimental-transform-types", mountPath],
        { cwd: tmp, timeout: 30_000 },
        (err, stdout, stderr) => {
          if (err) reject(new Error(`Mount failed for ${target}: ${stderr || err.message}`));
          else resolve({ html: stdout.trim(), stderr });
        },
      );
    });
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ── virtual:styleframe stub ──────────────────────────────────────────

const STYLEFRAME_SHIM = "__styleframe__.mjs";

/** Named value imports from `virtual:styleframe` across the given files (the module's exported names). */
function styleframeImportNames(files: readonly GeneratedFile[]): string[] {
  const names = new Set<string>();
  for (const f of files) {
    for (const m of f.contents.matchAll(
      /import\s*\{([^}]*)\}\s*from\s*["']virtual:styleframe["']/g,
    )) {
      for (const entry of m[1]!.split(",")) {
        const trimmed = entry.trim();
        if (!trimmed || trimmed.startsWith("type ")) continue;
        names.add(trimmed.split(/\s+as\s+/)[0]!.trim());
      }
    }
  }
  return [...names];
}

/**
 * A deterministic recipe stub: `inputGroupRecipe({ size: "md" })` → `"input-group input-group--size-md"`.
 * The base class is the recipe name minus its `Recipe` suffix, kebab-cased — matching the real
 * theme's base class names so assertions read naturally.
 */
function writeStyleframeShim(tmp: string, files: readonly GeneratedFile[]): void {
  const names = styleframeImportNames(files);
  if (names.length === 0) return;

  const kebab = (name: string) =>
    name
      .replace(/Recipe$/, "")
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase();

  const lines = names.map(
    (n) =>
      `export const ${n} = (props = {}) => ["${kebab(n)}", ...Object.entries(props)` +
      `.filter(([, v]) => v != null && v !== false)` +
      `.map(([k, v]) => (v === true ? "${kebab(n)}--" + k : "${kebab(n)}--" + k + "-" + v))].join(" ");`,
  );
  writeFileSync(join(tmp, STYLEFRAME_SHIM), lines.join("\n") + "\n", "utf-8");
}

/** Rewrite a file's `virtual:styleframe` import to the relative path of the stub module. */
function rewriteStyleframeImport(contents: string, filePath: string): string {
  const depth = filePath.split("/").length - 1;
  const rel = depth === 0 ? `./${STYLEFRAME_SHIM}` : `${"../".repeat(depth)}${STYLEFRAME_SHIM}`;
  return contents.replaceAll(`"virtual:styleframe"`, JSON.stringify(rel));
}

// ── Angular: transpile decorator TS to runnable ESM ─────────────────

/**
 * Angular's JIT runtime cannot discover signal-based members (`input()`, `model()`, `output()`,
 * `viewChild()`) — they're instance fields, invisible before instantiation. Real builds apply the
 * official compiler transform that registers them as decorator metadata; this mirrors it for the
 * harness by emitting the equivalent runtime decorator calls for the shapes our codegen produces.
 */
function jitSignalMetadata(source: string): string {
  const className = source.match(/export class (\w+)/)?.[1];
  if (!className) return "";

  const lines: string[] = [];
  const memberRe = /^(\w+) = (input\.required|input|model|output|viewChild)(?:<.*?>)?\((.*)\)$/gm;
  for (const m of source.matchAll(memberRe)) {
    const [, field, kind, args] = m as unknown as [string, string, string, string];
    const proto = `${className}.prototype, ${JSON.stringify(field)}`;
    switch (kind) {
      case "input":
      case "input.required":
        lines.push(
          `__NgInput({ isSignal: true, alias: ${JSON.stringify(field)}, required: ${kind === "input.required"} })(${proto});`,
        );
        break;
      case "model": {
        const alias = args.match(/alias:\s*["']([^"']+)["']/)?.[1] ?? field;
        lines.push(
          `__NgInput({ isSignal: true, alias: ${JSON.stringify(alias)}, required: false })(${proto});`,
          `__NgOutput(${JSON.stringify(`${alias}Change`)})(${proto});`,
        );
        break;
      }
      case "output":
        lines.push(`__NgOutput()(${proto});`);
        break;
      case "viewChild": {
        const marker = args.match(/["']([^"']+)["']/)?.[1];
        if (marker) {
          lines.push(`__NgViewChild(${JSON.stringify(marker)}, { isSignal: true })(${proto});`);
        }
        break;
      }
    }
  }

  if (lines.length === 0) return "";
  return (
    `\nimport { Input as __NgInput, Output as __NgOutput, ViewChild as __NgViewChild } from "@angular/core";\n` +
    lines.join("\n") +
    "\n"
  );
}

/**
 * Angular output is plain TypeScript with decorators — Node's type stripping cannot run it, so
 * transpile each file (experimental decorators) to an `.mjs` sibling and rewrite relative import
 * specifiers to match. Returns the original-path → written-path mapping.
 */
async function writeAngularModules(
  tmp: string,
  files: readonly GeneratedFile[],
): Promise<Map<string, string>> {
  const ts = (await import("typescript")).default;
  writeStyleframeShim(tmp, files);

  const written = new Map<string, string>();
  for (const f of files) {
    if (f.path.endsWith(".css") || f.path.endsWith(".map")) continue;

    const source = rewriteStyleframeImport(f.contents, f.path);
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    }).outputText;

    // Relative specifiers in the generated output are extensionless (`../headless/X.component`);
    // point them at the transpiled `.mjs` siblings for Node ESM resolution.
    const resolved =
      transpiled.replace(
        /(from\s*")(\.{1,2}\/[^"]+)(")/g,
        (match, pre: string, spec: string, post: string) =>
          spec.endsWith(".mjs") || spec.endsWith(".css") ? match : `${pre}${spec}.mjs${post}`,
      ) + jitSignalMetadata(f.contents);

    const outPath = `${f.path.replace(/\.ts$/, "")}.mjs`;
    const fullPath = join(tmp, outPath);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, resolved, "utf-8");
    written.set(f.path, outPath);
  }
  return written;
}

function buildMountScript(
  target: TargetName,
  componentPath: string,
  props?: Record<string, unknown>,
  angularHost?: AngularMountHost,
): string {
  const propsJson = JSON.stringify(props ?? {});

  switch (target) {
    case "react":
      return `
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const el = React.createElement(C, ${propsJson});
process.stdout.write(renderToStaticMarkup(el));
`;
    case "vue":
      return `
import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const app = createSSRApp(C, ${propsJson});
renderToString(app).then(html => process.stdout.write(html));
`;
    case "solid":
      return `
import { renderToString } from "solid-js/web";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const html = renderToString(() => C(${propsJson}));
process.stdout.write(html);
`;
    case "svelte":
      return `
import { render } from "svelte/server";
import Component from "${componentPath}";
const C = Component.default ?? Component;
const result = render(C, { props: ${propsJson} });
process.stdout.write(result.body);
`;
    case "angular":
      // JIT-compile (via the @angular/compiler import) and SSR the component inside a generated
      // host whose template binds each prop and projects `__slots` entries as slot content. An
      // attribute-selector entry renders on its native host tag with the selector attributes
      // present: either auto-derived from a reflected `tag[attr]` element selector, or — for a
      // styling directive (not reflectable, not a standalone element) — from an explicit host spec.
      return `
import "@angular/compiler";
import { Component, provideZonelessChangeDetection, reflectComponentType } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import * as platformServer from "@angular/platform-server";
import * as mod from "${componentPath}";

// stdout carries only the rendered HTML; route Angular's runtime logging (e.g. the dev-mode
// banner) to stderr.
console.log = (...args) => console.error(...args);
console.info = (...args) => console.error(...args);

const hostSpec = ${JSON.stringify(angularHost ?? null)};
let imports, tag, attrs;
if (hostSpec) {
  imports = hostSpec.imports.map((n) => mod[n]);
  tag = hostSpec.tag;
  attrs = hostSpec.attrs;
} else {
  const candidates = Object.values(mod).filter((v) => typeof v === "function");
  const C = mod.default ?? candidates.find((v) => reflectComponentType(v) != null);
  const mirror = reflectComponentType(C);
  if (!mirror) throw new Error("No Angular component found in module");
  const selector = mirror.selector.split(",")[0].trim();
  // Parse \`tag[attrA][attrB]\` → native host tag + the attribute selectors present on it.
  tag = (selector.match(/^[a-zA-Z][\\w-]*/) || ["div"])[0];
  attrs = [...selector.matchAll(/\\[([\\w-]+)\\]/g)].map((m) => m[1]);
  imports = [C];
}

const allProps = ${propsJson};
const { __slots = {}, ...props } = allProps;
const bindings = Object.keys(props).map((k) => \`[\${k}]="props['\${k}']"\`).join(" ");
const slotContent = Object.entries(__slots)
  .map(([name, html]) => name === "default" ? html : \`<ng-container ngProjectAs="[slot=\${name}]">\${html}</ng-container>\`)
  .join("");
const attrStr = attrs.length ? " " + attrs.join(" ") : "";

class HostBase { props = props; }
const Host = Component({
  standalone: true,
  selector: "mount-host",
  imports,
  template: \`<\${tag}\${attrStr} \${bindings}>\${slotContent}</\${tag}>\`,
})(HostBase) ?? HostBase;

const providers = [provideZonelessChangeDetection()];
if (typeof platformServer.provideServerRendering === "function") {
  providers.push(platformServer.provideServerRendering());
}

// Angular v21 hands the bootstrap callback a BootstrapContext that server bootstraps require.
const html = await platformServer.renderApplication(
  (context) => bootstrapApplication(Host, { providers }, context),
  { document: "<!DOCTYPE html><html><head></head><body><mount-host></mount-host></body></html>" },
);

const match = html.match(/<mount-host[^>]*>([\\s\\S]*?)<\\/mount-host>/);
let inner = match ? match[1] : html;
inner = inner
  .replace(/ ng-version="[^"]*"/g, "")
  .replace(/ ng-server-context="[^"]*"/g, "")
  .replace(/ ng-reflect-[a-z-]+="[^"]*"/g, "")
  .replace(/<!--[\\s\\S]*?-->/g, "");
process.stdout.write(inner.trim());
`;
    default:
      throw new Error(`No mount script for target "${target}"`);
  }
}
