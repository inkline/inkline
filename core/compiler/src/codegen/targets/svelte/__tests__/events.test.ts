// Svelte codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile →
// assert the ACTUAL generated Svelte code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); the signal-setter call is rewritten for Svelte
// to a plain `$state` assignment `submitted = true`.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("Svelte: onsubmit handler rewrites the setter to a plain $state assignment", async () => {
    const out = await compileTo("EventModifier", "svelte");
    expect(out).toContain("let submitted = $state(false)");
    // Svelte uses a plain `$state` let, so the setter call is rewritten to `submitted = true`.
    expect(out).toContain("onsubmit={e => { e.preventDefault(); submitted = true; }}");
    expect(out).not.toContain("setSubmitted");
  });
});
