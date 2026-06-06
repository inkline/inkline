import type { Code } from "../code-ir/nodes.ts";
import { cExpr } from "../code-ir/builders.ts";

/**
 * Strip the JSX-expression-container braces from a root render node.
 *
 * Brace-wrapped expression kinds (`If`/`Switch`/`For`/`Expression`/slot placeholders) are emitted as
 * `{…}` so they read as valid *children* of a JSX element. At the root of a `return (…)` there is no
 * enclosing JSX, so the braces are parsed as an object literal (`return ({props.type === …})` →
 * "Expected `,` or `}`"). Strip them to leave a bare expression — `return (props.type ? … : …)` —
 * which is valid. Element/fragment/component roots are returned untouched.
 */
export function unwrapRootExpr(code: Code): Code {
  if (code.kind === "CExpr" && code.text.startsWith("{") && code.text.endsWith("}")) {
    return cExpr({ text: code.text.slice(1, -1), span: code.span });
  }
  return code;
}
