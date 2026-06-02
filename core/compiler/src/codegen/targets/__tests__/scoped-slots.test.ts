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
    // The `key` prop is the EXTRACTED value `item.id` (on the per-row Fragment wrapper),
    // not the raw key arrow — so reconciliation gets a stable per-row identity.
    expect(out).toContain("<Fragment key={item.id}>");
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

  it("Angular: @for declares `item` AND `index`, tracking the extracted key expression", async () => {
    const out = await code("ScopedSlot", "angular");
    // `track` uses the EXTRACTED key expression `item.id` (not a raw arrow), and because the
    // template references `index`, the block declares it via `let index = $index`.
    expect(out).toContain("@for (item of items(); track item.id; let index = $index) {");
    expect(out).toContain("{{ index }}");
    expect(out).toContain("{{ item.label }}");
  });

  it("Astro: the `items` signal is declared as `let items` in the frontmatter and mapped in the body", async () => {
    const out = await code("ScopedSlot", "astro");
    // State is now declared in the frontmatter as `let items = <initial>` (no signal runtime),
    // so the body's `items.map(...)` resolves to a real binding instead of a ReferenceError.
    expect(out).toContain('let items = [{ id: 1, label: "One" }, { id: 2, label: "Two" }]');
    expect(out).toContain("{items.map((item, index) => (<li>");
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

  it("Astro: scoped slot loses its args (residual bug), but `items` is now declared in the frontmatter", async () => {
    const out = await code("SlotScoped", "astro");
    // `items` is now declared as `let items = <initial>` in the frontmatter and used in the body.
    expect(out).toContain('let items = [{ id: 1, label: "One" }, { id: 2, label: "Two" }]');
    expect(out).toContain("{items.map((item, index) => (<li>");
    // BUG (residual): Astro has no scoped-slot mechanism. The `[item, index]` slot args are
    // dropped — only a bare `<slot name="item" />` projection point remains, with no way for a
    // consumer to receive the per-row scope.
    expect(out).toContain('<slot name="item" />');
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
