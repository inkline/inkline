/**
 * UXF-165 / PR #568 — review repro. Drop into `core/compiler/src/pipeline/` and run:
 *
 *   pnpm --filter @inkline/compiler exec vp test run src/pipeline/uxf165-review-repro.test.ts
 *
 * On `agent/signal/7b21f59a` (PR #568 head): B1, B2 and B3 FAIL, C1 and C2 pass.
 * Each failure asserts AC1 — "A4 and A5 each either compile correctly or produce a
 * diagnostic. No silent path remains."
 */
import { describe, it, expect } from "vitest";
import { compile } from "./compile.ts";

async function react(source: string) {
  const res = await compile({ fileName: "/Probe.ink.tsx", source }, { targets: ["react"] });
  return {
    codes: res.diagnostics.map((d) => d.code),
    out: (res.files.react ?? []).map((f) => f.contents).join("\n"),
  };
}

describe("UXF-165 AC1 — no silent path remains", () => {
  // ── BLOCKING ────────────────────────────────────────────────────────────────
  //
  // `emitTypeMembers` (setup.ts:66) returns `decl.members` for an interface, which is its
  // OWN members only — inherited members are dropped. No diagnostic is raised, so the
  // component compiles with an event the author declared and the props type does not.
  // That is byte-for-byte the A4 miscompile UXF-165 exists to close.
  it("B1 — same-file interface with a heritage clause", async () => {
    const { codes, out } =
      await react(`import { defineComponent, defineEmits } from "@inkline/core";

interface Base { open: [] }
interface DialogEvents extends Base { close: [] }

export default defineComponent(() => {
  const emit = defineEmits<DialogEvents>();
  return (
    <div>
      <button onClick={() => emit("open")}>Open</button>
      <button onClick={() => emit("close")}>Close</button>
    </div>
  );
});
`);
    // Observed on PR head: codes === [], props type === "{ onClose?: () => void }",
    // body contains `props.onOpen?.()`.
    if (!codes.includes("INK0042")) {
      expect(out, 'emit("open") compiled against a prop nothing declares').toContain("onOpen?:");
    }
  });

  // The same-file guard at setup.ts:63 is bypassed entirely when the cross-module type is
  // reached through a heritage clause rather than named directly. `import type { Base }`
  // named directly DOES produce INK0042 (verified) — `extends Base` does not.
  it("B2 — same-file interface merging drops the second declaration", async () => {
    const { codes, out } =
      await react(`import { defineComponent, defineEmits } from "@inkline/core";

interface Ev { close: [] }
interface Ev { open: [] }

export default defineComponent(() => {
  const emit = defineEmits<Ev>();
  return <button onClick={() => emit("open")}>Open</button>;
});
`);
    if (!codes.includes("INK0042")) {
      expect(out, 'emit("open") compiled against a prop nothing declares').toContain("onOpen?:");
    }
  });

  // `reportSlotsOutsideRender` (setup.ts:120) skips the entire `renderExpr` subtree, but
  // lowering does not descend into every construct inside it. A `<Slot>` nested in an arrow
  // within the render expression is therefore neither lowered nor diagnosed — it survives
  // into the output verbatim against a `Slot` the target never imports. That is byte-for-byte
  // the A5 miscompile.
  it("B3 — <Slot> nested in an arrow inside the render expression", async () => {
    const { codes, out } = await react(`import { defineComponent, Slot } from "@inkline/core";

export default defineComponent(() => {
  return <div>{(() => <Slot name="icon" />)()}</div>;
});
`);
    if (!codes.includes("INK0069")) {
      expect(out, "<Slot> survived verbatim into the output").not.toContain("<Slot");
    }
  });

  // ── CONTROLS — these pass on PR head and must keep passing ──────────────────
  it("C1 — same-file alias resolves (the PR's headline fix)", async () => {
    const { codes, out } =
      await react(`import { defineComponent, defineEmits } from "@inkline/core";

type DialogEvents = { close: []; resize: [width: number] };

export default defineComponent(() => {
  const emit = defineEmits<DialogEvents>();
  return <button onClick={() => emit("close")}>Close</button>;
});
`);
    expect(codes).toEqual([]);
    expect(out).toContain("onClose?: () => void");
    expect(out).toContain("onResize?: (width: number) => void");
  });

  it("C2 — <Slot> in the render tree still lowers (no false positive)", async () => {
    const { codes, out } = await react(`import { defineComponent, Slot } from "@inkline/core";

export default defineComponent(() => {
  return <div><Slot name="icon" /></div>;
});
`);
    expect(codes).toEqual([]);
    expect(out).toContain("icon?: React.ReactNode");
    expect(out).not.toContain("<Slot");
  });
});
