import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Diagnostic } from "../../../core/diagnostics/codes.ts";
import type { GeneratedFile } from "../../context.ts";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";
import { angularSelector, angularAttrSelector } from "./selector.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * A standalone component's template may only instantiate components declared in its `imports`.
 * A compiled child renders either via its `ink-*` element selector or, for an attribute-selector
 * component/directive, as a bare `inkName` attribute on a native host element
 * (`<button inkButtonBase inkButton>`). Both forms derive deterministically from the imported local
 * names — so any such reference without a matching declared selector is a compile bug (Angular
 * would silently render an unknown element / drop the directive).
 */
function requireTemplateChildrenDeclared(file: GeneratedFile): readonly Diagnostic[] {
  const template = file.contents.match(/template: `([\s\S]*?)` \}\)/)?.[1];
  if (!template) return [];

  const importsList =
    file.contents
      .match(/imports: \[([^\]]*)\]/)?.[1]
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  const declared = new Set([
    ...importsList.map(angularSelector),
    ...importsList.map(angularAttrSelector),
  ]);

  const missing = new Set<string>();
  for (const tag of template.matchAll(/<(ink-[a-z0-9-]+)/g)) {
    if (!declared.has(tag[1]!)) missing.add(tag[1]!);
  }
  // Stacked attribute selectors (`<button inkButtonBase inkButton>`): each must resolve to a
  // declared component/directive. Scoped to attribute position (whitespace before, whitespace/=/>/
  // after) so binding values, text, and `ink-*` tags never false-positive.
  for (const m of template.matchAll(/\s(ink[A-Z]\w*)(?=[\s=/>])/g)) {
    if (!declared.has(m[1]!)) missing.add(m[1]!);
  }

  return [...missing].map((tag) => ({
    code: "INK0110",
    severity: "error",
    title: `Internal compiler error: template instantiates <${tag}> but no matching component is declared in imports: [...]`,
    url: "https://docs.inkline.dev/diagnostics/INK0110",
    loc: { file: file.path, line: 0, column: 0, offset: 0, length: 0 },
  }));
}

export const angularConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "eslint", config: resolve(__dirname, "tsconfigs", "angular.eslint.config.js") },
  typecheck: {
    tsconfig: "",
    dtsImports: ["@angular/core"],
  },
  invariants: [requireFileExtension(".ts"), requireTemplateChildrenDeclared],
};
