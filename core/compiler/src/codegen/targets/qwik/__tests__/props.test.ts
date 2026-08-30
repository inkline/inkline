// Qwik codegen assertions for the "props" feature area: here, fragment roots (`<>...</>`).
// Exercises the FULL pipeline (parse -> lower -> analyze -> codegen).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("Qwik: fragment root emits a real `<>...</>` fragment", async () => {
    const qwik = await compileTo("FragmentRoot", "qwik");
    expect(qwik).toContain("<>");
  });
});

describe("PropDateType: object form `{ props: { when: Date, size: Number } }`", () => {
  // A bare `Date` declares the prop's type, not a default value — nothing seeds the destructure.
  it("Qwik: `when` is an optional Date and the destructure seeds no default", async () => {
    const out = await compileTo("PropDateType", "qwik");
    expect(out).toContain(
      "export const PropDateType = component$((props: { when?: Date; size: number } & Record<string, any>)",
    );
    expect(out).toContain("const { when, size, ...__attrs } = props");
    expect(out).not.toContain("when = Date");
  });
});
