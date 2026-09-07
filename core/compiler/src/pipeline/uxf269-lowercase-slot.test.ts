/**
 * UXF-269 — regression guard for the lowercase `<slot>` hole.
 *
 * `controlFlow` lowers the capitalized `Slot` component only (03-lower/control-flow.ts:228). A
 * lowercase `<slot>` parses as an ordinary intrinsic element, so no pass ever looks at it: it
 * declares no slot, types no prop, and is copied into every target verbatim.
 *
 * The guard is written green-to-red on purpose. R1–R4 FAIL on `main` @ `0582dca5a` and pass once
 * the diagnostic lands. C1–C3 pass today and must keep passing — they are the false-positive wall.
 *
 *   pnpm --filter @inkline/compiler exec vp test run src/pipeline/uxf269-lowercase-slot.test.ts
 *
 * The code is reserved, not decided: INK0076 is the next free number (INK0075 → INK0080). The
 * compiler owner renames this one constant if they pick another.
 */
import { describe, it, expect } from "vitest";
import { compile } from "./compile.ts";
import { ALL_TARGETS, type TargetName } from "../codegen/context.ts";

const CODE = "INK0076";

async function compileAll(source: string) {
  const res = await compile({ fileName: "/Probe.ink.tsx", source }, { targets: ALL_TARGETS });
  return {
    // Widened to `string`: `DiagnosticCode` is a closed union and INK0076 is not in it yet, so the
    // narrow type would fail to COMPILE rather than fail as a test. The guard has to run today.
    codes: res.diagnostics.map((d) => d.code as string),
    out: (target: TargetName) => (res.files[target] ?? []).map((f) => f.contents).join("\n"),
  };
}

const SELF_CLOSING = `import { defineComponent } from "@inkline/core";

export default defineComponent(() => {
  return (
    <div>
      <slot />
    </div>
  );
});
`;

// The exact snippet core/compiler/README.md teaches under "### Slots" (line 399). The documented
// form is the broken one, which is why the mistake reaches five targets rather than none.
const DOCUMENTED = `import { defineComponent, Slot } from "@inkline/core";

export default defineComponent({ slots: { default: {}, prefix: {} } }, () => {
  return (
    <div>
      <span class="prefix">
        <Slot name="prefix" />
      </span>
      <slot>Default content</slot>
    </div>
  );
});
`;

const NAMED = `import { defineComponent } from "@inkline/core";

export default defineComponent(() => {
  return (
    <div>
      <slot name="icon" />
    </div>
  );
});
`;

describe("UXF-269 — a lowercase <slot> must not compile silently", () => {
  // ── R1–R4: fail today ───────────────────────────────────────────────────────

  it("R1 — <slot /> raises a diagnostic", async () => {
    const { codes } = await compileAll(SELF_CLOSING);
    expect(codes).toContain(CODE);
  });

  it("R2 — the form the README teaches raises a diagnostic", async () => {
    const { codes } = await compileAll(DOCUMENTED);
    expect(codes).toContain(CODE);
  });

  it('R3 — <slot name="icon" /> raises a diagnostic', async () => {
    const { codes } = await compileAll(NAMED);
    expect(codes).toContain(CODE);
  });

  // The guard the trigger asked for: all 7 targets, not React alone. Two failure shapes hide
  // behind one cause. On react/solid/svelte/angular/qwik the element is inert markup — nothing
  // projects into it, ever. On vue/astro it is that target's NATIVE slot outlet, so the render
  // is accidentally right while the component still declares no slot: no prop type, no fallback
  // wiring, no `hasSlot`. Identical source, divergent semantics per target — which is the reason
  // this cannot be caught in codegen. By then `<slot />` in the Vue output is the same token a
  // correctly lowered `<Slot />` produces (see codegen/targets/vue/__tests__/slots.test.ts:25 and
  // codegen/targets/astro/__tests__/slots.test.ts:13). The IR is the last place the two differ.
  it.each(ALL_TARGETS)("R4 — %s emits no unlowered <slot>", async (target) => {
    const { codes, out } = await compileAll(SELF_CLOSING);
    if (!codes.includes(CODE)) {
      expect(out(target), "an undeclared <slot> reached the output").not.toContain("<slot");
    }
  });

  // ── C1–C3: pass today, must keep passing ────────────────────────────────────

  it("C1 — <Slot /> still lowers with no diagnostic", async () => {
    const { codes, out } = await compileAll(`import { defineComponent, Slot } from "@inkline/core";

export default defineComponent(() => {
  return <div><Slot name="icon" /></div>;
});
`);
    expect(codes).toEqual([]);
    expect(out("react")).toContain("icon?: React.ReactNode");
  });

  // Vue and Astro emit `<slot>` for a CORRECTLY lowered `<Slot>`. The fix must key on the IR
  // element, never on the emitted text, or it takes the compiler's own output down with it.
  it("C2 — a lowered <Slot> still reaches the Vue and Astro output as <slot>", async () => {
    const { codes, out } = await compileAll(`import { defineComponent, Slot } from "@inkline/core";

export default defineComponent(() => {
  return <div><Slot /></div>;
});
`);
    expect(codes).toEqual([]);
    expect(out("vue")).toContain("<slot");
    expect(out("astro")).toContain("<slot");
  });

  it("C3 — an ordinary intrinsic element is untouched", async () => {
    const { codes } = await compileAll(`import { defineComponent } from "@inkline/core";

export default defineComponent(() => {
  return <div><span>hi</span></div>;
});
`);
    expect(codes).toEqual([]);
  });
});
