// Svelte codegen assertions for the "attribute fallthrough" feature area: how an inherited
// class and rest attributes are merged onto a component's host-element root.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Svelte merges an inherited class via $props rest (CrossFileBase)", async () => {
    const code = await compileTo("CrossFileBase", "svelte");
    expect(code).toContain("...__attrs");
    expect(code).toContain(
      '<div {...__attrs} class={["base", __attrs.class].filter(Boolean).join(" ")}>',
    );
  });

  it("emits no fallthrough wiring for a fragment-root component (FragmentRoot)", async () => {
    const code = await compileTo("FragmentRoot", "svelte");
    expect(code, "svelte fragment root").not.toContain("__attrs");
  });
});
