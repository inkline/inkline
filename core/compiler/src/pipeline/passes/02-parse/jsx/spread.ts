import * as ts from "typescript";
import type { PassContext } from "../../../types.ts";
import { toLoc } from "../loc.ts";

/**
 * `parseAttributes` drops `{...spread}` — the compiler needs every attribute name at build time
 * to emit per-target bindings, and a spread hides them behind a runtime object.
 *
 * The drop is reported from a single walk of the setup function rather than from `parseAttributes`
 * itself: JSX nested in ternaries, `.map()` callbacks and JSX-valued attributes is re-parsed by the
 * lower pass, so reporting at the drop site would either miss those trees or double-report them.
 */
export function reportSpreadAttributes(
  setupFn: ts.Node,
  sourceFile: ts.SourceFile,
  ctx: PassContext,
): void {
  const visit = (node: ts.Node): void => {
    if (ts.isJsxSpreadAttribute(node)) {
      ctx.diagnostics.push("INK0071", toLoc(node, sourceFile));
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(setupFn, visit);
}
