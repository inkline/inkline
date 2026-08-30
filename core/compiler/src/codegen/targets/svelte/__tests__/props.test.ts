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

describe("PropDateType: object form `{ props: { when: Date, size: Number } }`", () => {
  // A bare `Date` declares the prop's type, not a default value — nothing seeds the destructure.
  it("Svelte: `when` is an optional Date and the $props() destructure seeds no default", async () => {
    const out = await compileTo("PropDateType", "svelte");
    expect(out).toContain("interface Props { when?: Date; size: number }");
    expect(out).toContain("let { when, size, ...__attrs }: Props & Record<string, any> = $props()");
    expect(out).not.toContain("when = Date");
  });
});
