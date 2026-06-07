// Solid codegen assertions for the "attribute fallthrough" feature area: how an inherited
// class and rest attributes are merged onto a component's host-element root.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Solid merges an inherited class via splitProps (CrossFileBase)", async () => {
    const code = await compileTo("CrossFileBase", "solid");
    expect(code).toContain("splitProps");
    expect(code).toContain(
      '<div {...__attrs} class={["base", props.class].filter(Boolean).join(" ")}>',
    );
    expect(code).toContain("JSX.HTMLAttributes<HTMLElement>");
  });

  it("emits no fallthrough wiring for a fragment-root component (FragmentRoot)", async () => {
    const code = await compileTo("FragmentRoot", "solid");
    expect(code, "solid fragment root").not.toContain("__attrs");
  });
});
