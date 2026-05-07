import * as ts from "typescript";

import type { PrimitiveName } from "./ir/nodes.ts";

/** Module specifier the compiler recognises as the source of Inkline primitives. */
export const INKLINE_CORE_MODULE = "@inkline/core";

/**
 * The closed set of primitives that may be imported from `@inkline/core`.
 * Anything else imported from that module is ignored by the parser (and may
 * be flagged by an ESLint rule in a follow-up package).
 */
export const PRIMITIVE_SET: ReadonlySet<PrimitiveName> = new Set<PrimitiveName>([
  "createSignal",
  "createMemo",
  "createEffect",
  "createRef",
  "defineComponent",
  "defineSlot",
  "untrack",
  "batch",
  "onMount",
  "onCleanup",
  "$bind",
  "$on",
  "$if",
  "$for",
]);

/** Primitives whose return value (or first tuple element) is reactive when read. */
export const REACTIVE_PRODUCING_PRIMITIVES: Set<PrimitiveName> = new Set<PrimitiveName>([
  "createSignal",
  "createMemo",
]);

/** Primitives whose call expression itself executes a reactive scope. */
export const TRACKING_SCOPE_PRIMITIVES: Set<PrimitiveName> = new Set<PrimitiveName>([
  "createEffect",
  "createMemo",
  "onMount",
  "onCleanup",
]);

/** Primitives that establish an untracked scope for nested signal reads. */
export const UNTRACK_SCOPE_PRIMITIVES: Set<PrimitiveName> = new Set<PrimitiveName>([
  "untrack",
  "batch",
]);

/**
 * Result of resolving an import specifier from `@inkline/core` to a
 * compiler-recognised primitive. `localName` reflects any aliasing
 * (`createSignal as cs` → `localName: "cs"`, `primitive: "createSignal"`),
 * which the parser uses to identify call sites by their local binding.
 */
export interface ImportRecord {
  primitive: PrimitiveName;
  /** The local name as imported (may be aliased: `createSignal as cs`). */
  localName: string;
  importNode: ts.ImportSpecifier | ts.NamespaceImport;
}

/**
 * Scan import declarations and build a local-name → primitive map for
 * imports that originate from `@inkline/core`.
 *
 * Behaviour:
 *
 * - Only `import { ... } from "@inkline/core"` named imports are honoured.
 * - Each specifier's `propertyName ?? name` is matched against
 *   {@link PRIMITIVE_SET}; non-primitive named imports are ignored.
 * - Aliased imports (`createSignal as cs`) keep the *local* name (`cs`) as
 *   the map key so call-site lookups by binding work.
 * - Namespace imports (`import * as core from "@inkline/core"`) are
 *   intentionally skipped — the per-target generators expect direct named
 *   bindings. The parser layer flags this case with a diagnostic.
 * - Default imports and type-only imports are also skipped.
 * - Imports from any module specifier other than `"@inkline/core"` are ignored.
 */
export function collectPrimitiveImports(
  imports: readonly ts.ImportDeclaration[],
): Map<string, ImportRecord> {
  const records = new Map<string, ImportRecord>();
  for (const decl of imports) {
    const moduleSpecifier = decl.moduleSpecifier;
    if (!ts.isStringLiteral(moduleSpecifier)) continue;
    if (moduleSpecifier.text !== INKLINE_CORE_MODULE) continue;
    const clause = decl.importClause;
    if (!clause) continue;
    const named = clause.namedBindings;
    if (named && ts.isNamedImports(named)) {
      for (const specifier of named.elements) {
        const importedName = (specifier.propertyName ?? specifier.name).text;
        if (!isPrimitiveName(importedName)) continue;
        records.set(specifier.name.text, {
          primitive: importedName,
          localName: specifier.name.text,
          importNode: specifier,
        });
      }
    }
  }
  return records;
}

/** Type guard — narrows an arbitrary string to a known primitive name. */
export function isPrimitiveName(name: string): name is PrimitiveName {
  return PRIMITIVE_SET.has(name as PrimitiveName);
}
