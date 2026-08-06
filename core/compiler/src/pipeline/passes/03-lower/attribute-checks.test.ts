/**
 * INK0072 / INK0073 are checked end-to-end rather than against a hand-built IR: both codes exist to
 * catch what the *typed authoring surface* structurally cannot, so a test that skipped parsing and
 * lowering would not be measuring the thing that is claimed. Every case below is a `.ink.tsx` source
 * string compiled the way an author's file is.
 */
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import type { Diagnostic } from "../../../core/diagnostics/codes.ts";
import { compile } from "../../compile.ts";
import { FIXTURES_DIR } from "../../../testing/harness.ts";

function component(body: string): string {
  return (
    `import { defineComponent, createSignal } from "@inkline/core";\n` +
    `export default defineComponent(() => {\n` +
    `  const [text, setText] = createSignal("");\n` +
    `  return (${body});\n` +
    `});\n`
  );
}

// Anchored inside the fixtures directory so `@inkline/core` resolves the way it does for a real
// author file; an unanchored name resolves nothing and silently yields zero components.
async function compileSource(source: string): Promise<readonly Diagnostic[]> {
  const result = await compile(
    { fileName: resolve(FIXTURES_DIR, "AttributeChecks.ink.tsx"), source },
    { targets: ["react"] },
  );
  return result.diagnostics;
}

const codesOf = (diags: readonly Diagnostic[]) => diags.map((d) => d.code);

describe("INK0072 — unknown ARIA attribute", () => {
  it("names the attribute and suggests the closest real one", async () => {
    const diags = await compileSource(component(`<div aria-hiddenn="true" />`));

    expect(codesOf(diags)).toEqual(["INK0072"]);
    expect(diags[0]!.severity).toBe("warning");
    expect(diags[0]!.title).toBe('Unknown ARIA attribute "aria-hiddenn"');
    expect(diags[0]!.help).toContain('Did you mean "aria-hidden"?');
  });

  it("reports without a suggestion when nothing is close enough", async () => {
    const diags = await compileSource(component(`<div aria-zzzzzzzzzz="1" />`));

    expect(codesOf(diags)).toEqual(["INK0072"]);
    expect(diags[0]!.help).not.toContain("Did you mean");
  });

  it("accepts every real ARIA attribute", async () => {
    const diags = await compileSource(
      component(`<div aria-hidden="true" aria-labelledby="x" aria-describedby="y" />`),
    );

    expect(diags).toEqual([]);
  });

  it("leaves data-* and ordinary attributes alone", async () => {
    const diags = await compileSource(component(`<div data-arialike="1" id="x" role="button" />`));

    expect(diags).toEqual([]);
  });
});

describe("INK0073 — invalid $bind: target", () => {
  it("rejects a target the element has nothing to write to", async () => {
    const diags = await compileSource(component(`<div $bind:totalNonsense={text} />`));

    expect(codesOf(diags)).toEqual(["INK0073"]);
    expect(diags[0]!.severity).toBe("error");
    expect(diags[0]!.title).toBe('Cannot two-way bind "$bind:totalNonsense" on <div>');
    expect(diags[0]!.help).toContain("<input>, <select> and <textarea>");
  });

  it("suggests the right attribute when the element does bind something", async () => {
    const diags = await compileSource(component(`<input $bind:valu={text} />`));

    expect(codesOf(diags)).toEqual(["INK0073"]);
    expect(diags[0]!.help).toContain('Did you mean "value"?');
    expect(diags[0]!.help).toContain('<input> binds "value" and "checked"');
  });

  it("accepts every native binding the lowering knows how to write back to", async () => {
    const diags = await compileSource(
      component(
        `<div>` +
          `<input $bind:value={text} />` +
          `<input type="checkbox" $bind:checked={text} />` +
          `<select $bind:value={text} />` +
          `<textarea $bind:value={text} />` +
          `</div>`,
      ),
    );

    expect(diags).toEqual([]);
  });

  it("leaves custom elements ungated — their bindable surface is unknowable here", async () => {
    const diags = await compileSource(component(`<my-widget $bind:open={text} />`));

    expect(diags).toEqual([]);
  });
});

describe("INK0073 on component instances", () => {
  it("accepts a bind that matches a defineModel prop", async () => {
    const source =
      `import { defineComponent, createSignal, defineModel } from "@inkline/core";\n` +
      `const Child = defineComponent(() => {\n` +
      `  const [open, setOpen] = defineModel("open");\n` +
      `  return <div>{open()}</div>;\n` +
      `});\n` +
      `export default defineComponent(() => {\n` +
      `  const [flag, setFlag] = createSignal(false);\n` +
      `  return <Child $bind:open={flag} />;\n` +
      `});\n`;

    expect(await compileSource(source)).toEqual([]);
  });

  it("rejects a bind the child declares no model for, and names the models it has", async () => {
    const source =
      `import { defineComponent, createSignal, defineModel } from "@inkline/core";\n` +
      `const Child = defineComponent(() => {\n` +
      `  const [open, setOpen] = defineModel("open");\n` +
      `  return <div>{open()}</div>;\n` +
      `});\n` +
      `export default defineComponent(() => {\n` +
      `  const [flag, setFlag] = createSignal(false);\n` +
      `  return <Child $bind:openn={flag} />;\n` +
      `});\n`;

    const diags = await compileSource(source);
    expect(codesOf(diags)).toEqual(["INK0073"]);
    expect(diags[0]!.title).toBe('Cannot two-way bind "$bind:openn" on <Child>');
    expect(diags[0]!.help).toContain('Did you mean "open"?');
    expect(diags[0]!.help).toContain('<Child> declares "open"');
  });

  it("skips a child from another module — its model set is not visible here", async () => {
    const source =
      `import { defineComponent, createSignal } from "@inkline/core";\n` +
      `import { Child } from "./other.ts";\n` +
      `export default defineComponent(() => {\n` +
      `  const [flag, setFlag] = createSignal(false);\n` +
      `  return <Child $bind:anything={flag} />;\n` +
      `});\n`;

    expect(await compileSource(source)).toEqual([]);
  });
});

/**
 * The other half of `@inkline/core`'s `jsx-runtime.probes.test.ts`. That file pins what the *type*
 * surface catches and marks rows 9 and 12 with `inkCode`, asserting the compiler covers them; it
 * cannot prove that itself, because importing the compiler from `@inkline/core` is a dependency
 * cycle. These two cases are that proof, and the sources are copied verbatim from the probe rows —
 * change one and change the other.
 */
describe("RFC §2.3 probe rows the type surface structurally cannot catch", () => {
  it('row 9 — <div aria-hiddenn="true" /> is caught by INK0072', async () => {
    const diags = await compileSource(component(`<div aria-hiddenn="true" />`));

    expect(codesOf(diags)).toEqual(["INK0072"]);
  });

  it("row 12 — <div $bind:totalNonsense={1} /> is caught by INK0073", async () => {
    // The probe binds a numeric literal, which is exactly why this must be an error rather than a
    // warning: unchecked, the lowering emits `onInput={(e) => 1(e.target.value)}`.
    const diags = await compileSource(component(`<div $bind:totalNonsense={1} />`));

    expect(codesOf(diags)).toEqual(["INK0073"]);
  });
});

describe("diagnostic messages are fully substituted (INK-84 regression)", () => {
  // The catalog's `help` for both codes ends in `{suggestion}`, which resolves to "" on the
  // no-suggestion path. `resolvePlaceholders` leaves an unmatched `{key}` verbatim, so an omitted
  // param would ship a literal "{suggestion}" to the author rather than failing loudly.
  it.each([
    ["INK0072", component(`<div aria-zzzzzzzzzz="1" />`)],
    ["INK0073", component(`<div $bind:totalNonsense={text} />`)],
  ])("%s leaves no {placeholder} token", async (code, source) => {
    const diags = await compileSource(source);

    expect(codesOf(diags)).toEqual([code]);
    expect(`${diags[0]!.title} ${diags[0]!.help ?? ""}`).not.toMatch(/\{\w+\}/);
  });
});
