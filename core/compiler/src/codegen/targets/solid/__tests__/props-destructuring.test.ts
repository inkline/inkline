// Solid codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. Solid must keep every read on the props object so reactivity survives, so each alias
// becomes a `props.<prop>` read and the default goes through mergeProps.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Solid: every alias reads props.<prop>, and the default seeds mergeProps", async () => {
    const out = await compileTo("PropsDestructured", "solid");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    // Destructuring in Solid would break reactivity, so no alias is ever destructured out.
    expect(out).toContain('const props = mergeProps({ size: "md" }, _props)');
    expect(out).toContain("<h1 title={props.label}>{props.label}</h1>");
    expect(out).toContain("<p>{props.size}</p>");
    expect(out).toContain("<span>{props.tone}</span>");
  });
});

// The counterpart of the memo limitation: `mergeProps` seeds the default on the props object
// itself, so an alias read inside a memo or an effect still resolves to the default.
describe("PropsDestructuredMemo: an alias inside a memo or an effect keeps the folded default", () => {
  it("Solid: mergeProps seeds the default, so the memo and the effect read it", async () => {
    const out = await compileTo("PropsDestructuredMemo", "solid");

    expect(out).toContain('const props = mergeProps({ size: "md" }, _props)');
    expect(out).toContain("const summary = createMemo(() => `${props.label}:${props.size}`)");
    expect(out).toContain("createEffect(() => { console.log(props.size); })");
  });
});
