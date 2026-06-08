import * as ts from "typescript";
import type { PrimitiveName } from "../../../ir/render/nodes.ts";
import type { PassContext } from "../../types.ts";
import { toLoc } from "./loc.ts";

const KNOWN_PRIMITIVES: ReadonlySet<string> = new Set<PrimitiveName>([
  "createSignal",
  "createMemo",
  "createEffect",
  "createResource",
  "createRef",
  "createContext",
  "provide",
  "useContext",
  "defineComponent",
  "onMount",
  "onCleanup",
  "untrack",
  "batch",
  "defineSlot",
  "defineModel",
  "defineEmits",
]);

export type BindingTable = ReadonlyMap<string, PrimitiveName>;

export function bindPrimitives(sourceFile: ts.SourceFile, ctx: PassContext): BindingTable {
  const table = new Map<string, PrimitiveName>();

  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const spec = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(spec) || spec.text !== "@inkline/core") continue;

    const clause = stmt.importClause;
    if (!clause?.namedBindings) continue;

    if (ts.isNamespaceImport(clause.namedBindings)) {
      ctx.diagnostics.push("INK0001", toLoc(stmt, sourceFile));
      continue;
    }

    if (ts.isNamedImports(clause.namedBindings)) {
      for (const el of clause.namedBindings.elements) {
        const imported = (el.propertyName ?? el.name).text;
        if (KNOWN_PRIMITIVES.has(imported)) {
          table.set(el.name.text, imported as PrimitiveName);
        }
      }
    }
  }

  return table;
}
