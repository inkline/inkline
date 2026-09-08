// Qwik codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. Qwik keeps reads on the props object, except for a prop carrying a default, which it
// destructures so the default takes effect.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Qwik: aliases read props.<prop>, and the defaulted one reads its destructured local", async () => {
    const out = await compileTo("PropsDestructured", "qwik");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    expect(out).toContain('const { size = "md" } = props');
    expect(out).toContain("<h1 title={props.label}>{props.label}</h1>");
    expect(out).toContain("<p>{size}</p>");
    expect(out).toContain("<span>{props.tone}</span>");
  });
});
