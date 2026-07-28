import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { parseOptions, parsePropsFromParameterType } from "./options.ts";
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

function createSF(code: string): ts.SourceFile {
  return ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function getObjectLiteral(code: string): { obj: ts.ObjectLiteralExpression; sf: ts.SourceFile } {
  const sf = createSF(`const x = ${code};`);
  const stmt = sf.statements[0] as ts.VariableStatement;
  const init = stmt.declarationList.declarations[0]!.initializer;
  return { obj: init as ts.ObjectLiteralExpression, sf };
}

describe("parseOptions", () => {
  describe("props parsing", () => {
    it("parses shorthand constructor-ref props as required", () => {
      const { obj, sf } = getObjectLiteral(`{ props: { title: String, count: Number } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props!).toHaveLength(2);
      expect(result.props![0]!.name).toBe("title");
      expect(result.props![0]!.required).toBe(true);
      expect(result.props![0]!.symbolId).toBeDefined();
      expect(result.props![1]!.name).toBe("count");
      expect(result.props![1]!.required).toBe(true);
    });

    it("parses full prop shape with type, required, and default", () => {
      const { obj, sf } = getObjectLiteral(
        `{ props: { count: { type: Number, required: true, default: 0 } } }`,
      );
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props!).toHaveLength(1);
      const prop = result.props![0]!;
      expect(prop.name).toBe("count");
      expect(prop.required).toBe(true);
      expect(prop.defaultValue).toBeDefined();
      expect(prop.typeText).toBe("number");
    });

    // The accepted set is the compiler's `CONSTRUCTOR_TYPES` table, which `PropConstructor` in
    // `@inkline/core` mirrors. Pinned here so the two cannot drift apart unnoticed.
    it.each([
      ["String", "string"],
      ["Number", "number"],
      ["Boolean", "boolean"],
      ["Object", "Record<string, any>"],
      ["Array", "any[]"],
      ["Function", "(...args: any[]) => any"],
      ["Symbol", "symbol"],
      ["Date", "Date"],
    ])("resolves `type: %s` to `%s` with no default", (ctor, expected) => {
      const { obj, sf } = getObjectLiteral(`{ props: { value: { type: ${ctor} } } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props![0]!.typeText).toBe(expected);
      expect(ctx.diagnostics.freeze()).toHaveLength(0);
    });

    it("reports INK0042 for an unrecognised `type:` instead of dropping it", () => {
      const { obj, sf } = getObjectLiteral(`{ props: { entries: { type: Map } } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props![0]!.typeText).toBeUndefined();

      const diags = ctx.diagnostics.freeze();
      expect(diags).toHaveLength(1);
      expect(diags[0]!.code).toBe("INK0042");
      expect(diags[0]!.severity).toBe("error");
      expect(diags[0]!.title).toBe("Prop 'entries' declares an unsupported type 'Map'");
      // The help lists the accepted set from the table itself, not from a hand-written copy.
      expect(diags[0]!.help).toContain("String, Number, Boolean, Object, Array, Function, Symbol");
    });

    it("prefers `type:` over the default's inferred type, whatever order the keys appear in", () => {
      // Deliberately contradictory: `type: String` must win over the numeric default's `number`.
      const { obj, sf } = getObjectLiteral(
        `{ props: { a: { default: 0, type: String }, b: { default: 0 } } }`,
      );
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props![0]!.typeText).toBe("string");
      expect(result.props![1]!.typeText).toBe("number");
    });

    // Every object literal used to be read as a full shape, so `cfg: { a: 1 }` lost its type AND
    // its default while `tags: [1]` in the same position kept both.
    it("reads an object literal as a default value unless every key belongs to the shape", () => {
      const { obj, sf } = getObjectLiteral(
        `{ props: { cfg: { a: 1 }, empty: {}, mixed: { a: 1, type: Number }, shape: { type: Number } } }`,
      );
      const ctx = makeCtx();
      const props = parseOptions(obj, "test#X", sf, ctx).props!;

      for (const p of props.slice(0, 3)) {
        expect(p.typeText).toBe("Record<string, any>");
        expect(p.required).toBe(false);
        expect(p.defaultValue, `${p.name} should keep its object default`).toBeDefined();
      }
      // Only the all-shape-keys object is read as a declaration rather than a value.
      expect(props[3]!.typeText).toBe("number");
      expect(props[3]!.defaultValue).toBeUndefined();
      expect(ctx.diagnostics.freeze()).toHaveLength(0);
    });

    it("parses default-value prop as not required", () => {
      const { obj, sf } = getObjectLiteral(`{ props: { label: "hello" } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props!).toHaveLength(1);
      const prop = result.props![0]!;
      expect(prop.name).toBe("label");
      expect(prop.required).toBe(false);
      expect(prop.defaultValue).toBeDefined();
    });

    it("returns empty array when props is not an object literal", () => {
      const { obj, sf } = getObjectLiteral(`{ props: someVar }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props!).toHaveLength(0);
    });

    it("mints unique SymbolIds for each prop", () => {
      const { obj, sf } = getObjectLiteral(`{ props: { a: String, b: Number } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.props![0]!.symbolId).not.toBe(result.props![1]!.symbolId);
    });
  });

  describe("slots parsing", () => {
    it("parses slot declarations", () => {
      const { obj, sf } = getObjectLiteral(`{ slots: { default: {}, header: { scoped: true } } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.slots).toHaveLength(2);
      expect(result.slots[0]!.name).toBe("default");
      expect(result.slots[0]!.isScoped).toBe(false);
      expect(result.slots[1]!.name).toBe("header");
      expect(result.slots[1]!.isScoped).toBe(true);
    });

    it("parses required slot", () => {
      const { obj, sf } = getObjectLiteral(`{ slots: { content: { required: true } } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.slots[0]!.required).toBe(true);
    });

    it("returns empty array when slots is not an object literal", () => {
      const { obj, sf } = getObjectLiteral(`{ slots: someVar }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.slots).toHaveLength(0);
    });
  });

  describe("events parsing", () => {
    it("parses event declarations", () => {
      const { obj, sf } = getObjectLiteral(`{ events: { click: {}, change: {} } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.events).toHaveLength(2);
      expect(result.events[0]!.name).toBe("click");
      expect(result.events[1]!.name).toBe("change");
    });

    it("returns empty array when events is not an object literal", () => {
      const { obj, sf } = getObjectLiteral(`{ events: someVar }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.events).toHaveLength(0);
    });
  });

  describe("meta parsing", () => {
    it("parses meta.headless: true", () => {
      const { obj, sf } = getObjectLiteral(`{ meta: { headless: true } }`);
      const ctx = makeCtx();
      const result = parseOptions(obj, "test#X", sf, ctx);
      expect(result.headless).toBe(true);
    });

    it("treats meta.headless: false (or absent) as not headless", () => {
      const falseForm = parseOptions(
        getObjectLiteral(`{ meta: { headless: false } }`).obj,
        "test#X",
        getObjectLiteral(`{ meta: { headless: false } }`).sf,
        makeCtx(),
      );
      expect(falseForm.headless).toBe(false);
      const absentForm = parseOptions(
        getObjectLiteral(`{ meta: {} }`).obj,
        "test#X",
        getObjectLiteral(`{ meta: {} }`).sf,
        makeCtx(),
      );
      expect(absentForm.headless).toBe(false);
    });

    it("ignores a non-object meta value", () => {
      const { obj, sf } = getObjectLiteral(`{ meta: someVar }`);
      const result = parseOptions(obj, "test#X", sf, makeCtx());
      expect(result.headless).toBe(false);
    });

    it("reads headless among other meta keys and ignores non-headless keys", () => {
      const { obj, sf } = getObjectLiteral(`{ meta: { variant: "x", headless: true } }`);
      const result = parseOptions(obj, "test#X", sf, makeCtx());
      expect(result.headless).toBe(true);
    });

    it("skips a shorthand meta property (not a static name/value assignment)", () => {
      const { obj, sf } = getObjectLiteral(`{ meta: { headless } }`);
      const result = parseOptions(obj, "test#X", sf, makeCtx());
      expect(result.headless).toBe(false);
    });
  });

  it("ignores unknown option keys", () => {
    const { obj, sf } = getObjectLiteral(`{ name: "Comp", props: { x: String } }`);
    const ctx = makeCtx();
    const result = parseOptions(obj, "test#X", sf, ctx);
    expect(result.props!).toHaveLength(1);
  });

  it("handles empty options object", () => {
    const { obj, sf } = getObjectLiteral(`{}`);
    const ctx = makeCtx();
    const result = parseOptions(obj, "test#X", sf, ctx);
    expect(result.props).toBeUndefined();
    expect(result.slots).toHaveLength(0);
    expect(result.events).toHaveLength(0);
    expect(result.headless).toBe(false);
  });
});

describe("parsePropsFromParameterType", () => {
  function createProgramFromCode(code: string): {
    fn: ts.ArrowFunction;
    sf: ts.SourceFile;
    checker: ts.TypeChecker;
  } {
    const fileName = "test.tsx";
    const sf = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const host: ts.CompilerHost = {
      getSourceFile: (name) => (name === fileName ? sf : undefined),
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => {},
      getCurrentDirectory: () => "/",
      getCanonicalFileName: (f) => f,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      fileExists: (name) => name === fileName,
      readFile: (name) => (name === fileName ? code : undefined),
    };
    const program = ts.createProgram([fileName], { strict: false, noEmit: true }, host);
    const checker = program.getTypeChecker();
    const stmts = sf.statements;
    const last = stmts[stmts.length - 1] as ts.VariableStatement;
    const fn = last.declarationList.declarations[0]!.initializer as ts.ArrowFunction;
    return { fn, sf, checker };
  }

  function getSetupFn(paramCode: string) {
    return createProgramFromCode(`const x = (${paramCode}) => {};`);
  }

  it("extracts props from type literal annotation", () => {
    const { fn, sf, checker } = getSetupFn("props: { label: string; count: number }");
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(2);
    expect(result[0]!.name).toBe("label");
    expect(result[0]!.required).toBe(true);
    expect(result[0]!.typeNode).toBeDefined();
    expect(result[1]!.name).toBe("count");
    expect(result[1]!.required).toBe(true);
  });

  it("marks optional props as not required", () => {
    const { fn, sf, checker } = getSetupFn("props: { disabled?: boolean }");
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("disabled");
    expect(result[0]!.required).toBe(false);
  });

  it("returns empty array when no parameter", () => {
    const { fn, sf, checker } = getSetupFn("");
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(0);
  });

  it("returns empty array when parameter has no type annotation", () => {
    const { fn, sf, checker } = getSetupFn("props");
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(0);
  });

  it("returns empty array when type reference is unresolvable", () => {
    const { fn, sf, checker } = getSetupFn("props: SomeType");
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(0);
  });

  it("resolves props from type reference defined in same file", () => {
    const { fn, sf, checker } = createProgramFromCode(
      `interface MyProps { label?: string; count: number } const x = (props: MyProps) => {};`,
    );
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(2);
    expect(result[0]!.name).toBe("label");
    expect(result[0]!.required).toBe(false);
    expect(result[1]!.name).toBe("count");
    expect(result[1]!.required).toBe(true);
  });

  it("resolves props from extended interface", () => {
    const { fn, sf, checker } = createProgramFromCode(
      `interface Base { a: string } interface Ext extends Base { b?: number } const x = (props: Ext) => {};`,
    );
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result).toHaveLength(2);
    const names = result.map((p) => p.name);
    expect(names).toContain("a");
    expect(names).toContain("b");
    const bProp = result.find((p) => p.name === "b")!;
    expect(bProp.required).toBe(false);
  });

  it("mints SymbolIds for each prop", () => {
    const { fn, sf, checker } = getSetupFn("props: { a: string; b: number }");
    const ctx = makeCtx();
    const result = parsePropsFromParameterType(fn, "test#X", sf, ctx, checker);
    expect(result[0]!.symbolId).toBeDefined();
    expect(result[1]!.symbolId).toBeDefined();
    expect(result[0]!.symbolId).not.toBe(result[1]!.symbolId);
  });
});
