// React codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup
// body. The bindings are aliases of the props they name, so every read must resolve to something
// React declares — never to the bare local, which nothing in the output declares.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("React: reads each alias through props, and the defaulted one through its destructured local", async () => {
    const out = await compileTo("PropsDestructured", "react");

    // The authored statement never survives: React has its own props convention.
    expect(out).not.toContain("= props;");
    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    // Plain and renamed aliases read the prop directly.
    expect(out).toContain("<h1 title={props.label}>{props.label}</h1>");
    expect(out).toContain("<span>{props.tone}</span>");

    // The default is folded into the prop, which React applies through the rest destructure; the
    // read then goes through that local so an omitted `size` resolves to "md".
    expect(out).toContain('const { size = "md" } = props');
    expect(out).toContain("<p>{size}</p>");
  });
});
