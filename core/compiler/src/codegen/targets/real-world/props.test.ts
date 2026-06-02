// Real-world codegen assertions for the "props" feature area: prop declaration + types, the object
// form with defaults, required props, fragment roots, and text siblings. These exercise the FULL
// pipeline (parse -> lower -> analyze -> codegen) so they catch real bugs in how authored props and
// root shapes become framework output.
//
// Focus:
//   - how props are declared/typed per target (React/Solid intersection types, Vue defineProps,
//     Svelte $props() destructure, Angular @Input, Astro frontmatter destructure)
//   - prop access form per target (props.x vs destructured x vs __attrs.x)
//   - the object form `{ props: { color: "blue", size: Number } }` and whether defaults survive
//   - required props -> non-optional types / `!` definite-assignment
//   - fragment roots (<>...</>) per target
//   - text nodes sibling-adjacent to elements
//
// To inspect a fixture's real output while writing assertions, compile it and log the contents:
//   const r = await compileFixture("PropDefaults"); console.log(r.files.vue![0].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

describe("IButton: typed props (label/optional disabled) across targets", () => {
  it("React: destructures into __attrs, keeps an intersection type, binds disabled via props.x", async () => {
    const out = await code("IButton", "react");
    expect(out).toContain(
      "export function IButton(props: { label: string; disabled?: boolean } & React.HTMLAttributes<HTMLElement>)",
    );
    expect(out).toContain("const { label, disabled, ...__attrs } = props");
    expect(out).toContain(
      "<button {...__attrs} disabled={props.disabled} className={props.className}>",
    );
    expect(out).toContain("{props.label}");
  });

  it("Vue: defineProps generic + template reads the destructured prop name (not props.x)", async () => {
    const out = await code("IButton", "vue");
    expect(out).toContain("const props = defineProps<{ label: string; disabled?: boolean }>()");
    expect(out).toContain('<button :disabled="disabled">');
    expect(out).toContain("{{ label }}");
  });

  it("Svelte: $props() destructure + bare identifier access (no props. prefix)", async () => {
    const out = await code("IButton", "svelte");
    expect(out).toContain(
      "let { label, disabled, ...__attrs }: Props & Record<string, any> = $props()",
    );
    expect(out).toContain("<button {...__attrs} disabled={disabled} class={__attrs.class}>");
    expect(out).toContain("{label}");
  });

  it("Angular: @Input fields with optional `?` modifier + [disabled] binding", async () => {
    const out = await code("IButton", "angular");
    expect(out).toContain("@Input() label!: string");
    expect(out).toContain("@Input() disabled?: boolean");
    expect(out).toContain("selector: 'IButton', template: `<button [disabled]=\"disabled\">");
  });

  it("Solid: splitProps lists the declared prop keys so __attrs is the remainder", async () => {
    const out = await code("IButton", "solid");
    expect(out).toContain('const [, __attrs] = splitProps(props, ["label", "disabled"])');
    expect(out).toContain("<button {...__attrs} disabled={props.disabled} class={props.class}>");
  });
});

describe("PropDefaults: object form `{ props: { color: 'blue', size: Number } }`", () => {
  // The author used the object/options form, which conveys a DEFAULT ("blue") for color and a
  // runtime constructor type (Number) for size.
  it("BUG: React drops the default and emits a malformed prop type with no annotation", async () => {
    const out = await code("PropDefaults", "react");
    // BUG: `color: "blue"` default is gone (no `= "blue"` anywhere) and the prop type degrades to
    // `{ color?; size }` — `color?` and `size` have NO type annotation, which is invalid TS.
    expect(out).toContain(
      "export function PropDefaults(props: { color?; size } & React.HTMLAttributes<HTMLElement>)",
    );
    expect(out).not.toContain('"blue"');
    expect(out).not.toContain('= "blue"');
  });

  it("BUG: Vue defineProps generic is invalid TS (`color?; size` with no types) and default is lost", async () => {
    const out = await code("PropDefaults", "vue");
    // BUG: `defineProps<{ color?; size }>()` — neither member has a type; `color` has no default.
    expect(out).toContain("const props = defineProps<{ color?; size }>()");
    expect(out).not.toContain('"blue"');
  });

  it("BUG: Angular emits an @Input with no type and no default initializer for color", async () => {
    const out = await code("PropDefaults", "angular");
    // BUG: `@Input() color?` has no type and no `= "blue"` default; `@Input() size!` is untyped.
    expect(out).toContain("@Input() color?");
    expect(out).toContain("@Input() size!");
    expect(out).not.toContain('"blue"');
  });

  it("Astro recovers `unknown` annotations but still drops the default value", async () => {
    const out = await code("PropDefaults", "astro");
    // BUG: type is reconstructed as `{ color?: unknown; size: unknown }` but the `"blue"` default is
    // still dropped, so `color` is undefined at runtime.
    expect(out).toContain("type Props = { color?: unknown; size: unknown } & Record<string, any>");
    expect(out).not.toContain('"blue"');
  });
});

describe("RequiredProps: non-optional props (name/age)", () => {
  it("Angular: required props get definite-assignment `!` with their types", async () => {
    const out = await code("RequiredProps", "angular");
    expect(out).toContain("@Input() name!: string");
    expect(out).toContain("@Input() age!: number");
  });

  it("React/Solid: required props keep non-optional intersection-type members", async () => {
    const react = await code("RequiredProps", "react");
    expect(react).toContain(
      "export function RequiredProps(props: { name: string; age: number } & React.HTMLAttributes<HTMLElement>)",
    );
    const solid = await code("RequiredProps", "solid");
    expect(solid).toContain('const [, __attrs] = splitProps(props, ["name", "age"])');
    expect(solid).toContain("{props.name}");
  });

  it("Vue: required props -> defineProps generic with no optional markers", async () => {
    const out = await code("RequiredProps", "vue");
    expect(out).toContain("const props = defineProps<{ name: string; age: number }>()");
    expect(out).toContain("{{ name }}");
    expect(out).toContain("{{ age }}");
  });
});

describe("Card: `children` prop + class merge", () => {
  it("React: children renders via props.children and class merges with literal `card`", async () => {
    const out = await code("Card", "react");
    expect(out).toContain('className={["card", props.className].filter(Boolean).join(" ")}');
    expect(out).toContain("{props.children}");
  });

  it("BUG: Vue stringifies `children` instead of rendering a slot", async () => {
    const out = await code("Card", "vue");
    // BUG: `children` is treated as a plain prop and interpolated as `{{ children }}`; Vue has no
    // <slot> here, so passed child VNodes render as text/[object Object] rather than slotted markup.
    expect(out).toContain("{{ children }}");
    expect(out).not.toContain("<slot");
  });

  it("BUG: Angular interpolates `children` with no <ng-content> projection", async () => {
    const out = await code("Card", "angular");
    // BUG: same as Vue — `{{ children }}` with no <ng-content>, so projected content is lost.
    expect(out).toContain("{{ children }}");
    expect(out).not.toContain("<ng-content");
  });
});

describe("FragmentRoot: `<>...</>` root with no props", () => {
  it("React/Solid/Qwik: fragment root emits a real `<>...</>` fragment", async () => {
    const react = await code("FragmentRoot", "react");
    expect(react).toContain("export function FragmentRoot(props: Record<string, never>)");
    expect(react).toContain("<>");
    expect(react).toContain("</>");
    const solid = await code("FragmentRoot", "solid");
    expect(solid).toContain("<>");
    const qwik = await code("FragmentRoot", "qwik");
    expect(qwik).toContain("<>");
  });

  it("Svelte/Astro/Angular: fragment unwraps to bare sibling roots (no wrapper element)", async () => {
    const svelte = await code("FragmentRoot", "svelte");
    expect(svelte).toContain("<h1>");
    expect(svelte).toContain("<p>");
    expect(svelte).not.toContain("<>");
    const astro = await code("FragmentRoot", "astro");
    expect(astro).toContain("<h1>");
    expect(astro).not.toContain("<>");
  });

  it("BUG: Vue wraps the fragment in a NESTED `<template>` element inside the SFC template", async () => {
    const out = await code("FragmentRoot", "vue");
    // BUG: SFC template plus a bare inner <template> with no v-if/v-for/#slot. A naked <template>
    // element renders nothing in Vue, so the fragment's <h1>/<p> are dropped at runtime.
    expect(out).toContain("<template>\n<template>");
    expect(out).not.toContain("v-if");
  });
});

describe("TextWithSiblings: text nodes adjacent to an element + a signal read", () => {
  it("React: sibling text and <strong>{name}</strong> are preserved around the element", async () => {
    const out = await code("TextWithSiblings", "react");
    expect(out).toContain('const [name, setName] = useState("world")');
    expect(out).toContain("Hello,");
    expect(out).toContain("<strong>");
    expect(out).toContain("{name}");
    expect(out).toContain("!");
  });

  it("Angular: signal read uses call form name() between sibling text", async () => {
    const out = await code("TextWithSiblings", "angular");
    expect(out).toContain('name = signal("world")');
    expect(out).toContain("{{ name() }}");
  });

  it("BUG: Astro references `{name}` in the template but never declares it in the frontmatter", async () => {
    const out = await code("TextWithSiblings", "astro");
    // BUG: the createSignal `name` is dropped from the Astro frontmatter (only `__attrs` is set up),
    // yet the template still reads `{name}` -> ReferenceError when the component renders.
    expect(out).toContain("{name}");
    expect(out).not.toContain("const name");
    expect(out).not.toContain("name =");
  });
});
