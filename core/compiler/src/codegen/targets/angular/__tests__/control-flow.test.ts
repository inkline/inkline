// Angular control-flow codegen: @if/@else blocks, @for loops, computed memos,
// and conditional class bindings.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  it("Angular: @if / @else block control flow", async () => {
    const out = await compileTo("Conditional", "angular");
    expect(out).toContain("@if (visible()) {");
    expect(out).toContain("} @else {");
  });
});

// ---------------------------------------------------------------------------
// SwitchTabs: <Switch>/<Match> control flow
// ---------------------------------------------------------------------------
describe("SwitchTabs: Switch/Match control flow", () => {
  // Angular now lowers the switch-on-true to an @if / @else if chain with
  // single-quoted string literals so the bindings stay valid inside the
  // double-quoted template, and the setter call becomes `tab.set(...)`.
  it("Angular: @if / @else if chain with single-quoted bindings", async () => {
    const out = await compileTo("SwitchTabs", "angular");
    expect(out).toContain("@if (tab() === 'a') {");
    expect(out).toContain("}@else if (tab() === 'b') {");
    expect(out).toContain("(click)=\"tab.set(tab() === 'a' ? 'b' : 'a')\"");
  });
});

// ---------------------------------------------------------------------------
// ConditionalClass: conditional class binding per target
// ---------------------------------------------------------------------------
describe("ConditionalClass: conditional class binding", () => {
  // Angular emits the conditional class as a single-quoted ternary so the inner
  // string literals don't terminate the double-quoted `[class]="..."` binding.
  it("Angular: single-quoted ternary inside the [class] binding", async () => {
    const out = await compileTo("ConditionalClass", "angular");
    expect(out).toContain("[class]=\"active() ? 'active' : 'inactive'\"");
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("Angular: computed memo qualifies every read with this.", async () => {
    const out = await compileTo("ConditionalRead", "angular");
    expect(out).toContain("value = computed(() => (this.flag() ? this.a() : this.b()))");
  });
});

// ---------------------------------------------------------------------------
// MixedControlFlow: For + Show nested control flow
// ---------------------------------------------------------------------------
describe("MixedControlFlow: For + Show nesting", () => {
  it("Angular: @for over items() with nested @if", async () => {
    const out = await compileTo("MixedControlFlow", "angular");
    expect(out).toContain("@for (item of items();");
    expect(out).toContain("@if (item.includes(filter())) {");
  });
});
