// Astro attribute fallthrough: merging inherited class/attrs onto a component root.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Astro merges an inherited class onto the root (CrossFileBase)", async () => {
    const code = await compileTo("CrossFileBase", "astro");
    expect(code).toContain("const props = Astro.props as Props;");
    expect(code).toContain(`...${"__attrs"} } = props`);
    expect(code).toContain(
      '<div {...__attrs} class={["base", __attrs.class].filter(Boolean).join(" ")}>',
    );
  });

  it("emits no fallthrough wiring for a fragment-root component (FragmentRoot)", async () => {
    const code = await compileTo("FragmentRoot", "astro");
    expect(code, "astro fragment root").not.toContain("__attrs");
  });
});
