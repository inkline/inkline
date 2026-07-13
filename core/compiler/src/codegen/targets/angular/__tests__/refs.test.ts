// Angular codegen assertions for the "refs" area: element refs become viewChild + template
// markers, with onMount focus wired through afterNextRender in the constructor — authored in
// `.ink.tsx`, compiled through the full pipeline, asserting the actual emitted Angular code.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// Angular expresses element refs via viewChild + a #inputRef template marker.
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("Angular: viewChild + #inputRef marker, onMount focus runs via afterNextRender in the constructor", async () => {
    const out = await compileTo("ElementRef", "angular");
    expect(out).toContain("viewChild<ElementRef>('inputRef')");
    expect(out).toContain(
      'template: `<input placeholder="auto-focus" [class]="klass()" #inputRef />`',
    );
    // onMount is wired: Angular emits `afterNextRender` inside a single constructor, and the focus
    // body reads the viewChild signal member unwrapped to its DOM node —
    // `this.inputRef()?.nativeElement` (imports the lifecycle helper alongside viewChild/ElementRef).
    expect(out).toContain(
      "constructor() { afterNextRender(() => { this.inputRef()?.nativeElement?.focus(); }) }",
    );
    expect(out).toContain("afterNextRender");
  });
});

// ---------------------------------------------------------------------------
// MultiRefs: two refs (inputRef + buttonRef) on sibling elements; only inputRef
// is used in onMount. Verifies each ref is wired independently and both bindings
// survive even when one ref is never read.
// ---------------------------------------------------------------------------
describe("MultiRefs: two independent refs on sibling elements", () => {
  it("Angular: both refs become viewChild + template markers", async () => {
    const out = await compileTo("MultiRefs", "angular");
    expect(out).toContain("inputRef = viewChild<ElementRef>('inputRef')");
    expect(out).toContain("buttonRef = viewChild<ElementRef>('buttonRef')");
    expect(out).toContain('<input placeholder="focus me" #inputRef />');
    expect(out).toContain("<button #buttonRef>");
    // onMount is wired: the inputRef focus runs via afterNextRender in the constructor, reading the
    // viewChild signal unwrapped as `this.inputRef()?.nativeElement`. buttonRef is declared but
    // unread (as authored), fine.
    expect(out).toContain(
      "constructor() { afterNextRender(() => { this.inputRef()?.nativeElement?.focus(); }) }",
    );
  });
});
