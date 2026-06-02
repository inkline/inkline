// Real-world codegen assertions for the "scoped-slots" feature area: author `.ink.tsx` →
// compile through the FULL pipeline → assert the ACTUAL generated framework code.
//
// Focus: scoped / render-prop slots and how each target threads the slot ARGUMENTS through.
// Fixtures:
//   - ScopedSlot:        a `<For>` whose child is a render-prop `(item, index) => ...` (no <Slot>)
//   - SlotScoped:        a named `<Slot name="item" args={[item, index]}>` inside a `<For>`
//   - SlotScopedSingle:  a default `<Slot args={[value()]}>` with fallback content
//
// To inspect a fixture's real output while writing assertions, compile it and log the contents:
//   const r = await compileFixture("SlotScoped"); console.log(r.files.angular![0].contents);

import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  return files![0]!.contents;
}

// ---------------------------------------------------------------------------
// ScopedSlot: `<For>` with a render-prop child (item, index) => <li>...</li>
// There is no <Slot> here — the render prop is inlined per target.
// ---------------------------------------------------------------------------
describe("ScopedSlot: For render-prop child inlined per target", () => {
  it("React: render prop becomes .map((item, index) => ...) inlining the <li>", async () => {
    const out = await code("ScopedSlot", "react");
    expect(out).toContain("items.map((item, index) => (");
    expect(out).toContain("<li>{index}:{item.label}</li>");
    // BUG: the `key` prop is emitted as the raw key *function* `item => item.id`, not the
    // computed value `item.id`. React will coerce a function to a string key → identical keys
    // for every row, breaking reconciliation.
    expect(out).toContain("key={item => item.id}");
  });

  it("Solid: render prop becomes a <For> child function reading item/index", async () => {
    const out = await code("ScopedSlot", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain("{(item, index) => <li>{index}:{item.label}</li>}");
  });

  it("Vue: For lowers to v-for; loop vars item/index are in template scope", async () => {
    const out = await code("ScopedSlot", "vue");
    expect(out).toContain('<li v-for="(item, index) in items" :key="item.id">');
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
  });

  it("Angular: @for declares `item` but NOT `index`, and uses an arrow as track", async () => {
    const out = await code("ScopedSlot", "angular");
    // BUG: `index` is referenced in the template (`{{ index }}`) but the @for block never
    // declares it (`let index = $index` is missing) → Angular template compile error.
    expect(out).toContain("@for (item of items(); track item => item.id) {");
    expect(out).toContain("{{ index }}");
    // BUG: `track item => item.id` is an arrow function; Angular's track expects an expression
    // like `item.id`. An arrow here is an invalid track expression.
  });

  it("Astro: the `items` signal is DROPPED from the frontmatter but used in the body", async () => {
    const out = await code("ScopedSlot", "astro");
    // BUG: the body maps over `items`, but the frontmatter only declares `__attrs` — `items`
    // is never defined → ReferenceError at render time.
    expect(out).toContain("{items.map((item, index) => (<li>");
    expect(out).not.toContain("const items");
  });
});

// ---------------------------------------------------------------------------
// SlotScoped: named scoped slot `<Slot name="item" args={[item, index]}>` in a For.
// This is where targets diverge most: render-prop targets pass args as a function call,
// Vue/Svelte bind named slot props, Angular/Astro drop them.
// ---------------------------------------------------------------------------
describe("SlotScoped: named scoped slot with args={[item, index]}", () => {
  it("React: named slot → optional render prop `renderItem`, called with (item, index)", async () => {
    const out = await code("SlotScoped", "react");
    expect(out).toContain("renderItem?: (...args: any[]) => React.ReactNode");
    expect(out).toContain("const { renderItem, ...__attrs } = props");
    // render prop is invoked with the scope args, falling back to the authored content
    expect(out).toContain("{props.renderItem?.(item, index) ?? <>{index}:{item.label}</>}");
  });

  it("Solid: named slot → `item` render prop, split out of fallthrough props", async () => {
    const out = await code("SlotScoped", "solid");
    expect(out).toContain("item?: (...args: any[]) => any");
    expect(out).toContain('splitProps(props, ["item"])');
    expect(out).toContain("{props.item?.(item, index) ?? <>{index}:{item.label}</>}");
  });

  it("Vue: named slot binds scope args as :item / :index slot props with fallback", async () => {
    const out = await code("SlotScoped", "vue");
    expect(out).toContain('<slot name="item" :item="item" :index="index">');
    // fallback content is preserved inside the slot
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
  });

  it("Svelte: named slot binds scope args as item={item} index={index} with fallback", async () => {
    const out = await code("SlotScoped", "svelte");
    expect(out).toContain('<slot name="item" item={item} index={index}>');
    expect(out).toContain("{index}:{item.label}");
  });

  it("Angular: scoped slot collapses to <ng-content> — args AND fallback are DROPPED", async () => {
    const out = await code("SlotScoped", "angular");
    // BUG: Angular has no scoped-slot equivalent. The `[item, index]` args and the fallback
    // `{index}: {item.label}` are silently dropped; only a projection point remains.
    expect(out).toContain('<ng-content select="[slot=item]" />');
    expect(out).not.toContain("item.label");
  });

  it("Astro: scoped slot loses its args, and `items` is undeclared in the body", async () => {
    const out = await code("SlotScoped", "astro");
    // BUG: args dropped — bare `<slot name="item" />`.
    expect(out).toContain('<slot name="item" />');
    // BUG: same dropped-signal problem as ScopedSlot — `items` is used but never declared.
    expect(out).toContain("{items.map((item, index) => (<li>");
    expect(out).not.toContain("const items");
  });
});

// ---------------------------------------------------------------------------
// SlotScopedSingle: a DEFAULT scoped slot `<Slot args={[value()]}>` with fallback.
// The single positional arg is named `value` (React/Qwik) or synthesized `prop0` (Vue/Svelte).
// ---------------------------------------------------------------------------
describe("SlotScopedSingle: default scoped slot with args={[value()]}", () => {
  it("React: default scoped slot → `renderDefault` render prop called with (value)", async () => {
    const out = await code("SlotScopedSingle", "react");
    expect(out).toContain("renderDefault?: (...args: any[]) => React.ReactNode");
    expect(out).toContain("{props.renderDefault?.(value) ?? <span>{value}</span>}");
  });

  it("Solid: default scoped slot → `default` render prop, value read via signal call", async () => {
    const out = await code("SlotScopedSingle", "solid");
    expect(out).toContain("default?: (...args: any[]) => any");
    expect(out).toContain('splitProps(props, ["default"])');
    expect(out).toContain("{props.default?.(value()) ?? <span>{value()}</span>}");
  });

  it("Vue: default scoped slot binds the positional arg as a synthetic :prop0", async () => {
    const out = await code("SlotScopedSingle", "vue");
    expect(out).toContain('<slot :prop0="value">');
    expect(out).toContain("{{ value }}");
  });

  it("Svelte: default scoped slot binds the positional arg as prop0={value}", async () => {
    const out = await code("SlotScopedSingle", "svelte");
    expect(out).toContain("<slot prop0={value}>");
    expect(out).toContain("{value}");
  });

  it("Angular: default scoped slot collapses to bare <ng-content /> — the `value` arg is dropped", async () => {
    const out = await code("SlotScopedSingle", "angular");
    // BUG: the scoped arg `value` and the fallback `<span>{value}</span>` are both dropped.
    expect(out).toContain("<ng-content />");
    expect(out).not.toContain("value }}");
  });

  it("Qwik: default scoped slot calls `props.children` as a function — children is JSX, not callable", async () => {
    const out = await code("SlotScopedSingle", "qwik");
    // BUG: Qwik's `children`/`Slot` projects JSX; it is not a render function. Calling
    // `props.children?.(value.value)` is broken at runtime for normal Qwik consumers.
    expect(out).toContain("const { children, ...__attrs } = props");
    expect(out).toContain("{props.children?.(value.value) ?? <span>{value.value}</span>}");
  });
});
