// Real-world codegen assertions for the "props" feature area (Svelte target): prop declaration +
// types via $props() destructure, fragment roots, and how authored props/root shapes become Svelte
// output. These exercise the FULL pipeline (parse -> lower -> analyze -> codegen).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("IButton: typed props (label/optional disabled)", () => {
  it("Svelte: $props() destructure + bare identifier access (no props. prefix)", async () => {
    const out = await compileTo("IButton", "svelte");
    expect(out).toContain(
      "let { label, disabled, ...__attrs }: Props & Record<string, any> = $props()",
    );
    expect(out).toContain("<button {...__attrs} disabled={disabled} class={__attrs.class}>");
    expect(out).toContain("{label}");
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("Svelte: fragment unwraps to bare sibling roots (no wrapper element)", async () => {
    const svelte = await compileTo("FragmentRoot", "svelte");
    expect(svelte).toContain("<h1>");
    expect(svelte).toContain("<p>");
    expect(svelte).not.toContain("<>");
  });
});
