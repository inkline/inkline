import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import {
  createAttribute,
  createComponentInstance,
  createElement,
  createExpr,
  createFragment,
  createIf,
  createSlotPlaceholder,
  createStaticValue,
  createTransition,
} from "../../../ir/render/builders.ts";
import {
  IR_VERSION,
  type IRComponent,
  type IRModule,
  type IRNode,
} from "../../../ir/render/nodes.ts";
import { makeComp, mockExpr, loc } from "../../../testing/codegen.ts";
import { buildAngularRegistry } from "../../../pipeline/compile.ts";
import {
  classifyOne,
  resolveAngularKinds,
  type RawClassification,
  type RawEntry,
} from "./registry.ts";

const ref = (name: string) => mockExpr(name) as ts.Identifier;
const slot = (body: IRNode = createSlotPlaceholder({})) => ({
  name: "default",
  body,
  scopedParams: [],
  loc,
});

describe("classifyOne", () => {
  it("classifies a flagged single static native element root as `element`, capturing host tag + base class", () => {
    const c = classifyOne(
      makeComp(
        "IButtonBase",
        createElement({
          tag: "button",
          attrs: [
            createAttribute({ name: "class", value: createStaticValue({ value: "button" }) }),
            createAttribute({ name: "type", value: createExpr({ expr: mockExpr("props.type") }) }),
          ],
          children: [createSlotPlaceholder({})],
        }),
        { element: "button" },
      ),
    );
    expect(c).toMatchObject({ kind: "element", hostTag: "button", baseClass: "button" });
    // The non-class root attrs are captured (for re-hosting when a structural component inlines this base).
    if (c.kind === "element") expect(c.rootAttrs.map((a) => a.name)).toEqual(["type"]);
  });

  it("classifies a flagged element root with no static class as `element` with undefined baseClass", () => {
    const c = classifyOne(
      makeComp("IBadgeBase", createElement({ tag: "div", children: [createSlotPlaceholder({})] }), {
        element: "div",
      }),
    );
    expect(c).toEqual({ kind: "element", hostTag: "div", baseClass: undefined, rootAttrs: [] });
  });

  it("unwraps a Transition root to classify the underlying (flagged) element", () => {
    const c = classifyOne(
      makeComp("X", createTransition({ child: createElement({ tag: "div" }) }), { element: "div" }),
    );
    expect(c).toMatchObject({ kind: "element", hostTag: "div" });
  });

  it("falls back to `wrapper` for an UNMARKED element root, or a declared tag that mismatches the root", () => {
    // No `element` flag → wrapper (the opt-in: story scaffolding / app components never auto-convert).
    expect(classifyOne(makeComp("Unmarked", createElement({ tag: "div" })))).toEqual({
      kind: "wrapper",
    });
    // Flag set but the root tag doesn't match → wrapper (INK0130 reports the mismatch in analyze).
    expect(
      classifyOne(makeComp("Mismatch", createElement({ tag: "a" }), { element: "button" })),
    ).toEqual({ kind: "wrapper" });
  });

  it("falls back to `wrapper` when a flagged element root carries a #ref", () => {
    const c = classifyOne(
      makeComp(
        "X",
        createElement({
          tag: "input",
          refs: [{ ref: createExpr({ expr: mockExpr("r") }), category: "element", loc }],
        }),
        { element: "input" },
      ),
    );
    expect(c).toEqual({ kind: "wrapper" });
  });

  it("classifies a conditional / fragment root as `wrapper`", () => {
    expect(
      classifyOne(
        makeComp(
          "Ctrl",
          createIf({
            branches: [
              {
                test: createExpr({ expr: mockExpr("t") }),
                body: createElement({ tag: "textarea" }),
              },
            ],
            fallback: createElement({ tag: "input" }),
          }),
        ),
      ),
    ).toEqual({ kind: "wrapper" });
    expect(
      classifyOne(makeComp("Frag", createFragment({ children: [createElement({ tag: "div" })] }))),
    ).toEqual({ kind: "wrapper" });
  });

  it("classifies a pure-forwarding component-instance root as `forwarding` (bare slot, no injected structure)", () => {
    const c = classifyOne(
      makeComp(
        "IButton",
        createComponentInstance({
          reference: ref("IButtonBase"),
          attrs: [createAttribute({ name: "class", value: createExpr({ expr: mockExpr("cls") }) })],
          slots: [slot()],
        }),
      ),
    );
    expect(c).toEqual({ kind: "forwarding", rootLocal: "IButtonBase" });
  });

  it("classifies a component-instance root that injects structure as `structural`", () => {
    const c = classifyOne(
      makeComp(
        "IInput",
        createComponentInstance({
          reference: ref("IInputBase"),
          slots: [
            slot(
              createElement({ tag: "span", children: [createSlotPlaceholder({ name: "prefix" })] }),
            ),
          ],
        }),
      ),
    );
    expect(c).toEqual({ kind: "structural", rootLocal: "IInputBase" });
  });
});

describe("resolveAngularKinds", () => {
  const raw = (
    classification: RawClassification,
    resolveLocal: (l: string) => string | undefined = () => undefined,
  ): RawEntry => ({ classification, resolveLocal });

  it("finalizes an element with its own attribute selector + chain", () => {
    const reg = resolveAngularKinds(
      new Map([
        [
          "IButtonBase",
          raw({ kind: "element", hostTag: "button", baseClass: "button", rootAttrs: [] }),
        ],
      ]),
    );
    expect(reg.get("IButtonBase")).toMatchObject({
      kind: "element",
      hostTag: "button",
      attrChain: ["inkButtonBase"],
      chainComponents: ["IButtonBase"],
    });
  });

  it("resolves a forwarding styled component over an element into a stacked `directive`", () => {
    const reg = resolveAngularKinds(
      new Map([
        [
          "IButtonBase",
          raw({ kind: "element", hostTag: "button", baseClass: "button", rootAttrs: [] }),
        ],
        [
          "IButton",
          raw({ kind: "forwarding", rootLocal: "IButtonBase" }, (l) =>
            l === "IButtonBase" ? "IButtonBase" : undefined,
          ),
        ],
      ]),
    );
    expect(reg.get("IButton")).toMatchObject({
      kind: "directive",
      hostTag: "button",
      attrChain: ["inkButtonBase", "inkButton"],
      chainComponents: ["IButtonBase", "IButton"],
    });
  });

  it("resolves a structural styled component over an element into a self-contained `structural`", () => {
    const reg = resolveAngularKinds(
      new Map([
        ["IInputBase", raw({ kind: "element", hostTag: "div", baseClass: "input", rootAttrs: [] })],
        [
          "IInput",
          raw({ kind: "structural", rootLocal: "IInputBase" }, (l) =>
            l === "IInputBase" ? "IInputBase" : undefined,
          ),
        ],
      ]),
    );
    // The base is inlined, so the consumer stacks ONLY this component's selector and imports only it.
    expect(reg.get("IInput")).toMatchObject({
      kind: "structural",
      hostTag: "div",
      baseClass: "input",
      attrChain: ["inkInput"],
      chainComponents: ["IInput"],
    });
  });

  it("stacks a directive over an element base, but stays a wrapper over a non-element base", () => {
    const reg = resolveAngularKinds(
      new Map([
        ["E", raw({ kind: "element", hostTag: "button", rootAttrs: [] })],
        ["D1", raw({ kind: "forwarding", rootLocal: "E" }, (l) => (l === "E" ? "E" : undefined))],
        [
          "D2",
          raw({ kind: "forwarding", rootLocal: "D1" }, (l) => (l === "D1" ? "D1" : undefined)),
        ],
      ]),
    );
    // A styling directive decorates a native element host, so it stacks onto the `element` base.
    expect(reg.get("D1")).toMatchObject({
      kind: "directive",
      hostTag: "button",
      attrChain: ["inkE", "inkD1"],
      chainComponents: ["E", "D1"],
    });
    // Forwarding over a (non-element) directive base — e.g. a story/app wrapper composing a styled
    // component — stays a wrapper, not a deep directive stack. This is exactly what keeps story
    // render components (which wrap a single styled component) as `ink-*` element wrappers.
    expect(reg.get("D2")!.kind).toBe("wrapper");
  });

  it("falls back to `wrapper` when the base resolves to a wrapper, is unknown, or forms a cycle", () => {
    const overWrapper = resolveAngularKinds(
      new Map([
        ["Base", raw({ kind: "wrapper" })],
        [
          "Styled",
          raw({ kind: "forwarding", rootLocal: "Base" }, (l) =>
            l === "Base" ? "Base" : undefined,
          ),
        ],
      ]),
    );
    expect(overWrapper.get("Styled")!.kind).toBe("wrapper");

    const unknownTarget = resolveAngularKinds(
      new Map([["Styled", raw({ kind: "forwarding", rootLocal: "Missing" })]]),
    );
    expect(unknownTarget.get("Styled")!.kind).toBe("wrapper");

    const cyclic = resolveAngularKinds(
      new Map([
        ["A", raw({ kind: "forwarding", rootLocal: "B" }, (l) => (l === "B" ? "B" : undefined))],
        ["B", raw({ kind: "forwarding", rootLocal: "A" }, (l) => (l === "A" ? "A" : undefined))],
      ]),
    );
    expect(cyclic.get("A")!.kind).toBe("wrapper");
    expect(cyclic.get("B")!.kind).toBe("wrapper");

    // The local resolves to a name that is outside the scanned set (e.g. a base from an external
    // package) → that name has no entry → safe wrapper fallback.
    const externalBase = resolveAngularKinds(
      new Map([
        [
          "Styled",
          raw({ kind: "forwarding", rootLocal: "Ext" }, (l) =>
            l === "Ext" ? "ExternalBase" : undefined,
          ),
        ],
      ]),
    );
    expect(externalBase.get("Styled")!.kind).toBe("wrapper");

    // A structural component can only flatten a trivial ELEMENT base; over a non-element it can't
    // flatten → wrapper.
    const structuralOverWrapper = resolveAngularKinds(
      new Map([
        ["Base", raw({ kind: "wrapper" })],
        [
          "Struct",
          raw({ kind: "structural", rootLocal: "Base" }, (l) =>
            l === "Base" ? "Base" : undefined,
          ),
        ],
      ]),
    );
    expect(structuralOverWrapper.get("Struct")!.kind).toBe("wrapper");
  });
});

describe("buildAngularRegistry", () => {
  const IR_MODULE_BASE = {
    version: IR_VERSION,
    fileName: "t.tsx",
    contexts: [],
    sourceFile: ts.createSourceFile("t.tsx", "", ts.ScriptTarget.Latest, true),
  } as const;

  const makeModule = (
    components: IRComponent[],
    imports: readonly ts.ImportDeclaration[] = [],
  ): IRModule => ({ ...IR_MODULE_BASE, components, imports });

  const importDecl = (code: string): ts.ImportDeclaration =>
    ts.createSourceFile("i.tsx", code, ts.ScriptTarget.Latest, true)
      .statements[0] as ts.ImportDeclaration;

  const badgeBase = makeComp(
    "IBadgeBase",
    createElement({
      tag: "div",
      attrs: [createAttribute({ name: "class", value: createStaticValue({ value: "badge" }) })],
      children: [createSlotPlaceholder({})],
    }),
    { element: "div" },
  );
  const badge = makeComp(
    "IBadge",
    createComponentInstance({
      reference: ref("IBadgeBase"),
      attrs: [createAttribute({ name: "class", value: createExpr({ expr: mockExpr("cls") }) })],
      slots: [slot()],
    }),
  );

  it("resolves a same-file styled+headless pair (local name === component name)", () => {
    const reg = buildAngularRegistry([makeModule([badgeBase, badge])]);
    expect(reg.get("IBadgeBase")).toMatchObject({
      kind: "element",
      hostTag: "div",
      attrChain: ["inkBadgeBase"],
    });
    expect(reg.get("IBadge")).toMatchObject({
      kind: "directive",
      hostTag: "div",
      attrChain: ["inkBadgeBase", "inkBadge"],
      chainComponents: ["IBadgeBase", "IBadge"],
    });
  });

  it("resolves a cross-file styled+headless pair via the import map", () => {
    const reg = buildAngularRegistry([
      makeModule([badgeBase]),
      makeModule([badge], [importDecl('import IBadgeBase from "../headless/IBadgeBase.ink";')]),
    ]);
    expect(reg.get("IBadge")).toMatchObject({
      kind: "directive",
      hostTag: "div",
      chainComponents: ["IBadgeBase", "IBadge"],
    });
  });
});
