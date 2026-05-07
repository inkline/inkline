import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createComponentSkeleton, createText } from "../ir/builders.ts";
import type { IRComponent } from "../ir/nodes.ts";
import { collectPrimitiveImports, type ImportRecord } from "../primitives.ts";
import { ReactiveScope } from "../scope.ts";

import { createSingleFileProgram } from "./program.ts";
import { classifyPrimitiveCall, parseSetupBody } from "./setup.ts";

interface SetupBundle {
  sourceFile: ts.SourceFile;
  checker: ts.TypeChecker;
  setup: ts.ArrowFunction | ts.FunctionExpression;
  primitiveImports: Map<string, ImportRecord>;
  component: IRComponent;
  scope: ReactiveScope;
}

function loadSetup(componentBody: string): SetupBundle {
  const source = `
    import {
      createSignal, createMemo, createEffect, createRef,
      onMount, onCleanup, defineComponent,
    } from "@inkline/core";
    const C = defineComponent((props) => {
      ${componentBody}
    });
  `;
  const { sourceFile, checker } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
  const imports = sourceFile.statements.filter(ts.isImportDeclaration);
  const primitiveImports = collectPrimitiveImports(imports);
  // Find the arrow setup function inside `defineComponent((props) => { ... })`.
  let setup: ts.ArrowFunction | ts.FunctionExpression | undefined;
  const visit = (node: ts.Node): void => {
    if (setup) return;
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      setup = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!setup) throw new Error("setup function not found");
  return {
    sourceFile,
    checker,
    setup,
    primitiveImports,
    component: createComponentSkeleton({ id: "x#C", name: "C", render: createText("") }),
    scope: new ReactiveScope(),
  };
}

describe("classifyPrimitiveCall", () => {
  it("returns null for non-call expressions", () => {
    expect(classifyPrimitiveCall(ts.factory.createIdentifier("x"), new Map())).toBeNull();
  });

  it("returns null when the callee is not an identifier", () => {
    const expr = ts.factory.createCallExpression(
      ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier("o"), "createSignal"),
      undefined,
      [],
    );
    expect(classifyPrimitiveCall(expr, new Map())).toBeNull();
  });

  it("returns null when the callee is not in primitiveImports", () => {
    const expr = ts.factory.createCallExpression(
      ts.factory.createIdentifier("createSignal"),
      undefined,
      [],
    );
    expect(classifyPrimitiveCall(expr, new Map())).toBeNull();
  });
});

describe("parseSetupBody", () => {
  it("registers a signal with both halves of the array binding", () => {
    const b = loadSetup(`const [count, setCount] = createSignal(0);`);
    parseSetupBody(b.setup, b);
    expect(b.component.state).toHaveLength(1);
    const state = b.component.state[0]!;
    expect(state.name).toBe("count");
    expect(state.setterName).toBe("setCount");
    expect(b.scope.has(state.symbol)).toBe(true);
    expect(b.scope.isStableSetter(state.setterSymbol)).toBe(true);
  });

  it("uses an `undefined` initializer when createSignal is given no args", () => {
    const b = loadSetup(`const [count, setCount] = createSignal();`);
    parseSetupBody(b.setup, b);
    expect(b.component.state).toHaveLength(1);
    expect(b.component.state[0]?.initial.expr).toBeDefined();
  });

  it("rejects a signal whose binding is not an array pattern", () => {
    const b = loadSetup(`const counter = createSignal(0);`);
    parseSetupBody(b.setup, b);
    expect(b.component.state).toEqual([]);
    // The variable statement falls through to component.setup since it
    // wasn't consumed by primitive registration.
    expect(b.component.setup).toHaveLength(1);
  });

  it("rejects a signal whose second element is missing", () => {
    const b = loadSetup(`const [count] = createSignal(0);`);
    parseSetupBody(b.setup, b);
    expect(b.component.state).toEqual([]);
  });

  it("rejects a signal whose first element is omitted", () => {
    const b = loadSetup(`const [, setCount] = createSignal(0);`);
    parseSetupBody(b.setup, b);
    expect(b.component.state).toEqual([]);
  });

  it("rejects a signal whose elements are nested binding patterns", () => {
    const b = loadSetup(`const [[a], setA] = [[null], () => {}];`);
    parseSetupBody(b.setup, b);
    expect(b.component.state).toEqual([]);
  });

  it("registers a memo with arrow expression body", () => {
    const b = loadSetup(`
      const [count, setCount] = createSignal(0);
      const doubled = createMemo(() => count() * 2);
    `);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toHaveLength(1);
    expect(b.component.memos[0]?.name).toBe("doubled");
    expect(b.component.memos[0]?.expr.isReactive).toBe(true);
  });

  it("registers a memo with a block body and a return statement", () => {
    const b = loadSetup(`
      const [count, setCount] = createSignal(0);
      const tripled = createMemo(() => { return count() * 3; });
    `);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toHaveLength(1);
  });

  it("registers a memo with a function-expression body", () => {
    const b = loadSetup(`
      const [count, setCount] = createSignal(0);
      const quad = createMemo(function () { return count() * 4; });
    `);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toHaveLength(1);
  });

  it("rejects a memo with a non-function argument", () => {
    const b = loadSetup(`const m = createMemo(42 as any);`);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toEqual([]);
  });

  it("rejects a memo declared via destructuring", () => {
    const b = loadSetup(`const [m] = [createMemo(() => 1)];`);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toEqual([]);
  });

  it("rejects a memo whose body has neither return nor expression body", () => {
    const b = loadSetup(`const m = createMemo(() => { /* nothing */ });`);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toEqual([]);
  });

  it("rejects a memo with no arguments", () => {
    const b = loadSetup(`const m = createMemo();`);
    parseSetupBody(b.setup, b);
    expect(b.component.memos).toEqual([]);
  });

  it("registers a ref with element-type type argument", () => {
    const b = loadSetup(`const inputRef = createRef<HTMLInputElement>();`);
    parseSetupBody(b.setup, b);
    expect(b.component.refs).toHaveLength(1);
    expect(b.component.refs[0]?.elementType).toBe("HTMLInputElement");
  });

  it("registers a ref without a type argument (no elementType)", () => {
    const b = loadSetup(`const r = createRef();`);
    parseSetupBody(b.setup, b);
    expect(b.component.refs).toHaveLength(1);
    expect(b.component.refs[0]?.elementType).toBeUndefined();
  });

  it("rejects a ref whose binding is not an identifier", () => {
    const b = loadSetup(`const [r] = [createRef()];`);
    parseSetupBody(b.setup, b);
    expect(b.component.refs).toEqual([]);
  });

  it("registers an effect into component.effects", () => {
    const b = loadSetup(`
      const [count, setCount] = createSignal(0);
      createEffect(() => { console.log(count()); });
    `);
    parseSetupBody(b.setup, b);
    expect(b.component.effects).toHaveLength(1);
    expect(b.component.lifecycle.onMount).toEqual([]);
    expect(b.component.lifecycle.onCleanup).toEqual([]);
  });

  it("routes onMount into lifecycle.onMount", () => {
    const b = loadSetup(`onMount(() => { console.log("mounted"); });`);
    parseSetupBody(b.setup, b);
    expect(b.component.lifecycle.onMount).toHaveLength(1);
    expect(b.component.effects).toEqual([]);
  });

  it("routes onCleanup into lifecycle.onCleanup", () => {
    const b = loadSetup(`onCleanup(() => { console.log("cleaning"); });`);
    parseSetupBody(b.setup, b);
    expect(b.component.lifecycle.onCleanup).toHaveLength(1);
    expect(b.component.effects).toEqual([]);
  });

  it("detects 'present' cleanup when the effect body returns a function", () => {
    const b = loadSetup(`
      createEffect(() => {
        const id = setTimeout(() => {}, 0);
        return () => clearTimeout(id);
      });
    `);
    parseSetupBody(b.setup, b);
    expect(b.component.effects[0]?.cleanup).toBe("present");
  });

  it("detects 'absent' cleanup when the effect block has no fn-returning return", () => {
    const b = loadSetup(`createEffect(() => { console.log("ran"); });`);
    parseSetupBody(b.setup, b);
    expect(b.component.effects[0]?.cleanup).toBe("absent");
  });

  it("treats a non-block effect body as 'present' when the body itself is a fn", () => {
    // `() => () => clearTimeout(id)` — expression body returning a function.
    const b = loadSetup(`createEffect(() => () => { /* cleanup */ });`);
    parseSetupBody(b.setup, b);
    expect(b.component.effects[0]?.cleanup).toBe("present");
  });

  it("treats a non-block effect body as 'absent' when the body returns a value", () => {
    const b = loadSetup(`createEffect(() => 42);`);
    parseSetupBody(b.setup, b);
    expect(b.component.effects[0]?.cleanup).toBe("absent");
  });

  it("ignores effects called with no arguments", () => {
    const b = loadSetup(`createEffect();`);
    parseSetupBody(b.setup, b);
    expect(b.component.effects).toEqual([]);
  });

  it("ignores effects called with a non-function argument", () => {
    const b = loadSetup(`createEffect(42 as any);`);
    parseSetupBody(b.setup, b);
    expect(b.component.effects).toEqual([]);
  });

  it("collects non-primitive statements into component.setup", () => {
    const b = loadSetup(`
      const helper = (n: number) => n + 1;
      console.log("setup phase");
    `);
    parseSetupBody(b.setup, b);
    expect(b.component.setup).toHaveLength(2);
  });

  it("returns the render expression from a return statement", () => {
    const b = loadSetup(`return null as any;`);
    const result = parseSetupBody(b.setup, b);
    expect(result.renderExpression).not.toBeNull();
  });

  it("returns null when there is no return statement", () => {
    const b = loadSetup(`const x = 1;`);
    const result = parseSetupBody(b.setup, b);
    expect(result.renderExpression).toBeNull();
  });

  it("returns the body when the setup is an arrow with an expression body", () => {
    // Build a separate program where the setup is `(props) => null as any`.
    const source = `
      import { defineComponent } from "@inkline/core";
      const C = defineComponent((props) => null as any);
    `;
    const { sourceFile, checker } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
    const imports = sourceFile.statements.filter(ts.isImportDeclaration);
    const primitiveImports = collectPrimitiveImports(imports);
    let setup: ts.ArrowFunction | undefined;
    const visit = (node: ts.Node): void => {
      if (setup) return;
      if (ts.isArrowFunction(node)) {
        setup = node;
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (!setup) throw new Error("setup not found");
    const component = createComponentSkeleton({
      id: "x#C",
      name: "C",
      render: createText(""),
    });
    const result = parseSetupBody(setup, {
      primitiveImports,
      scope: new ReactiveScope(),
      checker,
      sourceFile,
      component,
    });
    expect(result.renderExpression).toBeDefined();
  });

  it("respects aliased primitive bindings", () => {
    const source = `
      import { createSignal as cs, defineComponent as dc } from "@inkline/core";
      const C = dc((props) => {
        const [count, setCount] = cs(0);
        return null as any;
      });
    `;
    const { sourceFile, checker } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
    const imports = sourceFile.statements.filter(ts.isImportDeclaration);
    const primitiveImports = collectPrimitiveImports(imports);
    let setup: ts.ArrowFunction | undefined;
    const visit = (node: ts.Node): void => {
      if (setup) return;
      if (ts.isArrowFunction(node)) {
        setup = node;
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (!setup) throw new Error("setup not found");
    const component = createComponentSkeleton({
      id: "x#C",
      name: "C",
      render: createText(""),
    });
    parseSetupBody(setup, {
      primitiveImports,
      scope: new ReactiveScope(),
      checker,
      sourceFile,
      component,
    });
    expect(component.state).toHaveLength(1);
  });

  it("falls through to component.setup for variable statements without an initializer", () => {
    const b = loadSetup(`let x: number;`);
    parseSetupBody(b.setup, b);
    expect(b.component.setup).toHaveLength(1);
  });
});
