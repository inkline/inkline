// Qwik codegen assertions for the "props" feature area: the full object form and fragment roots
// (`<>...</>`). Exercises the FULL pipeline (parse -> lower -> analyze -> codegen).

import { describe, it, expect } from "vitest";
import { compileTo, compileToChecked } from "../../../../testing/codegen.ts";

// The full object form used to read `type:` through `ts.isTypeNode`, which a constructor
// `Identifier` never satisfies — so the key was dropped and every prop below emitted `unknown`.
describe("PropTypeShapes: full object form `{ type: X, required, default }`", () => {
  it("Qwik: the props parameter carries the constructor-declared types instead of `unknown`", async () => {
    const out = await compileToChecked("PropTypeShapes", "qwik");
    expect(out).toContain(
      "component$((props: { size?: number; label: string; when?: Date; count: number } & Record<string, any>)",
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
