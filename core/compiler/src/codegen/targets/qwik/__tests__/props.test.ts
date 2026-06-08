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
