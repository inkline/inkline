// Astro codegen assertions for the EVENTS feature area: author `.ink.tsx` → compile → assert the
// ACTUAL generated Astro code for event-handler wiring, modifiers, and typed payloads.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// EventModifier: <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
// The handler body keeps e.preventDefault(); the signal-setter call is rewritten:
// Astro declares the signal as a plain frontmatter `let` and rewrites the setter to a
// direct assignment `submitted = true`.
// ---------------------------------------------------------------------------
describe("EventModifier: onSubmit with e.preventDefault() + signal setter", () => {
  it("Astro: declares signal state in frontmatter; handler rewrites the setter to a direct assignment", async () => {
    const out = await compileTo("EventModifier", "astro");
    // Astro declares the signal as a plain frontmatter `let`, so `submitted` is defined.
    expect(out).toContain("let submitted = false");
    // The setter call is rewritten to a direct assignment `submitted = true`; the read in the
    // template resolves against the declared frontmatter binding.
    expect(out).toContain("onSubmit={e => { e.preventDefault(); submitted = true; }}");
    expect(out).toContain('{submitted ? "Done" : "Pending"}');
    expect(out).not.toContain("setSubmitted"); // the setter identifier is gone entirely
  });
});
