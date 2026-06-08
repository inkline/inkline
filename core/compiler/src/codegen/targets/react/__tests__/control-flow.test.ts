// Control-flow codegen for the React target: Show/when/fallback, root-level
// conditionals, Switch/Match, conditional class binding, and memoized reads.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// Conditional: <Show when fallback> per-target if/else syntax
// ---------------------------------------------------------------------------
describe("Conditional: Show/when/fallback control flow", () => {
  it("React: ternary with fallback as the else branch", async () => {
    const out = await compileTo("Conditional", "react");
    expect(out).toContain("{visible ? <span>Visible</span> : <span>Hidden</span>}");
  });
});

// ---------------------------------------------------------------------------
// RootConditional: a <Show> that is the component's entire render
// ---------------------------------------------------------------------------
describe("RootConditional: conditional as the root render node", () => {
  // A brace-wrapped ternary is a JSX expression *container* — valid only as a child of a JSX
  // element. At the root of `return (…)` the braces would parse as an object literal, so JSX targets
  // that lower <Show> to a ternary must emit it bare. Regression test for the input control's build
  // failure ("Expected `,` or `}` but found `.`").
  it("React: bare ternary inside return, not wrapped in {…}", async () => {
    const out = await compileTo("RootConditional", "react");
    expect(out).toContain("return (\nprops.textarea ? <textarea /> : <input />)");
    expect(out).not.toContain("return (\n{");
  });
});

// ---------------------------------------------------------------------------
// SwitchTabs: <Switch>/<Match> control flow
// ---------------------------------------------------------------------------
describe("SwitchTabs: Switch/Match control flow", () => {
  it("React: chained ternaries terminated with null", async () => {
    const out = await compileTo("SwitchTabs", "react");
    expect(out).toContain('{tab === "a" ? <p>Tab A</p> : tab === "b" ? <p>Tab B</p> : null}');
  });
});

// ---------------------------------------------------------------------------
// ConditionalClass: conditional class binding per target
// ---------------------------------------------------------------------------
describe("ConditionalClass: conditional class binding", () => {
  it("React: ternary merged with props.className via filter/join", async () => {
    const out = await compileTo("ConditionalClass", "react");
    expect(out).toContain(
      'className={[active ? "active" : "inactive", props.className].filter(Boolean).join(" ")}',
    );
  });
});

// ---------------------------------------------------------------------------
// ConditionalRead: createMemo over a conditional read of two signals
// ---------------------------------------------------------------------------
describe("ConditionalRead: memoized conditional read", () => {
  it("React: useMemo with all three reads in the dependency array", async () => {
    const out = await compileTo("ConditionalRead", "react");
    expect(out).toContain("const value = useMemo(() => (flag ? a : b), [flag, a, b])");
  });
});
