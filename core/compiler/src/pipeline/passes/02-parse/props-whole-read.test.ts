import { describe, it, expect } from "vitest";
import { compileFixture, FIXTURES_DIR } from "../../../testing/harness.ts";
import { ALL_TARGETS } from "../../../codegen/context.ts";
import { compile } from "../../compile.ts";
import { resolve } from "node:path";

// INK0076 is reported by the parse pass, before any target runs, so "the same on all seven targets"
// is a property of where the check lives rather than of seven separate implementations. These tests
// pin that, and pin the forms the rule must NOT fire on — that half is what keeps the corpus green.

const CHANNELS = [
  ["macro", "Diag_PropsWholeRead"],
  ["annotation", "Diag_PropsWholeReadParam"],
] as const;

describe("a whole-object read of `props`", () => {
  for (const [channel, fixture] of CHANNELS) {
    it(`reports INK0076 once for the ${channel} channel`, async () => {
      const compiled = await compileFixture(fixture, ALL_TARGETS);
      const reported = compiled.diagnostics.filter((d) => d.code === "INK0076");

      expect(reported).toHaveLength(1);
      expect(reported[0]!.severity).toBe("error");
    });

    it(`reports the same diagnostics for every target on its own (${channel} channel)`, async () => {
      const perTarget = await Promise.all(
        ALL_TARGETS.map(async (target) => {
          const compiled = await compileFixture(fixture, [target]);
          return [target, compiled.diagnostics.map((d) => d.code)] as const;
        }),
      );

      for (const [target, codes] of perTarget) {
        expect(codes, target).toEqual(["INK0076"]);
      }
    });
  }

  // Each of these reaches the output the same way `String(props)` does: on Angular as a class member
  // nothing declares, on Svelte as `{ label, ...__attrs }` — the destructured shape, which carries
  // every passed-through attribute and so is not the object the author wrote.
  it.each([
    ["String()", "String(props)"],
    ["JSON.stringify()", "JSON.stringify(props)"],
    ["Object.keys()", "String(Object.keys(props))"],
    ["a spread", "JSON.stringify({ ...props })"],
    ["a comparison", "String(props === undefined)"],
  ])("reports a whole-object read through %s", async (_form, expr) => {
    const codes = await compileSource(`
export interface WholeProps {
  label: string;
}

export default defineComponent(() => {
  const props = defineProps<WholeProps>();
  return <div title={${expr}} />;
});
`);

    expect(codes).toContain("INK0076");
  });

  it("reports each whole-object read separately", async () => {
    const codes = await compileSource(`
export interface WholeProps {
  label: string;
}

export default defineComponent(() => {
  const props = defineProps<WholeProps>();
  return <div title={String(props)} id={JSON.stringify(props)} />;
});
`);

    expect(codes.filter((c) => c === "INK0076")).toHaveLength(2);
  });

  // The false-positive guard, and the reason the rule is scoped to a bare identifier: `props.<name>`
  // is the form every target rewrites, and it is what the whole component corpus is written in.
  it("stays silent on a property read", async () => {
    const codes = await compileSource(`
export interface WholeProps {
  label: string;
}

export default defineComponent(() => {
  const props = defineProps<WholeProps>();
  return <div title={props.label} />;
});
`);

    expect(codes).not.toContain("INK0076");
  });

  // Destructuring names its members statically, so every target already lowers it to the same
  // locals. It reads the object as a whole syntactically but not in any way the rewriter cannot
  // follow — firing here would refuse a shape that works today.
  it("stays silent on a destructuring of the binding", async () => {
    const codes = await compileSource(`
export interface WholeProps {
  label: string;
}

export default defineComponent(() => {
  const props = defineProps<WholeProps>();
  const { label } = props;
  return <div title={label} />;
});
`);

    expect(codes).not.toContain("INK0076");
  });

  // A misnamed binding read as a whole is one mistake, and INK0074 already names it. Reporting both
  // would make the author fix the name only to be handed a second error for the same line.
  it("defers to INK0074 when the binding is also misnamed", async () => {
    const codes = await compileSource(`
export interface WholeProps {
  label: string;
}

export default defineComponent(() => {
  const p = defineProps<WholeProps>();
  return <div title={String(p)} />;
});
`);

    expect(codes).toContain("INK0074");
    expect(codes).not.toContain("INK0076");
  });

  // Symbol identity, not text, decides what counts as a read — the same guard INK0074 carries. A
  // same-named local in a sibling component resolves elsewhere, and `obj.props` is a property.
  it("does not count a same-named symbol elsewhere as a read", async () => {
    const codes = await compileSource(`
export interface WholeProps {
  label: string;
}

export const Sibling = defineComponent(() => {
  const props = { value: 1 };
  return <div title={String(props)} />;
});

export default defineComponent(() => {
  const props = defineProps<WholeProps>();
  return <div title={props.label} id={String({ props: 1 }.props)} />;
});
`);

    expect(codes).not.toContain("INK0076");
  });

  // The headless components in `ui/components` bind `defineProps` only to name their props type and
  // never read the result. Nothing reaches the output, so nothing may be refused.
  it("stays silent when nothing reads the binding", async () => {
    const codes = await compileSource(`
export interface EmptyProps {}

export default defineComponent(() => {
  const props = defineProps<EmptyProps>();
  return <div />;
});
`);

    expect(codes).not.toContain("INK0076");
  });
});

async function compileSource(body: string): Promise<readonly string[]> {
  const source = `import { defineComponent, defineProps } from "@inkline/core";\n${body}`;
  const result = await compile(
    { fileName: resolve(FIXTURES_DIR, "PropsWholeReadCase.ink.tsx"), source },
    { targets: ALL_TARGETS },
  );

  return result.diagnostics.map((d) => d.code);
}
