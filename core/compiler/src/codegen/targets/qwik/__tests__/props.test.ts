// Qwik codegen assertions for the "props" feature area: the full object form and fragment roots
// (`<>...</>`). Exercises the FULL pipeline (parse -> lower -> analyze -> codegen).

import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// The full object form used to read `type:` through `ts.isTypeNode`, which a constructor
// `Identifier` never satisfies — so the key was dropped and every prop below emitted `unknown`. `cfg`
// covers the other half: an object literal is only a shape when every key is one the shape reads,
// otherwise it is a default value, and routing it into the shape dropped its type AND its default.
describe("PropTypeShapes: full object form vs. an object literal default", () => {
  it("Qwik: the props parameter carries the declared types instead of `unknown`, and the object default is destructured", async () => {
    const out = await compileToChecked("PropTypeShapes", "qwik");
    expect(out).toContain(
      "component$((props: { size?: number; label: string; when?: Date; count: number; cfg?: Record<string, any> } & Record<string, any>)",
    );
    expect(out).toContain(
      "const { size, label, when, count = 0, cfg = { a: 1 }, ...__attrs } = props",
    );
    expect(out).not.toContain("unknown");
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("Qwik: fragment root emits a real `<>...</>` fragment", async () => {
    const qwik = await compileTo("FragmentRoot", "qwik");
    expect(qwik).toContain("<>");
  });
});
