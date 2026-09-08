// Astro codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. Astro declares its props with its own frontmatter destructure, keyed on the PROP names, so
// the authored locals must not leak into the template.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Astro: the frontmatter destructure declares every prop, carrying the folded default", async () => {
    const out = await compileTo("PropsDestructured", "astro");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    expect(out).toContain('const { label, size = "md", tone } = props;');
    expect(out).toContain("<h1 title={label}>{label}</h1>");
    expect(out).toContain("<p>{size}</p>");
    expect(out).toContain("<span>{tone}</span>");
  });
});
