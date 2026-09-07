import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import type { PrimitiveName } from "../../../ir/render/nodes.ts";
import { bindPrimitives } from "./bind-primitives.ts";
import { MACROS, bindMacros, checkMacroGrammar, macroForCall } from "./macros.ts";
import type { DiagnosticCode } from "../../../core/diagnostics/codes.ts";
import { createDiagnosticCollector } from "../../../core/diagnostics/collector.ts";
import { resolveOptions } from "../../../core/options.ts";
import { SymbolTable } from "../../../ir/reactivity.ts";
import { builtinRegistry } from "../../../codegen/registry.ts";
import type { PassContext } from "../../types.ts";

function makeCtx(): PassContext {
  return {
    diagnostics: createDiagnosticCollector(),
    options: resolveOptions({ targets: ["react"] }),
    symbols: new SymbolTable(),
    registry: builtinRegistry,
  };
}

function bind(code: string): ReturnType<typeof bindMacros> {
  const sf = ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return bindMacros(bindPrimitives(sf, makeCtx()));
}

function initializerOf(code: string): ts.Expression {
  const sf = ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const stmt = sf.statements.at(-1)!;
  if (!ts.isVariableStatement(stmt)) throw new Error("last statement is not a declaration");
  return stmt.declarationList.declarations[0]!.initializer!;
}

function statementOf(code: string): ts.Expression {
  const sf = ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const stmt = sf.statements.at(-1)!;
  if (!ts.isExpressionStatement(stmt)) throw new Error("last statement is not an expression");
  return stmt.expression;
}

describe("the macro registry", () => {
  // The grammar rules of design UXF-241 §4 are what `checkMacroGrammar` reads to decide which call
  // INK0048, INK0049 and INK0075 apply to. Locking the table here means a rule cannot drift
  // silently, and in particular that `defineModel` keeps reporting its own R2 under INK0043 and
  // that `defineSlot` stays the one macro legal without a binding.
  it("carries R1–R4 for every macro", () => {
    expect(
      Object.fromEntries(MACROS.map((m) => [m.name, { position: m.position, ...m.rules }])),
    ).toEqual({
      defineModel: {
        position: "declaration",
        topLevelOnly: true,
        bindingRequired: true,
        staticArguments: "macro",
        declares: "models",
        erased: true,
      },
      defineEmits: {
        position: "declaration",
        topLevelOnly: true,
        bindingRequired: true,
        staticArguments: "registry",
        declares: "events",
        erased: true,
      },
      defineSlot: {
        position: "declaration",
        topLevelOnly: true,
        bindingRequired: false,
        staticArguments: "registry",
        declares: "slots",
        erased: true,
      },
      defineProps: {
        position: "declaration",
        topLevelOnly: true,
        bindingRequired: true,
        staticArguments: "registry",
        declares: "props",
        erased: true,
      },
      hasSlot: {
        position: "expression",
        topLevelOnly: false,
        bindingRequired: false,
        staticArguments: "registry",
        declares: undefined,
        erased: true,
      },
    });
  });

  it("gives every declaration-position macro a parse and leaves hasSlot without one", () => {
    for (const macro of MACROS) {
      expect([macro.name, typeof macro.parse]).toEqual([
        macro.name,
        macro.position === "declaration" ? "function" : "undefined",
      ]);
    }
  });
});

describe("bindMacros", () => {
  it("keys each macro by the local name it was imported under", () => {
    const macros = bind(`import { defineModel, defineSlot } from "@inkline/core";`);
    expect(macros.get("defineModel")?.name).toBe<PrimitiveName>("defineModel");
    expect(macros.get("defineSlot")?.name).toBe<PrimitiveName>("defineSlot");
    expect(macros.has("defineEmits")).toBe(false);
  });

  it("follows the alias, not the exported name", () => {
    const macros = bind(`import { defineModel as model } from "@inkline/core";`);
    expect(macros.get("model")?.name).toBe<PrimitiveName>("defineModel");
    expect(macros.has("defineModel")).toBe(false);
  });

  it("binds nothing for an identically named import from another module", () => {
    expect(bind(`import { defineModel } from "elsewhere";`).size).toBe(0);
  });
});

describe("macroForCall", () => {
  const macros = bind(`import { defineModel, defineSlot, hasSlot } from "@inkline/core";`);

  it("matches a declaration-position macro call", () => {
    const found = macroForCall(initializerOf(`const [v, setV] = defineModel("v");`), macros);
    expect(found?.macro.name).toBe<PrimitiveName>("defineModel");
  });

  // The same call reached from a bare statement, which is how `defineSlot();` declares its slot
  // without a binding.
  it("matches the same call written as a bare statement", () => {
    expect(macroForCall(statementOf(`defineSlot();`), macros)?.macro.name).toBe<PrimitiveName>(
      "defineSlot",
    );
  });

  // `hasSlot` is a predicate: `const shown = hasSlot("icon")` declares nothing and must stay an
  // ordinary setup statement, so the declaration dispatch has to skip it.
  it("skips an expression-position macro", () => {
    expect(macroForCall(initializerOf(`const shown = hasSlot("icon");`), macros)).toBe(undefined);
  });

  it("skips a call to an unbound name and a non-call initializer", () => {
    expect(macroForCall(initializerOf(`const x = defineEmits(["a"]);`), macros)).toBe(undefined);
    expect(macroForCall(initializerOf(`const y = 1;`), macros)).toBe(undefined);
  });
});

describe("checkMacroGrammar", () => {
  /** Reports the codes raised for a setup body, macros bound from the standard import. */
  function codesFor(body: string): DiagnosticCode[] {
    const code = `import { defineProps, defineEmits, defineModel, defineSlot, hasSlot } from "@inkline/core";
      const X = defineComponent(() => {${body}});`;
    const sf = ts.createSourceFile("t.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const ctx = makeCtx();
    const macros = bindMacros(bindPrimitives(sf, ctx));
    const varStmt = sf.statements.find(ts.isVariableStatement)!;
    const init = varStmt.declarationList.declarations[0]!.initializer as ts.CallExpression;
    checkMacroGrammar(init.arguments[0] as ts.ArrowFunction, macros, sf, ctx);
    return ctx.diagnostics.freeze().map((d) => d.code);
  }

  // R1b. The binding is the only way to reach what these macros declare, and the call is erased, so
  // an unbound one reads as a declaration while being none.
  it.each(["defineProps<{ a: string }>()", 'defineEmits(["a"])', 'defineModel("v")'])(
    "refuses a bare %s (INK0075)",
    (call) => {
      expect(codesFor(`${call};`)).toEqual(["INK0075"]);
    },
  );

  // `defineSlot` declares its slot from the call alone, so the bare form is the point of UXF-254.
  it("accepts a bare defineSlot", () => {
    expect(codesFor(`defineSlot(); defineSlot("footer");`)).toEqual([]);
  });

  it("accepts every macro when the result is bound", () => {
    expect(
      codesFor(`const props = defineProps<{ a: string }>();
        const emit = defineEmits(["a"]);
        const [v, setV] = defineModel("v");
        const footer = defineSlot("footer");`),
    ).toEqual([]);
  });

  // R1 still comes first: nesting is INK0049 whatever the binding rule says.
  it("reports the nesting rule rather than the binding rule", () => {
    expect(codesFor(`if (x) { defineProps<{ a: string }>(); }`)).toEqual(["INK0049"]);
  });
});
