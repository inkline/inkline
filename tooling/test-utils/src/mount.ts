import { mkdtempSync, writeFileSync, mkdirSync, rmSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import type { GeneratedFile, TargetName } from "@inkline/compiler";
import { writeStyleframeShim, rewriteStyleframeImport } from "./styleframe-shim.ts";

export interface MountResult {
  readonly html: string;
  readonly warnings: readonly string[];
}

// Qwik is intentionally absent: there is no stable Qwik-SSR-in-Node path, so its interactive
// behaviour ($() QRL handlers) is verified at the codegen layer only. See INK-31 and
// apps/storybook/AGENTS.md → "Qwik interactive-behaviour verification boundary".
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
  options?: { readonly componentName?: string },
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
      options?.componentName,
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
  componentName: string | undefined,
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

    const mountScript = buildMountScript(target, `./${entryPath}`, props, componentName);
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

// ── Angular: transpile decorator TS to runnable ESM ─────────────────

/**
 * Angular's JIT runtime cannot discover signal-based members (`input()`, `model()`, `output()`,
 * `viewChild()`) — they're instance fields, invisible before instantiation. Real builds apply the
 * official compiler transform that registers them as decorator metadata; this mirrors it for the
 * harness by emitting the equivalent runtime decorator calls for the shapes our codegen produces.
 */
function jitSignalMetadata(source: string): string {
  // A file may declare more than one component class (a headless component emits both an
  // element-selector wrapper and an attribute-selector host variant). Register each class's signal
  // members against that class, scoping by source region so members aren't cross-registered.
  const classMatches = [...source.matchAll(/export class (\w+)/g)];
  if (classMatches.length === 0) return "";

  const lines: string[] = [];
  const memberRe = /^(\w+) = (input\.required|input|model|output|viewChild)(?:<.*?>)?\((.*)\)$/gm;
  for (let i = 0; i < classMatches.length; i++) {
    const className = classMatches[i]![1]!;
    const start = classMatches[i]!.index!;
    const end = i + 1 < classMatches.length ? classMatches[i + 1]!.index! : source.length;
    const region = source.slice(start, end);
    for (const m of region.matchAll(memberRe)) {
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
  componentName?: string,
): string {
  const propsJson = JSON.stringify(props ?? {});
  // When a file exports more than one component (a headless component's element-selector wrapper +
  // its attribute-selector host variant), pick the requested export by name; otherwise fall back.
  const pick = componentName ? `mod[${JSON.stringify(componentName)}] ?? ` : "";

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
      // host whose template binds each prop and projects `__slots` entries as slot content.
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

const candidates = Object.values(mod).filter((v) => typeof v === "function");
const C = ${pick}mod.default ?? candidates.find((v) => reflectComponentType(v) != null);
const mirror = reflectComponentType(C);
if (!mirror) throw new Error("No Angular component found in module");
// A selector may be an element (\`ink-button\`) or an attribute on a native element
// (\`button[ink-button]\`); split the latter into its tag + attribute for the host template.
const selectorRaw = mirror.selector.split(",")[0].trim();
const br = selectorRaw.indexOf("[");
const hostTag = br === -1 ? selectorRaw : selectorRaw.slice(0, br);
const hostAttr = br === -1 ? "" : " " + selectorRaw.slice(br + 1, -1);

const allProps = ${propsJson};
const { __slots = {}, ...props } = allProps;
const bindings = Object.keys(props).map((k) => \`[\${k}]="props['\${k}']"\`).join(" ");
const slotContent = Object.entries(__slots)
  .map(([name, html]) => name === "default" ? html : \`<ng-container ngProjectAs="[slot=\${name}]">\${html}</ng-container>\`)
  .join("");

class HostBase { props = props; }
const Host = Component({
  standalone: true,
  selector: "mount-host",
  imports: [C],
  template: \`<\${hostTag}\${hostAttr} \${bindings}>\${slotContent}</\${hostTag}>\`,
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
