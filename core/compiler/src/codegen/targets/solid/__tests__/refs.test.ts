// Solid codegen: element refs (let var + ref callback) and onMount wiring.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
//   Solid -> let var + ref callback, bare var in the hook
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("Solid: ref callback assigns the bare let var, hook calls .focus() directly", async () => {
    const out = await compileTo("ElementRef", "solid");
    expect(out).toContain("let inputRef: HTMLElement | undefined");
    expect(out).toContain("ref={(el) => inputRef = el}");
    // Solid refs hold the element directly, so no `.current`/`.value`.
    expect(out).toContain("onMount(() => { inputRef?.focus(); })");
  });
});

// ---------------------------------------------------------------------------
// MultiRefs: two refs (inputRef + buttonRef) on sibling elements; only inputRef
// is used in onMount. Verifies each ref is wired independently and both bindings
// survive even when one ref is never read.
// ---------------------------------------------------------------------------
describe("MultiRefs: two independent refs on sibling elements", () => {
  it("Solid: each ref gets its own let var and callback binding", async () => {
    const out = await compileTo("MultiRefs", "solid");
    expect(out).toContain("let inputRef: HTMLElement | undefined");
    expect(out).toContain("let buttonRef: HTMLElement | undefined");
    expect(out).toContain("ref={(el) => inputRef = el}");
    expect(out).toContain("ref={(el) => buttonRef = el}");
  });
});
