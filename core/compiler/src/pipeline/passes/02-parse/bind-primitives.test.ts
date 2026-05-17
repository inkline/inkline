import { describe, it, expect } from "vitest";
import * as ts from "typescript";
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

describe("bindPrimitives", () => {
  it("records named imports from @inkline/core", () => {
    const sf = parse(`import { createSignal, createMemo } from "@inkline/core";`);
    const ctx = makeCtx();
    const table = bindPrimitives(sf, ctx);
    expect(table.get("createSignal")).toBe("createSignal");
    expect(table.get("createMemo")).toBe("createMemo");
  });

  it("handles aliased imports", () => {
    const sf = parse(`import { createSignal as sig } from "@inkline/core";`);
    const ctx = makeCtx();
    const table = bindPrimitives(sf, ctx);
    expect(table.get("sig")).toBe("createSignal");
    expect(table.has("createSignal")).toBe(false);
  });

  it("pushes INK0001 for namespace import", () => {
    const sf = parse(`import * as core from "@inkline/core";`);
    const ctx = makeCtx();
    bindPrimitives(sf, ctx);
    const diags = ctx.diagnostics.freeze();
    expect(diags).toHaveLength(1);
    expect(diags[0]!.code).toBe("INK0001");
  });

  it("ignores imports from other modules", () => {
    const sf = parse(`import { useState } from "react";`);
    const ctx = makeCtx();
    const table = bindPrimitives(sf, ctx);
    expect(table.size).toBe(0);
  });

  it("ignores unknown primitives", () => {
    const sf = parse(`import { unknownThing } from "@inkline/core";`);
    const ctx = makeCtx();
    const table = bindPrimitives(sf, ctx);
    expect(table.size).toBe(0);
  });
});
