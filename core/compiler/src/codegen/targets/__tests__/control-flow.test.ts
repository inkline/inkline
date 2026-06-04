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
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  it("React: ternary with fallback as the else branch", async () => {
    const out = await code("Conditional", "react");
    expect(out).toContain("{visible ? <span>Visible</span> : <span>Hidden</span>}");
  });

  it("Vue: v-if / v-else split across the two branches", async () => {
    const out = await code("Conditional", "vue");
    expect(out).toContain('<span v-if="visible">');
    expect(out).toContain("<span v-else>");
  });

  it("Solid: <Show> keeps when() reactive and wraps fallback in a fragment", async () => {
    const out = await code("Conditional", "solid");
    expect(out).toContain("<Show when={visible()} fallback={<><span>Hidden</span></>}>");
  });

  it("Angular: @if / @else block control flow", async () => {
    const out = await code("Conditional", "angular");
    expect(out).toContain("@if (visible()) {");
    expect(out).toContain("} @else {");
  });

  it("Svelte: {#if}/{:else}/{/if} block", async () => {
    const out = await code("Conditional", "svelte");
    expect(out).toContain("{#if visible}");
    expect(out).toContain("{:else}");
    expect(out).toContain("{/if}");
  });

  // Astro declares signal state in the frontmatter as `let visible = <initial>`
  // and rewrites the setter call to a direct assignment, so `visible` is in
  // scope for the template ternary.
  it("Astro: declares `visible` state in frontmatter and rewrites setter to direct assignment", async () => {
    const out = await code("Conditional", "astro");
    expect(out).toContain("const { ...__attrs } = props;");
    expect(out).toContain("let visible = true");
    expect(out).toContain("{visible ? (<span>");
    expect(out).toContain("onClick={() => visible = !visible}");
  });
});

// ---------------------------------------------------------------------------
// SwitchTabs: <Switch>/<Match> control flow
// ---------------------------------------------------------------------------
describe("SwitchTabs: Switch/Match control flow", () => {
  it("React: chained ternaries terminated with null", async () => {
    const out = await code("SwitchTabs", "react");
    expect(out).toContain('{tab === "a" ? <p>Tab A</p> : tab === "b" ? <p>Tab B</p> : null}');
  });

  it("Vue: v-if / v-else-if with single-quoted bindings", async () => {
    const out = await code("SwitchTabs", "vue");
    expect(out).toContain("<p v-if='tab === \"a\"'>");
    expect(out).toContain("<p v-else-if='tab === \"b\"'>");
  });

  it("Solid: native <Switch>/<Match when> primitives preserved", async () => {
    const out = await code("SwitchTabs", "solid");
    expect(out).toContain("<Switch>");
    expect(out).toContain('<Match when={tab() === "a"}>');
    expect(out).toContain('<Match when={tab() === "b"}>');
  });

  it("Svelte: {#if}/{:else if}/{/if} chain", async () => {
    const out = await code("SwitchTabs", "svelte");
    expect(out).toContain('{#if tab === "a"}');
    expect(out).toContain('{:else if tab === "b"}');
  });

  // Angular now lowers the switch-on-true to an @if / @else if chain with
  // single-quoted string literals so the bindings stay valid inside the
  // double-quoted template, and the setter call becomes `tab.set(...)`.
  it("Angular: @if / @else if chain with single-quoted bindings", async () => {
    const out = await code("SwitchTabs", "angular");
    expect(out).toContain("@if (tab() === 'a') {");
    expect(out).toContain("}@else if (tab() === 'b') {");
    expect(out).toContain("(click)=\"tab.set(tab() === 'a' ? 'b' : 'a')\"");
  });
});

// ---------------------------------------------------------------------------
// ConditionalClass: conditional class binding per target
// ---------------------------------------------------------------------------
describe("ConditionalClass: conditional class binding", () => {
  it("React: ternary merged with props.className via filter/join", async () => {
    const out = await code("ConditionalClass", "react");
    expect(out).toContain(
      'className={[active ? "active" : "inactive", props.className].filter(Boolean).join(" ")}',
    );
  });

  it("Solid: ternary merged with props.class via filter/join", async () => {
    const out = await code("ConditionalClass", "solid");
    expect(out).toContain(
      'class={[active() ? "active" : "inactive", props.class].filter(Boolean).join(" ")}',
    );
  });

  it("Svelte: ternary merged with __attrs.class (destructured rest)", async () => {
    const out = await code("ConditionalClass", "svelte");
    expect(out).toContain(
      'class={[active ? "active" : "inactive", __attrs.class].filter(Boolean).join(" ")}',
    );
  });

  it("Vue: :class with single-quoted ternary binding", async () => {
    const out = await code("ConditionalClass", "vue");
    expect(out).toContain('<div :class=\'active ? "active" : "inactive"\'>');
  });

  // Angular emits the conditional class as a single-quoted ternary so the inner
  // string literals don't terminate the double-quoted `[class]="..."` binding.
  it("Angular: single-quoted ternary inside the [class] binding", async () => {
    const out = await code("ConditionalClass", "angular");
    expect(out).toContain("[class]=\"active() ? 'active' : 'inactive'\"");
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("React: useMemo with all three reads in the dependency array", async () => {
    const out = await code("ConditionalRead", "react");
    expect(out).toContain("const value = useMemo(() => (flag ? a : b), [flag, a, b])");
  });

  it("Vue: computed reads each ref through .value", async () => {
    const out = await code("ConditionalRead", "vue");
    expect(out).toContain("const value = computed(() => (flag.value ? a.value : b.value))");
  });

  it("Solid: createMemo keeps signal calls", async () => {
    const out = await code("ConditionalRead", "solid");
    expect(out).toContain("const value = createMemo(() => (flag() ? a() : b()))");
  });

  it("Angular: computed memo qualifies every read with this.", async () => {
    const out = await code("ConditionalRead", "angular");
    expect(out).toContain("value = computed(() => (this.flag() ? this.a() : this.b()))");
  });

  it("Svelte: $derived expression over $state signals", async () => {
    const out = await code("ConditionalRead", "svelte");
    expect(out).toContain("let value = $derived((flag ? a : b))");
  });

  it("Qwik: useComputed$ reads through .value", async () => {
    const out = await code("ConditionalRead", "qwik");
    expect(out).toContain("const value = useComputed$(() => (flag.value ? a.value : b.value))");
  });

  // Astro declares each signal as `let <name> = <initial>` in the frontmatter,
  // so the hoisted memo `const value = (flag ? a : b)` resolves its reads.
  it("Astro: memo reads frontmatter-declared signal identifiers", async () => {
    const out = await code("ConditionalRead", "astro");
    expect(out).toContain("let flag = true");
    expect(out).toContain("let a = 10");
    expect(out).toContain("let b = 20");
    expect(out).toContain("const value = (flag ? a : b)");
  });
});

// ---------------------------------------------------------------------------
// MixedControlFlow: For + Show nested control flow
// ---------------------------------------------------------------------------
describe("MixedControlFlow: For + Show nesting", () => {
  it("Vue: v-for template wraps a v-if child", async () => {
    const out = await code("MixedControlFlow", "vue");
    expect(out).toContain('<template v-for="item in items" :key="item">');
    expect(out).toContain('<li v-if="item.includes(filter)">');
  });

  it("Angular: @for over items() with nested @if", async () => {
    const out = await code("MixedControlFlow", "angular");
    expect(out).toContain("@for (item of items();");
    expect(out).toContain("@if (item.includes(filter())) {");
  });

  it("Solid: <For each> wraps a <Show when> render child", async () => {
    const out = await code("MixedControlFlow", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain("<Show when={item.includes(filter())}><li>{item}</li></Show>");
  });

  // Qwik wraps the event handler in a single arrow inside $() and rewrites the
  // setter call to a direct signal assignment: `$(e => filter.value = ...)`.
  it("Qwik: event handler single-wrapped in $() with direct signal assignment", async () => {
    const out = await code("MixedControlFlow", "qwik");
    expect(out).toContain("onInput={$(e => filter.value = e.target.value)}");
  });
});
