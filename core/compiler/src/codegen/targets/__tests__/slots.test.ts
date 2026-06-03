// Real-world codegen assertions for the "slots" feature area: author `.ink.tsx` with `<Slot />` /
// `defineSlot()` → compile → assert the ACTUAL generated framework code. Focus: the default slot
// (→ `children` in react/solid/qwik, native `<slot>` in vue/svelte, `<ng-content>` in angular),
// named slots, and slot fallback content. We verify nothing meaningful is silently dropped — and
// where it IS dropped, we document the current (buggy) output and flag it.

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// --- SlotBasic: a single default <Slot /> ----------------------------------------------------
describe("SlotBasic: default slot", () => {
  it("React: default slot lowers to props.children", async () => {
    const out = await code("SlotBasic", "react");
    expect(out).toContain("children?: React.ReactNode");
    expect(out).toContain("{props.children}");
  });

  it("Vue: default slot is a native <slot />", async () => {
    const out = await code("SlotBasic", "vue");
    expect(out).toContain("<slot />");
  });

  it("Solid: default slot → props.children, kept out of __attrs fallthrough", async () => {
    const out = await code("SlotBasic", "solid");
    expect(out).toContain('splitProps(props, ["children"])');
    expect(out).toContain("{props.children}");
  });

  it("Angular: default slot → non-self-closing <ng-content>", async () => {
    const out = await code("SlotBasic", "angular");
    // Non-self-closing: self-closed `<ng-content />` breaks Angular's JIT template parsing.
    expect(out).toContain("<ng-content></ng-content>");
  });
});

// --- SlotNamed: header (named) + default + footer (named) ------------------------------------
describe("SlotNamed: named slots alongside the default", () => {
  it("React: named slots become render props; default stays children", async () => {
    const out = await code("SlotNamed", "react");
    expect(out).toContain("{props.renderHeader?.()}");
    expect(out).toContain("{props.children}");
    expect(out).toContain("{props.renderFooter?.()}");
  });

  it("Vue: named slots keep their name; default is unnamed", async () => {
    const out = await code("SlotNamed", "vue");
    expect(out).toContain('<slot name="header" />');
    expect(out).toContain("<slot />");
    expect(out).toContain('<slot name="footer" />');
  });

  it("Solid: named slots become props by name, default is children", async () => {
    const out = await code("SlotNamed", "solid");
    expect(out).toContain('splitProps(props, ["header", "children", "footer"])');
    expect(out).toContain("{props.header}");
    expect(out).toContain("{props.footer}");
  });

  it("Angular: named slots project via select=[slot=name]", async () => {
    const out = await code("SlotNamed", "angular");
    expect(out).toContain('<ng-content select="[slot=header]"></ng-content>');
    expect(out).toContain('<ng-content select="[slot=footer]"></ng-content>');
    expect(out).toContain("<ng-content></ng-content>");
  });
});

// --- SlotWithFallback: <Slot name="header"><h1/></Slot> + <Slot>text</Slot> ------------------
describe("SlotWithFallback: slot fallback content", () => {
  it("React: fallback emitted via ?? after the render prop / children", async () => {
    const out = await code("SlotWithFallback", "react");
    expect(out).toContain("{props.renderHeader?.() ?? <h1>Default Header</h1>}");
    expect(out).toContain('{props.children ?? "Default body content"}');
  });

  it("Vue: fallback preserved as <slot> children", async () => {
    const out = await code("SlotWithFallback", "vue");
    expect(out).toContain('<slot name="header">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
  });

  it("Svelte: fallback preserved as <slot> children", async () => {
    const out = await code("SlotWithFallback", "svelte");
    expect(out).toContain('<slot name="header">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
  });

  it("Angular: fallback content renders as the <ng-content> projection default", async () => {
    // The authored fallback (`<h1>Default Header</h1>`, "Default body content") is emitted as the
    // content of a non-self-closing <ng-content>, shown when nothing is projected (Angular 18+).
    const out = await code("SlotWithFallback", "angular");
    expect(out).toContain('<ng-content select="[slot=header]">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
    expect(out).not.toContain("<ng-content />");
  });

  it("Astro: fallback content renders as the <slot> default (non-self-closing)", async () => {
    // Astro natively supports fallback content between <slot>...</slot>; codegen emits the authored
    // defaults as the slot's children, shown when nothing is projected (matching Vue/Svelte).
    const out = await code("SlotWithFallback", "astro");
    expect(out).toContain('<slot name="header">');
    expect(out).toContain("Default Header");
    expect(out).toContain("Default body content");
    expect(out).not.toContain('<slot name="header" />');
  });
});

// --- SlotWithDefault: declared `slots: { default, actions }` + default slot fallbacks ---------
describe("SlotWithDefault: declared default slot + named actions slot", () => {
  it("Solid: default slot → children with fallback; named actions → prop", async () => {
    const out = await code("SlotWithDefault", "solid");
    expect(out).toContain("{props.children ?? <p>Default content</p>}");
    expect(out).toContain("{props.actions ?? <span>Action area</span>}");
  });

  it("Qwik: default slot → <Slot> with fallback; named actions → <Slot name='actions'>", async () => {
    // Qwik projects through its native <Slot/> (props.children is never populated). The authored
    // fallback becomes the <Slot>'s children, and `Slot` is added to the @qwik.dev/core import.
    const out = await code("SlotWithDefault", "qwik");
    expect(out).toContain("<Slot>");
    expect(out).toContain("Default content");
    expect(out).toContain('<Slot name="actions">');
    expect(out).toContain("Action area");
    expect(out).toContain('Slot } from "@qwik.dev/core"');
    expect(out).not.toContain("props.children");
  });

  it("Astro: named-slot fallback renders (non-self-closing <slot> with default content)", async () => {
    // Astro renders fallback between <slot>...</slot>; the `<span>Action area</span>` and
    // `<p>Default content</p>` defaults are emitted as each slot's children.
    const out = await code("SlotWithDefault", "astro");
    expect(out).toContain('<slot name="actions">');
    expect(out).toContain("Action area");
    expect(out).toContain("Default content");
    expect(out).not.toContain("<slot />");
  });
});

// --- DefineSlotBasic: defineSlot("header") + defineSlot() rendered via {expr} -----------------
describe("DefineSlotBasic: defineSlot() bindings", () => {
  it("React: defineSlot('header') → renderHeader prop; defineSlot() → children", async () => {
    const out = await code("DefineSlotBasic", "react");
    expect(out).toContain("{props.renderHeader?.()}");
    expect(out).toContain("{props.children}");
  });

  it("Vue: defineSlot bindings resolve to native named/default slots", async () => {
    const out = await code("DefineSlotBasic", "vue");
    expect(out).toContain('<slot name="header" />');
    expect(out).toContain("<slot />");
  });

  it("Angular: defineSlot bindings resolve to ng-content projection", async () => {
    const out = await code("DefineSlotBasic", "angular");
    expect(out).toContain('<ng-content select="[slot=header]"></ng-content>');
    expect(out).toContain("<ng-content></ng-content>");
  });
});

// --- SlotInConditional: <Slot name="header" /> + <Show><Slot /></Show> ------------------------
describe("SlotInConditional: default slot inside a Show/conditional", () => {
  it("React: header slot + ternary-gated default slot", async () => {
    const out = await code("SlotInConditional", "react");
    expect(out).toContain("{props.renderHeader?.()}");
    expect(out).toContain("{expanded ? props.children : null}");
  });

  it("Vue: conditional becomes v-if on the default <slot>", async () => {
    const out = await code("SlotInConditional", "vue");
    expect(out).toContain('<slot v-if="expanded" />');
  });

  it("Solid: default slot nested inside <Show when={expanded()}>", async () => {
    const out = await code("SlotInConditional", "solid");
    expect(out).toContain("<Show when={expanded()}>");
    expect(out).toContain("{props.children}");
  });

  it("Astro: conditional references `expanded` that is never declared in frontmatter", async () => {
    // BUG: the signal `expanded` is declared in every other target (useState/ref/createSignal/
    // $state/signal/useSignal) but the Astro frontmatter only declares `__attrs` — there is no
    // `const expanded = ...`. The template then evaluates `{expanded ? (<slot />) : null}`, an
    // unbound reference that throws "expanded is not defined" at render time.
    const out = await code("SlotInConditional", "astro");
    expect(out).toContain("{expanded ? (<slot />) : null}");
    expect(out).not.toContain("const expanded");
  });
});
