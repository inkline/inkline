import { describe, it, expect } from "vitest";
import { compileFixture, FIXTURES_DIR } from "../../../testing/harness.ts";
import { ALL_TARGETS } from "../../../codegen/context.ts";
import { compile } from "../../compile.ts";
import { resolve } from "node:path";

// INK0074 is reported by the parse pass, before any target runs, so "the same on all seven targets"
// is a property of where the check lives rather than of seven separate implementations. These tests
// pin that: the code is reported once per binding, whichever targets are asked for.

const CHANNELS = [
  ["macro", "Diag_PropsBindingName"],
  ["annotation", "Diag_PropsParamName"],
] as const;

describe("a props binding not named `props`", () => {
  for (const [channel, fixture] of CHANNELS) {
    it(`reports INK0074 once for the ${channel} channel, naming the binding`, async () => {
      const compiled = await compileFixture(fixture, ALL_TARGETS);
      const reported = compiled.diagnostics.filter((d) => d.code === "INK0074");

      expect(reported).toHaveLength(1);
      expect(reported[0]!.severity).toBe("error");
      expect(reported[0]!.title).toContain('"p"');
    });

    it(`reports the same diagnostics for every target on its own (${channel} channel)`, async () => {
      const perTarget = await Promise.all(
        ALL_TARGETS.map(async (target) => {
          const compiled = await compileFixture(fixture, [target]);
          return [target, compiled.diagnostics.map((d) => d.code)] as const;
        }),
      );

      for (const [target, codes] of perTarget) {
        expect(codes, target).toEqual(["INK0074"]);
      }
    });
  }

  // The false-positive guard. Both channels bound to `props` are the shape every component in the
  // repo uses; a check that fired on them would break the whole corpus rather than this one bug.
  it("stays silent when the binding is named `props`", async () => {
    for (const fixture of ["PropsMacroType", "IButton"]) {
      const compiled = await compileFixture(fixture, ALL_TARGETS);
      expect(
        compiled.diagnostics.map((d) => d.code),
        fixture,
      ).not.toContain("INK0074");
    }
  });

  // The headless components in `ui/components` call `defineProps<EmptyProps>()` only to name their
  // props type, and bind the unread result to `_props` for the unused-variable rule. Nothing reads
  // the binding, so nothing reaches the output — refusing the name here would fail four components
  // that emit nothing broken.
  it("stays silent when nothing reads the binding", async () => {
    const codes = await compileSource(`
export interface EmptyProps {}

export default defineComponent(() => {
  const _props = defineProps<EmptyProps>();
  return <div />;
});
`);

    expect(codes).not.toContain("INK0074");
  });

  // The gate is a read of the binding, not a declared prop. A binding that declares no prop can
  // still be read as a whole object, and that read reaches the output on all seven targets naming
  // an identifier nothing declares — the same bug in a smaller cell.
  it("reports a whole-object read of an empty props binding, both channels", async () => {
    const macro = await compileSource(`
export interface EmptyProps {}

export default defineComponent(() => {
  const _props = defineProps<EmptyProps>();
  return <div title={String(_props)} />;
});
`);
    const annotation = await compileSource(`
export interface EmptyProps {}

export default defineComponent((p: EmptyProps) => {
  return <div title={String(p)} />;
});
`);

    expect(macro).toContain("INK0074");
    expect(annotation).toContain("INK0074");
  });

  // Symbol identity, not text, decides what counts as a read. A same-named local in a sibling
  // component and a property of that name both resolve elsewhere, so neither may fire the rule.
  it("does not count a same-named symbol elsewhere as a read", async () => {
    const codes = await compileSource(`
export interface EmptyProps {}

export const Sibling = defineComponent(() => {
  const p = { value: 1 };
  return <div title={String(p.value)} />;
});

export default defineComponent((p: EmptyProps) => {
  return <div title={String({ p: 1 }.p)} />;
});
`);

    expect(codes).not.toContain("INK0074");
  });
});

async function compileSource(body: string): Promise<readonly string[]> {
  const source = `import { defineComponent, defineProps } from "@inkline/core";\n${body}`;
  const result = await compile(
    { fileName: resolve(FIXTURES_DIR, "PropsBindingCase.ink.tsx"), source },
    { targets: ALL_TARGETS },
  );

  return result.diagnostics.map((d) => d.code);
}
