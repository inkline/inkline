import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import type { PrimitiveName } from "../../../ir/render/nodes.ts";
import { bindPrimitives } from "./bind-primitives.ts";
import { MACROS, bindMacros, macroForInitializer } from "./macros.ts";
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

describe("the macro registry", () => {
  // The grammar rules of design UXF-241 §4 are metadata in Phase 1 — nothing enforces them yet, and
  // Phase 2 reads exactly this table to decide what INK0047–INK0049 check. Locking it here means a
  // rule cannot drift silently between the two phases.
  it("carries R1–R4 for every macro", () => {
    expect(
      Object.fromEntries(MACROS.map((m) => [m.name, { position: m.position, ...m.rules }])),
    ).toEqual({
      defineModel: {
        position: "declaration",
        topLevelOnly: true,
        staticArguments: true,
        declares: "models",
        erased: true,
      },
      defineEmits: {
        position: "declaration",
        topLevelOnly: true,
        staticArguments: true,
        declares: "events",
        erased: true,
      },
      defineSlot: {
        position: "declaration",
        topLevelOnly: true,
        staticArguments: true,
        declares: "slots",
        erased: true,
      },
      hasSlot: {
        position: "expression",
        topLevelOnly: false,
        staticArguments: true,
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

describe("macroForInitializer", () => {
  const macros = bind(`import { defineModel, hasSlot } from "@inkline/core";`);

  it("matches a declaration-position macro call", () => {
    const found = macroForInitializer(initializerOf(`const [v, setV] = defineModel("v");`), macros);
    expect(found?.macro.name).toBe<PrimitiveName>("defineModel");
  });

  // `hasSlot` is a predicate: `const shown = hasSlot("icon")` declares nothing and must stay an
  // ordinary setup statement, so the declaration dispatch has to skip it.
  it("skips an expression-position macro", () => {
    expect(macroForInitializer(initializerOf(`const shown = hasSlot("icon");`), macros)).toBe(
      undefined,
    );
  });

  it("skips a call to an unbound name and a non-call initializer", () => {
    expect(macroForInitializer(initializerOf(`const x = defineEmits(["a"]);`), macros)).toBe(
      undefined,
    );
    expect(macroForInitializer(initializerOf(`const y = 1;`), macros)).toBe(undefined);
  });
});
