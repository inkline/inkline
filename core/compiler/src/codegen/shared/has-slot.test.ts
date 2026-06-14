// Emit tests for the `hasSlot("name")` primitive: each target lowers it to the slot-presence read it
// generates for that slot (or to `true` where slot presence isn't observable at runtime), composing
// safely under negation. Exercises the full pipeline via the `HasSlot` fixture.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../testing/codegen.ts";
import { compileFixture } from "../../testing/harness.ts";
import { foldConstTest } from "./expr-rewrite.ts";
import type { TargetName } from "../context.ts";

describe("foldConstTest", () => {
  it("folds boolean-literal tests (incl. negated `!true`) and leaves dynamic tests alone", () => {
    expect(foldConstTest("true")).toBe(true);
    expect(foldConstTest("false")).toBe(false);
    expect(foldConstTest("!true")).toBe(false);
    expect(foldConstTest("props.renderPrefix != null")).toBeUndefined();
    expect(foldConstTest("count() > 0")).toBeUndefined();
  });
});

// The runtime slot-presence read each target generates, for a named slot ("prefix"), the default slot,
// and the negated check (on "suffix") that must stay correct thanks to parenthesization.
const RUNTIME_PRESENCE = {
  react: {
    prefix: "(props.renderPrefix != null)",
    default: "(props.children != null)",
    negSuffix: "!(props.renderSuffix != null)",
  },
  solid: {
    prefix: "(props.prefix != null)",
    default: "(props.children != null)",
    negSuffix: "!(props.suffix != null)",
  },
  svelte: {
    prefix: "(prefixSnippet != null)",
    default: "(children != null)",
    negSuffix: "!(suffixSnippet != null)",
  },
  vue: {
    prefix: "!!$slots.prefix",
    default: "!!$slots.default",
    negSuffix: "!!!$slots.suffix",
  },
  astro: {
    prefix: 'Astro.slots.has("prefix")',
    default: 'Astro.slots.has("default")',
    negSuffix: '!Astro.slots.has("suffix")',
  },
} satisfies Record<string, { prefix: string; default: string; negSuffix: string }>;

describe("hasSlot: runtime slot-presence targets", () => {
  for (const [target, exp] of Object.entries(RUNTIME_PRESENCE)) {
    it(`${target}: lowers hasSlot to its slot-presence read`, async () => {
      const out = await compileTo("HasSlot", target as TargetName);
      expect(out, "named slot presence").toContain(exp.prefix);
      expect(out, "default slot presence").toContain(exp.default);
      expect(out, "negation composes correctly").toContain(exp.negSuffix);
      expect(out, "the hasSlot primitive is compiled away").not.toMatch(/\bhasSlot\b/);
    });

    it(`${target}: does not emit the INK0068 fallback notice`, async () => {
      const res = await compileFixture("HasSlot", [target as TargetName]);
      expect(res.diagnostics.map((d) => d.code)).not.toContain("INK0068");
    });
  }
});

describe("hasSlot: targets without a runtime slot-presence API", () => {
  for (const target of ["qwik", "angular"] as const) {
    it(`${target}: hasSlot is true (gated content always renders) and is compiled away`, async () => {
      const out = await compileTo("HasSlot", target);
      // The named-slot wrapper is always rendered (hasSlot → true), so CSS `:empty` must collapse it.
      expect(out).toContain('class="prefix"');
      expect(out, "the hasSlot primitive is compiled away").not.toMatch(/\bhasSlot\b/);
    });

    it(`${target}: emits the INK0068 info diagnostic`, async () => {
      const res = await compileFixture("HasSlot", [target]);
      expect(res.diagnostics.map((d) => d.code)).toContain("INK0068");
      // It's informational, not an error — the compile still succeeds.
      expect(res.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
    });
  }
});

// When `!hasSlot(...)` folds to constant-false on Angular/Qwik, the lone branch drops out; a
// `<Show ... fallback>` must then render its fallback unconditionally — not orphan it behind a
// dangling `@else`/ternary (HasSlotFallback exercises exactly this).
describe("hasSlot: a fallback survives when every branch folds away", () => {
  it("angular: renders the fallback unconditionally with no `@if`/`@else`", async () => {
    const out = await compileTo("HasSlotFallback", "angular");
    expect(out, "no bare `@else` (would be invalid without a preceding `@if`)").not.toContain(
      "@else",
    );
    expect(out, "no `@if` either — the only branch folded away").not.toContain("@if");
    expect(out, "the fallback renders").toContain('class="has-suffix"');
    expect(out, "the folded-away branch is dropped").not.toContain('class="no-suffix"');
    expect(out, "the hasSlot primitive is compiled away").not.toMatch(/\bhasSlot\b/);
  });

  it("qwik: renders the fallback unconditionally", async () => {
    const out = await compileTo("HasSlotFallback", "qwik");
    expect(out).toContain('class="has-suffix"');
    expect(out, "the folded-away branch is dropped").not.toContain('class="no-suffix"');
  });

  it("react: keeps the real runtime conditional (fix is Angular/Qwik-local)", async () => {
    const out = await compileTo("HasSlotFallback", "react");
    expect(out).toContain("props.renderSuffix != null");
    // React renders `class` as `className`; both branches survive (runtime presence check).
    expect(out, "both branches survive on a runtime-presence target").toContain(
      'className="no-suffix"',
    );
    expect(out).toContain('className="has-suffix"');
  });
});
