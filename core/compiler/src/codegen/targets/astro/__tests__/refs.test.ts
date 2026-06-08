// Astro codegen: element/template refs.
// Astro is server-rendered, so client refs and onMount bodies are dropped entirely.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// Astro -> SSR, no client ref at all.
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("Astro: SSR output has no client ref and drops the onMount focus entirely", async () => {
    const out = await compileTo("ElementRef", "astro");
    expect(out).toContain('<input {...__attrs} placeholder="auto-focus" class={__attrs.class} />');
    // Astro is server-rendered: ref and onMount are both absent (no client runtime here).
    expect(out).not.toContain("ref=");
    expect(out).not.toContain("focus()");
  });
});

// ---------------------------------------------------------------------------
// MultiRefs: two refs (inputRef + buttonRef) on sibling elements; only inputRef
// is used in onMount. Astro strips all ref bindings from the SSR markup.
// ---------------------------------------------------------------------------
describe("MultiRefs: two independent refs on sibling elements", () => {
  it("Astro: both ref bindings are stripped from the SSR markup", async () => {
    const out = await compileTo("MultiRefs", "astro");
    expect(out).toContain('<input placeholder="focus me" />');
    expect(out).toContain("<button>");
    expect(out).not.toContain("ref=");
    expect(out).not.toContain("#inputRef");
  });
});
