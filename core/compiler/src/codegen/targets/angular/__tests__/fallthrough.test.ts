// Angular: attribute fallthrough — a parent-provided class travels through the synthesized
// `klass` input and the child's root element merges it with its own class. (Ivy never routes a
// `[class]` binding to an input, and a class set on the host element alone would style the wrong
// box — the component's root lives *inside* the host.)
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("attribute fallthrough", () => {
  it("Angular routes a parent-provided class to the child root via the klass input", async () => {
    // The headless root merges its own class with the forwarded one; no rest-spread wiring exists.
    const base = await compileTo("CrossFileBase", "angular");
    expect(base).not.toContain("__attrs");
    expect(base).toContain("klass = input<string>()");
    expect(base).toContain(`[class]="'base' + (klass() ? ' ' + klass() : '')"`);
    // The styled parent binds the recipe class to the child's klass input (merged with its own
    // forwarded class), never to the host's [class].
    const styled = await compileTo("CrossFileStyled", "angular");
    expect(styled).toContain(`[klass]="(size()) + (klass() ? ' ' + klass() : '')"`);
    expect(styled).not.toContain('[class]="size()"');
  });
});
