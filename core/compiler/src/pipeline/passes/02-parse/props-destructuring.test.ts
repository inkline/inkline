// Parse-level behaviour of `const { … } = props` in the setup body: the statement is consumed, its
// bindings become `IRComponent.propAliases`, its defaults are folded into the props they name, and
// the shapes that name no single declared prop are refused. Every target reads the same IR, so
// pinning it here is what makes "the same on all seven targets" a property of one implementation.

import { describe, it, expect } from "vitest";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";
import { programPass } from "../01-program.ts";
import { parsePass } from "./index.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

async function parseComponent(body: string, propsType = "{ label: string; size?: string }") {
  const source = `
    import { defineComponent, defineProps } from "@inkline/core";
    export default defineComponent(() => {
      const props = defineProps<${propsType}>();
      ${body}
    });
  `;
  const ctx = makeCtx();
  const artifact = await programPass.run({ fileName: "Destructured.ink.tsx", source }, ctx);
  const parsed = await parsePass.run(artifact, ctx);
  return { component: parsed.components[0]!, diagnostics: ctx.diagnostics.freeze() };
}

describe("a props destructuring in the setup body", () => {
  it("records a plain binding as an alias of the prop it names", async () => {
    const { component, diagnostics } = await parseComponent(`
      const { label } = props;
      return <h1>{label}</h1>;
    `);

    expect(diagnostics).toHaveLength(0);
    expect([...component.propAliases!]).toEqual([["label", "label"]]);
  });

  it("records a renamed binding under the local name, pointing at the prop", async () => {
    const { component, diagnostics } = await parseComponent(`
      const { label: text } = props;
      return <h1>{text}</h1>;
    `);

    expect(diagnostics).toHaveLength(0);
    expect([...component.propAliases!]).toEqual([["text", "label"]]);
  });

  // The defect this file exists for: the renamed + defaulted shape compiled clean and emitted a
  // read of `text`, an identifier no target declared.
  it("folds a default written in the pattern into the prop, and makes the prop optional", async () => {
    const { component, diagnostics } = await parseComponent(`
      const { label: text = "x" } = props;
      return <h1>{text}</h1>;
    `);

    expect(diagnostics).toHaveLength(0);
    expect([...component.propAliases!]).toEqual([["text", "label"]]);

    const label = component.props.find((p) => p.name === "label")!;
    expect(label.defaultValue?.raw).toBe('"x"');
    expect(label.required).toBe(false);
  });

  // JS semantics: a destructuring default only runs when the property is `undefined`, which a prop
  // carrying its own default never is. The declared default therefore wins.
  it("keeps a default the prop already declares", async () => {
    const source = `
      import { defineComponent } from "@inkline/core";
      export default defineComponent({ props: { color: "blue" } }, (props) => {
        const { color = "red" } = props;
        return <h1>{color}</h1>;
      });
    `;
    const ctx = makeCtx();
    const artifact = await programPass.run({ fileName: "Declared.ink.tsx", source }, ctx);
    const parsed = await parsePass.run(artifact, ctx);

    const color = parsed.components[0]!.props.find((p) => p.name === "color")!;
    expect(color.defaultValue?.raw).toBe('"blue"');
  });

  it("consumes the statement so no target emits it as a setup local", async () => {
    const { component } = await parseComponent(`
      const { label } = props;
      return <h1>{label}</h1>;
    `);

    expect(component.setup).toHaveLength(0);
  });

  it("leaves propAliases undefined when the setup body never destructures props", async () => {
    const { component } = await parseComponent(`return <h1>{props.label}</h1>;`);
    expect(component.propAliases).toBeUndefined();
  });

  // Destructuring some other object must keep its own meaning — the check keys on the initializer
  // being the `props` binding, which R5/INK0074 guarantees is the only name it can carry.
  it("ignores a destructuring of anything other than `props`", async () => {
    const { component, diagnostics } = await parseComponent(`
      const other = { label: "y" };
      const { label } = other;
      return <h1>{label}</h1>;
    `);

    expect(diagnostics.filter((d) => d.severity === "error")).toHaveLength(0);
    expect(component.propAliases).toBeUndefined();
  });
});

describe("a props destructuring binding that names no single static prop", () => {
  const SHAPES = [
    [
      "a rest element",
      `const { label, ...rest } = props; return <h1>{label}{JSON.stringify(rest)}</h1>;`,
    ],
    [
      "a nested pattern",
      `const { label, nested: { deep } } = props; return <h1>{label}{deep}</h1>;`,
    ],
    [
      "a computed key",
      `const k = "label"; const { label, [k]: computed } = props; return <h1>{label}{computed}</h1>;`,
    ],
  ] as const;

  for (const [shape, body] of SHAPES) {
    it(`refuses ${shape} as INK0122 and keeps the rest of the pattern`, async () => {
      const { component, diagnostics } = await parseComponent(
        body,
        "{ label: string; nested: { deep: string } }",
      );

      const reported = diagnostics.filter((d) => d.code === "INK0122");
      expect(reported).toHaveLength(1);
      expect(reported[0]!.severity).toBe("error");
      expect([...component.propAliases!]).toEqual([["label", "label"]]);
    });
  }
});

describe("a props destructuring binding that names an undeclared prop", () => {
  it("refuses it as INK0123 rather than emitting a rewrite rule for a name no target declares", async () => {
    const { component, diagnostics } = await parseComponent(`
      const { label, missing } = props;
      return <h1>{label}{missing}</h1>;
    `);

    const reported = diagnostics.filter((d) => d.code === "INK0123");
    expect(reported).toHaveLength(1);
    expect(reported[0]!.severity).toBe("error");
    expect(reported[0]!.title).toContain("missing");
    expect([...component.propAliases!]).toEqual([["label", "label"]]);
  });
});
