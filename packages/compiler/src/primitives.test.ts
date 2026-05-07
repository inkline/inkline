import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import type { PrimitiveName } from "./ir/nodes.ts";
import {
  collectPrimitiveImports,
  INKLINE_CORE_MODULE,
  isPrimitiveName,
  PRIMITIVE_SET,
  REACTIVE_PRODUCING_PRIMITIVES,
  TRACKING_SCOPE_PRIMITIVES,
  UNTRACK_SCOPE_PRIMITIVES,
} from "./primitives.ts";

/** Parse a code snippet and return its top-level import declarations. */
function importsOf(source: string): readonly ts.ImportDeclaration[] {
  const sf = ts.createSourceFile("test.ts", source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
  return sf.statements.filter(ts.isImportDeclaration);
}

describe("INKLINE_CORE_MODULE", () => {
  it("equals @inkline/core", () => {
    expect(INKLINE_CORE_MODULE).toBe("@inkline/core");
  });
});

describe("PRIMITIVE_SET", () => {
  it("contains exactly the documented primitives", () => {
    const expected: PrimitiveName[] = [
      "createSignal",
      "createMemo",
      "createEffect",
      "createRef",
      "defineComponent",
      "defineSlot",
      "untrack",
      "batch",
      "onMount",
      "onCleanup",
      "$bind",
      "$on",
      "$if",
      "$for",
    ];
    expect(PRIMITIVE_SET.size).toBe(expected.length);
    for (const name of expected) {
      expect(PRIMITIVE_SET.has(name)).toBe(true);
    }
  });
});

describe("isPrimitiveName", () => {
  it("returns true for every member of PRIMITIVE_SET", () => {
    for (const name of PRIMITIVE_SET) {
      expect(isPrimitiveName(name)).toBe(true);
    }
  });

  it("returns false for non-primitive names", () => {
    expect(isPrimitiveName("useState")).toBe(false);
    expect(isPrimitiveName("ref")).toBe(false);
    expect(isPrimitiveName("")).toBe(false);
  });
});

describe("REACTIVE_PRODUCING_PRIMITIVES", () => {
  it("is exactly { createSignal, createMemo }", () => {
    expect([...REACTIVE_PRODUCING_PRIMITIVES].sort()).toEqual(
      ["createMemo", "createSignal"].sort(),
    );
  });
});

describe("TRACKING_SCOPE_PRIMITIVES", () => {
  it("is exactly { createEffect, createMemo, onMount, onCleanup }", () => {
    expect([...TRACKING_SCOPE_PRIMITIVES].sort()).toEqual(
      ["createEffect", "createMemo", "onCleanup", "onMount"].sort(),
    );
  });
});

describe("UNTRACK_SCOPE_PRIMITIVES", () => {
  it("is exactly { untrack, batch }", () => {
    expect([...UNTRACK_SCOPE_PRIMITIVES].sort()).toEqual(["batch", "untrack"].sort());
  });
});

describe("collectPrimitiveImports", () => {
  it("returns an empty map when given no imports", () => {
    expect(collectPrimitiveImports([]).size).toBe(0);
  });

  it("collects a single named primitive import", () => {
    const records = collectPrimitiveImports(
      importsOf(`import { createSignal } from "@inkline/core";`),
    );
    expect(records.size).toBe(1);
    const r = records.get("createSignal");
    expect(r?.primitive).toBe("createSignal");
    expect(r?.localName).toBe("createSignal");
    expect(r?.importNode.kind).toBe(ts.SyntaxKind.ImportSpecifier);
  });

  it("preserves the local name for aliased primitives", () => {
    const records = collectPrimitiveImports(
      importsOf(`import { createSignal as cs, createEffect as fx } from "@inkline/core";`),
    );
    expect(records.size).toBe(2);
    const cs = records.get("cs");
    expect(cs).toBeDefined();
    expect(cs?.primitive).toBe("createSignal");
    expect(cs?.localName).toBe("cs");
    expect(records.get("createSignal")).toBeUndefined();
    const fx = records.get("fx");
    expect(fx?.primitive).toBe("createEffect");
    expect(fx?.localName).toBe("fx");
  });

  it("collects multiple specifiers from one declaration", () => {
    const records = collectPrimitiveImports(
      importsOf(
        `import { createSignal, createMemo, createEffect, defineComponent } from "@inkline/core";`,
      ),
    );
    expect(records.size).toBe(4);
    expect(records.get("createSignal")?.primitive).toBe("createSignal");
    expect(records.get("createMemo")?.primitive).toBe("createMemo");
    expect(records.get("createEffect")?.primitive).toBe("createEffect");
    expect(records.get("defineComponent")?.primitive).toBe("defineComponent");
  });

  it("skips non-primitive named imports", () => {
    const records = collectPrimitiveImports(
      importsOf(`import { createSignal, somethingElse } from "@inkline/core";`),
    );
    expect(records.size).toBe(1);
    expect(records.get("createSignal")?.primitive).toBe("createSignal");
    expect(records.get("somethingElse")).toBeUndefined();
  });

  it("ignores imports from other modules", () => {
    const records = collectPrimitiveImports(
      importsOf(`
        import { createSignal } from "react";
        import { createSignal } from "solid-js";
        import { useState } from "react";
      `),
    );
    expect(records.size).toBe(0);
  });

  it("ignores imports without an import clause (side-effect imports)", () => {
    const records = collectPrimitiveImports(importsOf(`import "@inkline/core";`));
    expect(records.size).toBe(0);
  });

  it("skips namespace imports of @inkline/core", () => {
    const records = collectPrimitiveImports(importsOf(`import * as core from "@inkline/core";`));
    expect(records.size).toBe(0);
  });

  it("skips default-only imports of @inkline/core", () => {
    const records = collectPrimitiveImports(importsOf(`import core from "@inkline/core";`));
    expect(records.size).toBe(0);
  });

  it("collects named bindings even when paired with a default binding", () => {
    const records = collectPrimitiveImports(
      importsOf(`import core, { createSignal } from "@inkline/core";`),
    );
    expect(records.size).toBe(1);
    expect(records.get("createSignal")?.primitive).toBe("createSignal");
  });

  it("merges across multiple @inkline/core declarations", () => {
    const records = collectPrimitiveImports(
      importsOf(`
        import { createSignal } from "@inkline/core";
        import { createMemo } from "@inkline/core";
      `),
    );
    expect(records.size).toBe(2);
    expect(records.get("createSignal")?.primitive).toBe("createSignal");
    expect(records.get("createMemo")?.primitive).toBe("createMemo");
  });

  it("ignores type-only modifiers — imports are recorded regardless", () => {
    // `import type { ... }` from @inkline/core resolves the same primitives but
    // would have no runtime effect; the parser treats them like value imports
    // since the IR doesn't care about the type-only flag at this stage.
    const records = collectPrimitiveImports(
      importsOf(`import type { createSignal } from "@inkline/core";`),
    );
    expect(records.size).toBe(1);
  });

  it("guards against ImportDeclarations whose module specifier is not a string literal", () => {
    // Real TS source can't produce this, but ts.factory permits any Expression
    // as the moduleSpecifier slot — cover the defensive bail.
    const synthetic = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            undefined,
            ts.factory.createIdentifier("createSignal"),
          ),
        ]),
      ),
      ts.factory.createNumericLiteral("42"),
    );
    expect(collectPrimitiveImports([synthetic]).size).toBe(0);
  });
});
