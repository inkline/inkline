import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { collectPrimitiveImports, type ImportRecord } from "../primitives.ts";

import { findComponentDefinitions } from "./component.ts";
import { createSingleFileProgram } from "./program.ts";

function load(source: string): { sourceFile: ts.SourceFile; records: Map<string, ImportRecord> } {
  const { sourceFile } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
  const imports = sourceFile.statements.filter(ts.isImportDeclaration);
  const records = collectPrimitiveImports(imports);
  return { sourceFile, records };
}

describe("findComponentDefinitions", () => {
  it("finds a variable-bound defineComponent", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const Button = defineComponent({ name: "Button" }, (props) => null as any);
    `);
    const sites = findComponentDefinitions(sourceFile, records);
    expect(sites).toHaveLength(1);
    expect(sites[0]?.bindingName).toBe("Button");
    expect(sites[0]?.optionsArg).toBeDefined();
    expect(sites[0]?.setupArg).toBeDefined();
  });

  it("finds a default-exported defineComponent", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      export default defineComponent((props) => null as any);
    `);
    const sites = findComponentDefinitions(sourceFile, records);
    expect(sites).toHaveLength(1);
    expect(sites[0]?.bindingName).toBeNull();
    expect(sites[0]?.optionsArg).toBeUndefined();
    expect(sites[0]?.setupArg).toBeDefined();
  });

  it("finds multiple definitions in one file", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const A = defineComponent((props) => null as any);
      const B = defineComponent({ name: "B" }, () => null as any);
    `);
    const sites = findComponentDefinitions(sourceFile, records);
    expect(
      sites.map((s) => s.bindingName).sort((a, b) => (a ?? "").localeCompare(b ?? "")),
    ).toEqual(["A", "B"]);
  });

  it("ignores non-defineComponent calls bound to a variable", () => {
    const { sourceFile, records } = load(`
      const helper = () => 1;
      const x = helper();
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("recognises aliased defineComponent imports", () => {
    const { sourceFile, records } = load(`
      import { defineComponent as dc } from "@inkline/core";
      const A = dc((props) => null as any);
    `);
    const sites = findComponentDefinitions(sourceFile, records);
    expect(sites).toHaveLength(1);
  });

  it("rejects defineComponent calls with no arguments", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const A = defineComponent();
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("rejects when the (single) arg is not a function", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const A = defineComponent("not a fn" as any);
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("rejects when the second arg is not a function", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const A = defineComponent({}, "not a fn" as any);
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("accepts function-expression setup form", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const A = defineComponent(function (props) { return null as any; });
    `);
    expect(findComponentDefinitions(sourceFile, records)).toHaveLength(1);
  });

  it("ignores `export default` of a non-defineComponent expression", () => {
    const { sourceFile, records } = load(`
      const x = 1;
      export default x;
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("ignores variable declarations without an initializer", () => {
    const { sourceFile, records } = load(`let x;`);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("ignores destructured variable declarations", () => {
    const { sourceFile, records } = load(`
      import { defineComponent } from "@inkline/core";
      const [A] = [defineComponent((props) => null as any)];
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });

  it("ignores call sites whose callee is a property access (e.g. core.defineComponent)", () => {
    // Property-access callees aren't supported because `collectPrimitiveImports`
    // skips namespace imports. Even if a name happens to match, the records
    // map won't contain it, so the call is ignored.
    const { sourceFile, records } = load(`
      import * as core from "@inkline/core";
      const A = core.defineComponent((props) => null as any);
    `);
    expect(findComponentDefinitions(sourceFile, records)).toEqual([]);
  });
});
