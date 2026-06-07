// Solid codegen: control-flow lowering — Show/when/fallback, Switch/Match,
// conditional class bindings, memoized conditional reads, and For + Show nesting.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  it("Solid: <Show> keeps when() reactive and wraps fallback in a fragment", async () => {
    const out = await compileTo("Conditional", "solid");
    expect(out).toContain("<Show when={visible()} fallback={<><span>Hidden</span></>}>");
  });
});

// ---------------------------------------------------------------------------
// SwitchTabs: <Switch>/<Match> control flow
// ---------------------------------------------------------------------------
describe("SwitchTabs: Switch/Match control flow", () => {
  it("Solid: native <Switch>/<Match when> primitives preserved", async () => {
    const out = await compileTo("SwitchTabs", "solid");
    expect(out).toContain("<Switch>");
    expect(out).toContain('<Match when={tab() === "a"}>');
    expect(out).toContain('<Match when={tab() === "b"}>');
  });
});

// ---------------------------------------------------------------------------
// ConditionalClass: conditional class binding per target
// ---------------------------------------------------------------------------
describe("ConditionalClass: conditional class binding", () => {
  it("Solid: ternary merged with props.class via filter/join", async () => {
    const out = await compileTo("ConditionalClass", "solid");
    expect(out).toContain(
      'class={[active() ? "active" : "inactive", props.class].filter(Boolean).join(" ")}',
    );
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("Solid: createMemo keeps signal calls", async () => {
    const out = await compileTo("ConditionalRead", "solid");
    expect(out).toContain("const value = createMemo(() => (flag() ? a() : b()))");
  });
});

// ---------------------------------------------------------------------------
// MixedControlFlow: For + Show nested control flow
// ---------------------------------------------------------------------------
describe("MixedControlFlow: For + Show nesting", () => {
  it("Solid: <For each> wraps a <Show when> render child", async () => {
    const out = await compileTo("MixedControlFlow", "solid");
    expect(out).toContain("<For each={items()}>");
    expect(out).toContain("<Show when={item.includes(filter())}><li>{item}</li></Show>");
  });
});
