// Angular codegen assertions for the "props" feature area: prop declaration + types, the object form
// with defaults, required props, fragment roots, and text siblings. Exercises the FULL pipeline
// (parse -> lower -> analyze -> codegen) so it catches real bugs in how authored props and root
// shapes become Angular output (signal inputs, call-form reads, ng-content projection).

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("IButton: typed props (label/optional disabled)", () => {
  it("Angular: props are signal inputs; [disabled] reads the input in call form", async () => {
    const out = await compileTo("IButton", "angular");
    expect(out).toContain("label = input.required<string>()");
    expect(out).toContain("disabled = input<boolean>()");
    // The selector is the kebab-case ink-* form; the fallthrough root carries the klass merge.
    expect(out).toContain(
      'selector: \'ink-button\', template: `<button [disabled]="disabled()" [class]="klass()">',
    );
  });
});

describe("PropDefaults: object form `{ props: { color: 'blue', size: Number } }`", () => {
  // The author used the object/options form, which conveys a DEFAULT ("blue") for color and a
  // runtime constructor type (Number) for size.
  it("Angular: signal input seeds the default for color; required size is input.required", async () => {
    const out = await compileTo("PropDefaults", "angular");
    // The defaulted prop seeds the signal input's initial value; the required constructor-typed
    // prop becomes `input.required<…>()`.
    expect(out).toContain("color = input<string>('blue')");
    expect(out).toContain("size = input.required<number>()");
  });
});

describe("RequiredProps: non-optional props (name/age)", () => {
  it("Angular: required props become input.required with their types", async () => {
    const out = await compileTo("RequiredProps", "angular");
    expect(out).toContain("name = input.required<string>()");
    expect(out).toContain("age = input.required<number>()");
  });
});

describe("Card: `children` prop + class merge", () => {
  it("BUG: Angular interpolates the `children` input with no <ng-content> projection", async () => {
    const out = await compileTo("Card", "angular");
    // BUG: same as Vue — `{{ children() }}` (a signal-input read) with no <ng-content>, so projected
    // content is lost. `children` here is a declared prop, not a slot.
    expect(out).toContain("{{ children() }}");
    expect(out).not.toContain("<ng-content");
  });
});

describe("TextWithSiblings: text nodes adjacent to an element + a signal read", () => {
  it("Angular: signal read uses call form name() between sibling text", async () => {
    const out = await compileTo("TextWithSiblings", "angular");
    // Angular string literals in the class body are single-quoted.
    expect(out).toContain("name = signal('world')");
    expect(out).toContain("{{ name() }}");
  });
});
