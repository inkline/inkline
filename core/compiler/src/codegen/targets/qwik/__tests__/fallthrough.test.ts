// Qwik codegen assertions for the "attribute fallthrough" feature area: how inherited attributes
// (class, rest props) are merged onto a component's host-element root, and when no wiring is emitted.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Qwik merges an inherited class onto the root (CrossFileBase)", async () => {
    const code = await compileTo("CrossFileBase", "qwik");
    expect(code).toContain("const { children, label, ...__attrs } = props");
    expect(code).toContain(
      '<div {...__attrs} class={["base", props.class].filter(Boolean).join(" ")}>',
    );
  });

  it("emits no fallthrough wiring for a fragment-root component (FragmentRoot)", async () => {
    const code = await compileTo("FragmentRoot", "qwik");
    expect(code, "qwik fragment root").not.toContain("__attrs");
  });
});
