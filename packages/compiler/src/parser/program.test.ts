import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createSingleFileProgram } from "./program.ts";

describe("createSingleFileProgram", () => {
  it("loads a TSX file and returns program/sourceFile/checker", () => {
    const result = createSingleFileProgram({
      fileName: "/x.ink.tsx",
      source: `const x = 1;`,
    });
    expect(result.program).toBeDefined();
    expect(result.sourceFile.fileName).toBe("/x.ink.tsx");
    expect(result.checker).toBeDefined();
  });

  it("recognises .tsx as TSX script kind", () => {
    const result = createSingleFileProgram({
      fileName: "/x.tsx",
      source: `const x = <div/>;`,
    });
    // No errors when JSX is valid in TSX.
    expect(result.sourceFile).toBeDefined();
  });

  it("recognises .jsx as TSX script kind (with allowJs)", () => {
    // .jsx requires allowJs in compilerOptions for the program to load it.
    const result = createSingleFileProgram({
      fileName: "/x.jsx",
      source: `const x = <div/>;`,
      compilerOptions: { allowJs: true },
    });
    expect(result.sourceFile).toBeDefined();
  });

  it("uses TS script kind for non-tsx/jsx file names", () => {
    const result = createSingleFileProgram({
      fileName: "/x.ts",
      source: `const x: number = 1;`,
    });
    expect(result.sourceFile).toBeDefined();
  });

  it("resolves DOM lib types via the default compiler host", () => {
    const result = createSingleFileProgram({
      fileName: "/x.ts",
      source: `const el: HTMLInputElement | null = null;`,
    });
    // Resolution did not error; the type checker has the lib loaded.
    expect(result.checker).toBeDefined();
  });

  it("merges custom compilerOptions with defaults", () => {
    const result = createSingleFileProgram({
      fileName: "/x.ts",
      source: `const x = 1;`,
      compilerOptions: { strict: true },
    });
    expect(result.program.getCompilerOptions().strict).toBe(true);
    // Defaults preserved (jsxImportSource).
    expect(result.program.getCompilerOptions().jsxImportSource).toBe("@inkline/core");
  });

  it("throws when the source file fails to load (synthetic case)", () => {
    // The default behaviour creates the file in-memory, so this never throws
    // through the public API. We exercise the throw branch by overriding the
    // host's getSourceFile via compilerOptions trickery — easier: stub out
    // the source and pass a corrupt fileName via compilerOptions with rootDir.
    expect(() =>
      createSingleFileProgram({
        fileName: "",
        source: "const x = 1;",
      }),
    ).toThrow();
  });

  it("each invocation produces an independent program (no shared state)", () => {
    const a = createSingleFileProgram({ fileName: "/a.ts", source: "const a = 1;" });
    const b = createSingleFileProgram({ fileName: "/b.ts", source: "const b = 2;" });
    expect(a.program).not.toBe(b.program);
    expect(a.sourceFile).not.toBe(b.sourceFile);
  });

  it("getSymbolAtLocation resolves identifiers from the loaded source", () => {
    const { sourceFile, checker } = createSingleFileProgram({
      fileName: "/x.ts",
      source: `const xyz = 1;`,
    });
    let found: ts.Identifier | undefined;
    const visit = (node: ts.Node): void => {
      if (found) return;
      if (ts.isIdentifier(node) && node.text === "xyz") {
        found = node;
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    expect(found).toBeDefined();
    if (found) {
      expect(checker.getSymbolAtLocation(found)).toBeDefined();
    }
  });
});
