// Astro codegen assertions for the "lifecycle-effects" area: onMount / onCleanup and
// createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline. For Astro,
// signal state is declared in the frontmatter so the template read is well-defined at SSR.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("Astro: signal state is declared as `let mounted = false` in the frontmatter and read by the template", async () => {
    const out = await compileTo("Lifecycle", "astro");
    expect(out).toContain("const { ...__attrs } = props;");
    // The signal state is declared in the frontmatter, so the template read is well-defined at SSR.
    expect(out).toContain("let mounted = false");
    expect(out).toContain('{mounted ? "mounted" : "pending"}');
  });
});
