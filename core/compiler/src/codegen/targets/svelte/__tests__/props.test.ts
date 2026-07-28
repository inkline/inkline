// Real-world codegen assertions for the "props" feature area (Svelte target): prop declaration +
// types via $props() destructure, fragment roots, and how authored props/root shapes become Svelte
// output. These exercise the FULL pipeline (parse -> lower -> analyze -> codegen).

import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// The full object form used to read `type:` through `ts.isTypeNode`, which a constructor
// `Identifier` never satisfies — so the key was dropped and every prop below emitted untyped. `cfg`
// covers the other half: an object literal is only a shape when every key is one the shape reads,
// otherwise it is a default value, and routing it into the shape dropped its type AND its default.
describe("PropTypeShapes: full object form vs. an object literal default", () => {
  it("Svelte: the Props interface carries the declared types and the object default lands in the destructure", async () => {
    const out = await compileToChecked("PropTypeShapes", "svelte");
    expect(out).toContain(
      "interface Props { size?: number; label: string; when?: Date; count: number; cfg?: Record<string, any> }",
    );
    expect(out).toContain("let { size, label, when, count = 0, cfg = { a: 1 }, ...__attrs }");
  });
});

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
