import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { findSites } from "./sites.ts";
import { bindPrimitives } from "./bind-primitives.ts";
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

function parse(code: string): ts.SourceFile {
  return ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

describe("findSites", () => {
  it("finds const X = defineComponent(() => ...)", () => {
    const sf = parse(`
      import { defineComponent } from "@inkline/core";
      const Counter = defineComponent(() => { return <div/>; });
    `);
    const ctx = makeCtx();
    const bindings = bindPrimitives(sf, ctx);
    const sites = findSites(sf, bindings, ctx);
    expect(sites).toHaveLength(1);
    expect(sites[0]!.name).toBe("Counter");
  });

  it("finds export default defineComponent(() => ...)", () => {
    const sf = parse(`
      import { defineComponent } from "@inkline/core";
      export default defineComponent(() => { return <div/>; });
    `);
    const ctx = makeCtx();
    const bindings = bindPrimitives(sf, ctx);
    const sites = findSites(sf, bindings, ctx);
    expect(sites).toHaveLength(1);
  });

  it("finds defineComponent with options object", () => {
    const sf = parse(`
      import { defineComponent } from "@inkline/core";
      const Btn = defineComponent({ name: "Button" }, () => { return <div/>; });
    `);
    const ctx = makeCtx();
    const bindings = bindPrimitives(sf, ctx);
    const sites = findSites(sf, bindings, ctx);
    expect(sites).toHaveLength(1);
    expect(sites[0]!.options).toBeDefined();
  });

  it("pushes INK0040 for defineComponent with no setup", () => {
    const sf = parse(`
      import { defineComponent } from "@inkline/core";
      const Bad = defineComponent("not a function");
    `);
    const ctx = makeCtx();
    const bindings = bindPrimitives(sf, ctx);
    findSites(sf, bindings, ctx);
    const diags = ctx.diagnostics.freeze();
    expect(diags).toHaveLength(1);
    expect(diags[0]!.code).toBe("INK0040");
  });

  it("returns empty when no defineComponent import", () => {
    const sf = parse(`const x = 1;`);
    const ctx = makeCtx();
    const bindings = bindPrimitives(sf, ctx);
    const sites = findSites(sf, bindings, ctx);
    expect(sites).toHaveLength(0);
  });
});
