// Vue codegen assertions for the "props" feature area: defineProps generics, withDefaults for
// object-form defaults, required props, the `children`-prop bug, and fragment-root unwrapping.
// These exercise the FULL pipeline (parse -> lower -> analyze -> codegen) so they catch real bugs
// in how authored props and root shapes become Vue SFC output.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("IButton: typed props (label/optional disabled)", () => {
  it("Vue: defineProps generic + template reads the destructured prop name (not props.x)", async () => {
    const out = await compileTo("IButton", "vue");
    expect(out).toContain("const props = defineProps<{ label: string; disabled?: boolean }>()");
    expect(out).toContain('<button :disabled="disabled">');
    expect(out).toContain("{{ label }}");
  });
});

describe("PropDefaults: object form `{ props: { color: 'blue', size: Number } }`", () => {
  // The author used the object/options form, which conveys a DEFAULT ("blue") for color and a
  // runtime constructor type (Number) for size.
  it("Vue: defineProps generic carries resolved types and withDefaults applies the `color` default", async () => {
    const out = await compileTo("PropDefaults", "vue");
    // Resolved types: `color?: string`, `size: number`; the `"blue"` default is seeded via
    // withDefaults, which only lists props that declared a default.
    expect(out).toContain(
      'const props = withDefaults(defineProps<{ color?: string; size: number }>(), { color: "blue" })',
    );
  });
});

describe("RequiredProps: non-optional props (name/age)", () => {
  it("Vue: required props -> defineProps generic with no optional markers", async () => {
    const out = await compileTo("RequiredProps", "vue");
    expect(out).toContain("const props = defineProps<{ name: string; age: number }>()");
    expect(out).toContain("{{ name }}");
    expect(out).toContain("{{ age }}");
  });
});

describe("Card: `children` prop + class merge", () => {
  it("BUG: Vue stringifies `children` instead of rendering a slot", async () => {
    const out = await compileTo("Card", "vue");
    // BUG: `children` is treated as a plain prop and interpolated as `{{ children }}`; Vue has no
    // <slot> here, so passed child VNodes render as text/[object Object] rather than slotted markup.
    expect(out).toContain("{{ children }}");
    expect(out).not.toContain("<slot");
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("Vue: fragment root emits its children as sibling roots directly under the SFC <template> (no nested <template>)", async () => {
    const out = await compileTo("FragmentRoot", "vue");
    // The fragment unwraps: the SFC <template> contains the <h1>/<p> siblings directly, with no
    // extra nested <template> wrapper, so all fragment children render at runtime.
    expect(out).toContain("<template>\n<h1>");
    expect(out).toContain("</h1>\n<p>");
    expect(out).not.toContain("<template>\n<template>");
    expect(out).not.toContain("v-if");
  });
});
