import type { IRComponent } from "../../ir/render/nodes.ts";
import type { SourceLocation } from "../../ir/types.ts";
import { setupLocalDefs } from "../../ir/setup.ts";
import type { RewriteRules } from "../context.ts";
import { rewriteExpr } from "./expr-rewrite.ts";

/**
 * A single emittable setup-body local (a `const`-arrow or a function declaration), with its
 * initializer already rewritten for the target. Emitters format the surrounding syntax:
 * `const ${name} = ${expr}` on the six standalone targets, a `${name} = ${expr}` class field on
 * Angular. Statements that declare no emittable definition (e.g. a bare `const x = 1`) are absent
 * here — the analyze pass diagnoses them as INK0121 if referenced.
 */
export interface SetupLocalEmit {
  readonly name: string;
  readonly expr: string;
  readonly span: SourceLocation;
}

/** The setup-body locals a target emits, in source order, initializers rewritten with `rules`. */
export function setupLocalEmits(component: IRComponent, rules: RewriteRules): SetupLocalEmit[] {
  const out: SetupLocalEmit[] = [];
  for (const s of component.setup) {
    for (const def of setupLocalDefs(s.stmt)) {
      out.push({ name: def.name, expr: rewriteExpr(def.initializer, rules), span: s.loc });
    }
  }
  return out;
}
