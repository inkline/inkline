// React codegen integration tests for element refs (template refs + onMount wiring).
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// React expresses element refs via useRef + ref={inputRef}, reading .current
// in the effect.
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("React: useRef(null) + ref={inputRef}, onMount becomes a [] effect using .current", async () => {
    const out = await compileTo("ElementRef", "react");
    expect(out).toContain('import { useRef, useEffect } from "react";');
    expect(out).toContain("const inputRef = useRef(null)");
    expect(out).toContain("useEffect(() => { inputRef.current?.focus(); }, [])");
    expect(out).toContain("ref={inputRef}");
  });
});

// ---------------------------------------------------------------------------
// MultiRefs: two refs (inputRef + buttonRef) on sibling elements; only inputRef
// is used in onMount. Verifies each ref is wired independently and both bindings
// survive even when one ref is never read.
// ---------------------------------------------------------------------------
describe("MultiRefs: two independent refs on sibling elements", () => {
  it("React: both refs declared as useRef, each bound to its own element", async () => {
    const out = await compileTo("MultiRefs", "react");
    expect(out).toContain("const inputRef = useRef(null)");
    expect(out).toContain("const buttonRef = useRef(null)");
    expect(out).toContain('<input placeholder="focus me" ref={inputRef} />');
    expect(out).toContain("<button ref={buttonRef}>");
  });
});
