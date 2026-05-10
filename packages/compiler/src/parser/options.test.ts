import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import { createComponentSkeleton, createText } from "../ir/builders.ts";
import type { IRComponent } from "../ir/nodes.ts";

import { applyDefineComponentOptions } from "./options.ts";
import { createSingleFileProgram } from "./program.ts";

function emptyComponent(): IRComponent {
  return createComponentSkeleton({ id: "x#X", name: "Initial", render: createText("") });
}

/** Locate the first object literal in the source — the options arg. */
function firstObjectLiteral(sourceFile: ts.SourceFile): ts.ObjectLiteralExpression {
  let found: ts.ObjectLiteralExpression | undefined;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isObjectLiteralExpression(node)) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!found) throw new Error("no object literal");
  return found;
}

function load(source: string): {
  sourceFile: ts.SourceFile;
  options: ts.ObjectLiteralExpression;
} {
  const { sourceFile } = createSingleFileProgram({ fileName: "/x.ink.tsx", source });
  return { sourceFile, options: firstObjectLiteral(sourceFile) };
}

describe("applyDefineComponentOptions", () => {
  it("parses the component name", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`const o = { name: "Button" };`);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.name).toBe("Button");
  });

  it("ignores a non-string name", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`const o = { name: 42 };`);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.name).toBe("Initial");
  });

  it("parses props, propagating required flag", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        props: {
          label: { required: true },
          tone: {},
          size: { type: Number },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.props.map((p) => p.name).sort()).toEqual(["label", "size", "tone"]);
    expect(c.props.find((p) => p.name === "label")?.required).toBe(true);
    expect(c.props.find((p) => p.name === "tone")?.required).toBe(false);
    expect(c.props.find((p) => p.name === "size")?.required).toBe(false);
  });

  it("skips prop members that are not property assignments (methods, spreads)", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        props: {
          foo: { required: true },
          method() { return 1; },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.props.map((p) => p.name)).toEqual(["foo"]);
  });

  it("parses slots, propagating scoped and required flags", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        slots: {
          default: { required: true },
          header: { scoped: true },
          footer: {},
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.slots.find((s) => s.name === "default")?.required).toBe(true);
    expect(c.slots.find((s) => s.name === "header")?.isScoped).toBe(true);
    expect(c.slots.find((s) => s.name === "footer")?.isScoped).toBe(false);
  });

  it("parses events", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = { events: { change: {}, submit: {} } };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.events.map((e) => e.name).sort()).toEqual(["change", "submit"]);
  });

  it("ignores top-level keys that are not property assignments", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        get propsGetter() { return {}; },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.name).toBe("Initial");
    expect(c.props).toEqual([]);
  });

  it("ignores top-level keys with computed names", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const k = "name";
      const o = { [k]: "Computed" };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.name).toBe("Initial");
  });

  it("ignores props/slots/events whose initializers are not object literals", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = { props: undefined, slots: null, events: 1 };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.props).toEqual([]);
    expect(c.slots).toEqual([]);
    expect(c.events).toEqual([]);
  });

  it("skips slot members that are not property assignments", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        slots: {
          default: {},
          method() { return null; },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.slots.map((s) => s.name)).toEqual(["default"]);
  });

  it("skips slot members with computed names", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const k = "hidden";
      const o = { slots: { [k]: {} } };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.slots).toEqual([]);
  });

  it("skips slot inner members that are not property assignments", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        slots: {
          header: {
            scoped: true,
            method() { return null; },
          },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.slots[0]?.isScoped).toBe(true);
  });

  it("skips slot inner members with non-identifier names", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        slots: {
          header: {
            "scoped": true,
          },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    // The "scoped" string-literal key is skipped by !ts.isIdentifier(sub.name).
    expect(c.slots[0]?.isScoped).toBe(false);
  });

  it("skips event members that are not property assignments", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        events: {
          change: {},
          method() { return null; },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.events.map((e) => e.name)).toEqual(["change"]);
  });

  it("skips event members with computed names", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const k = "click";
      const o = { events: { [k]: {} } };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.events).toEqual([]);
  });

  it("skips prop inner members that are not property assignments", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        props: {
          label: {
            required: true,
            method() { return 1; },
          },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.props[0]?.required).toBe(true);
  });

  it("skips prop inner members with non-identifier names", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        props: {
          label: {
            "required": true,
          },
        },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    // "required" string-literal sub-key is skipped.
    expect(c.props[0]?.required).toBe(false);
  });

  it("skips top-level keys with computed names (string-literal initialization)", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = { name: "X", [Symbol.iterator]: () => null };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.name).toBe("X");
  });

  it("accepts string-literal property keys", () => {
    const c = emptyComponent();
    const { sourceFile, options } = load(`
      const o = {
        "name": "Quoted",
        "props": { "label": { required: true } },
      };
    `);
    applyDefineComponentOptions(options, c, sourceFile);
    expect(c.name).toBe("Quoted");
    expect(c.props[0]?.name).toBe("label");
  });
});
