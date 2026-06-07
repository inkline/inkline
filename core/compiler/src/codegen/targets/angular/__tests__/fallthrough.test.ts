// Angular: attribute fallthrough — native host inheritance, no rest-spread wiring.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Angular relies on native host inheritance — class lands on the host element", async () => {
    // The headless root keeps its own class; no rest-spread wiring is emitted.
    const base = await compileTo("CrossFileBase", "angular");
    expect(base).not.toContain("__attrs");
    expect(base).toContain('<div class="base">');
    // A parent's class is bound on the child selector; Angular applies it to that host element.
    // `size` is a signal input, so the binding reads it in call form.
    const styled = await compileTo("CrossFileStyled", "angular");
    expect(styled).toContain('[class]="size()"');
  });
});
