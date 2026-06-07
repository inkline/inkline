// React codegen assertions for the "lifecycle-effects" area: onMount / onCleanup and
// createEffect-with-cleanup authored in `.ink.tsx`, compiled through the FULL pipeline, asserting
// the ACTUAL emitted React code (useEffect lifecycle, plain-value state reads, granular dep arrays).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ───────────────────────── Lifecycle: onMount + onCleanup + signal ─────────────────────────

describe("Lifecycle: onMount/onCleanup with a signal", () => {
  it("React: onMount → useEffect([]); onCleanup → useEffect returning a cleanup fn", async () => {
    const out = await compileTo("Lifecycle", "react");
    expect(out).toContain('import { useState, useEffect } from "react";');
    expect(out).toContain("const [mounted, setMounted] = useState(false)");
    // onMount lowers to a mount-only effect that calls the React setter.
    expect(out).toContain("useEffect(() => { setMounted(true); }, [])");
    // onCleanup lowers to an effect whose return value is the teardown fn.
    expect(out).toContain('useEffect(() => () => { console.log("cleanup"); }, [])');
    // React reads plain state in JSX (no call), correct.
    expect(out).toContain('{mounted ? "mounted" : "pending"}');
  });
});

// ───────────────────── EffectCleanup: createEffect returning a cleanup fn ─────────────────────

describe("EffectCleanup: createEffect with a conditional cleanup return", () => {
  it("React: useEffect reads the plain-value state `active`, with a granular [active] dep array and cleanup return", async () => {
    const out = await compileTo("EffectCleanup", "react");
    expect(out).toContain("const [active, setActive] = useState(true)");
    // Dep array and click handler treat `active` as a plain value (correct for React).
    expect(out).toContain("}, [active])");
    expect(out).toContain("onClick={() => setActive(!active)}");
    // Inside the effect, `active` is read as a plain boolean (no spurious call form), and the
    // conditional cleanup return is preserved.
    expect(out).toContain("useEffect(() => { if (active) {");
    expect(out).toContain("return () => clearInterval(id); } }, [active])");
  });
});
