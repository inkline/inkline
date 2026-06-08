// Qwik codegen: template refs (element refs) and their onMount wiring.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// Qwik expresses element refs via useSignal + ref={inputRef}, and onMount
// becomes a useVisibleTask$ that reads the signal via .value.
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("Qwik: useSignal ref + ref={inputRef}, onMount focus runs via useVisibleTask$", async () => {
    const out = await compileTo("ElementRef", "qwik");
    expect(out).toContain("const inputRef = useSignal(null)");
    expect(out).toContain("ref={inputRef}");
    // onMount is now wired in Qwik: it becomes a useVisibleTask$ that reads the
    // signal via .value, and the imported helper is now actually used.
    expect(out).toContain(
      'import { component$, useSignal, useComputed$, useVisibleTask$, $ } from "@qwik.dev/core";',
    );
    expect(out).toContain("useVisibleTask$(() => { inputRef.value?.focus(); })");
  });
});
