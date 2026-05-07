import * as ts from "typescript";
import { describe, expect, it } from "vitest";

import {
  createComponentSkeleton,
  createDynamicExpression,
  createElement,
  createExpression,
  createFor,
  createFragment,
  createIf,
  createSlotContent,
  createStaticValue,
  createSwitch,
  createText,
} from "../ir/builders.ts";
import type {
  IRComponent,
  IRComponentInstance,
  IREffectDeclaration,
  IRMemoDeclaration,
  IRProp,
  IRSlotPlaceholder,
} from "../ir/nodes.ts";
import { UNKNOWN_LOCATION } from "../ir/types.ts";

import { validateComponent } from "./validate.ts";

const stubSymbol = (name: string): ts.Symbol =>
  ({ name, flags: 0, declarations: [] }) as unknown as ts.Symbol;

const ident = (name: string): ts.Identifier => ts.factory.createIdentifier(name);

function emptyComponent(): IRComponent {
  return createComponentSkeleton({
    id: "x#X",
    name: "X",
    render: createText(""),
  });
}

describe("validateComponent — INK0010 effect-no-deps", () => {
  it("emits when an effect's body reads no signals and is not dynamic", () => {
    const comp = emptyComponent();
    const effect: IREffectDeclaration = {
      body: ident("body"),
      deps: [],
      cleanup: "absent",
      isDynamic: false,
      loc: UNKNOWN_LOCATION,
    };
    comp.effects.push(effect);
    const diags = validateComponent(comp);
    expect(diags).toHaveLength(1);
    expect(diags[0]?.code).toBe("INK0010");
    expect(diags[0]?.severity).toBe("warning");
    expect(diags[0]?.help).toBeDefined();
  });

  it("does not emit when the effect has at least one dep", () => {
    const comp = emptyComponent();
    comp.effects.push({
      body: ident("body"),
      deps: [
        {
          symbol: stubSymbol("count"),
          kind: "signal",
          name: "count",
          path: [],
          conditional: false,
        },
      ],
      cleanup: "absent",
      isDynamic: false,
      loc: UNKNOWN_LOCATION,
    });
    const diags = validateComponent(comp);
    expect(diags.find((d) => d.code === "INK0010")).toBeUndefined();
  });

  it("does not emit when the effect bailed to dynamic", () => {
    const comp = emptyComponent();
    comp.effects.push({
      body: ident("body"),
      deps: [],
      cleanup: "absent",
      isDynamic: true,
      loc: UNKNOWN_LOCATION,
    });
    const diags = validateComponent(comp);
    // INK0010 should not fire (we skipped via the !isDynamic guard); INK0020
    // is for *expressions*, not effects, so neither should fire here.
    expect(diags).toHaveLength(0);
  });
});

describe("validateComponent — INK0011 memo-no-deps", () => {
  it("emits when a memo's body has isReactive=false", () => {
    const comp = emptyComponent();
    const memo: IRMemoDeclaration = {
      name: "constant",
      symbol: stubSymbol("constant"),
      expr: createExpression({ expr: ident("body") }), // no resolution → isReactive=false
      loc: UNKNOWN_LOCATION,
    };
    comp.memos.push(memo);
    const diags = validateComponent(comp);
    expect(diags).toHaveLength(1);
    expect(diags[0]?.code).toBe("INK0011");
  });

  it("does not emit when the memo body is reactive", () => {
    const comp = emptyComponent();
    comp.memos.push({
      name: "doubled",
      symbol: stubSymbol("doubled"),
      expr: createExpression({
        expr: ident("body"),
        resolution: {
          deps: [
            {
              symbol: stubSymbol("count"),
              kind: "signal",
              name: "count",
              path: [],
              conditional: false,
            },
          ],
          isReactive: true,
          isDynamic: false,
        },
      }),
      loc: UNKNOWN_LOCATION,
    });
    const diags = validateComponent(comp);
    expect(diags.find((d) => d.code === "INK0011")).toBeUndefined();
  });
});

describe("validateComponent — INK0020 dynamic-react-fallback", () => {
  it("emits when a memo body is dynamic", () => {
    const comp = emptyComponent();
    comp.memos.push({
      name: "lookup",
      symbol: stubSymbol("lookup"),
      expr: createDynamicExpression(ident("dynamicBody"), UNKNOWN_LOCATION),
      loc: UNKNOWN_LOCATION,
    });
    const diags = validateComponent(comp);
    const ink0020 = diags.find((d) => d.code === "INK0020");
    expect(ink0020).toBeDefined();
    expect(ink0020?.targets).toEqual(["react"]);
  });

  it("emits when a prop default value is dynamic", () => {
    const comp = emptyComponent();
    const prop: IRProp = {
      name: "label",
      required: false,
      defaultValue: createDynamicExpression(ident("dyn"), UNKNOWN_LOCATION),
      loc: UNKNOWN_LOCATION,
    };
    comp.props.push(prop);
    const diags = validateComponent(comp);
    expect(diags.find((d) => d.code === "INK0020")).toBeDefined();
  });

  it("emits when a render-tree expression is dynamic", () => {
    const comp = emptyComponent();
    comp.render = createElement({
      tag: "div",
      children: [createDynamicExpression(ident("dyn"))],
    });
    const diags = validateComponent(comp);
    expect(diags.find((d) => d.code === "INK0020")).toBeDefined();
  });

  it("emits exactly one diagnostic per dynamic expression", () => {
    const comp = emptyComponent();
    comp.render = createFragment([
      createDynamicExpression(ident("a")),
      createDynamicExpression(ident("b")),
    ]);
    const diags = validateComponent(comp).filter((d) => d.code === "INK0020");
    expect(diags).toHaveLength(2);
  });

  it("does not emit for non-dynamic expressions", () => {
    const comp = emptyComponent();
    comp.render = createElement({
      tag: "div",
      children: [createExpression({ expr: ident("x") })],
    });
    const diags = validateComponent(comp);
    expect(diags).toEqual([]);
  });

  it("walks props with and without default values", () => {
    const comp = emptyComponent();
    // One prop with a default value (covered branch); one without (uncovered branch).
    comp.props.push({
      name: "withDefault",
      required: false,
      defaultValue: createDynamicExpression(ident("dyn")),
      loc: UNKNOWN_LOCATION,
    });
    comp.props.push({
      name: "withoutDefault",
      required: true,
      loc: UNKNOWN_LOCATION,
    });
    const diags = validateComponent(comp).filter((d) => d.code === "INK0020");
    expect(diags).toHaveLength(1);
  });

  it("walks If / Switch / SlotPlaceholder without fallbacks", () => {
    const comp = emptyComponent();
    const dyn = (n: string) => createDynamicExpression(ident(n));
    comp.render = createElement({
      tag: "section",
      children: [
        // No fallback on the If.
        createIf({ branches: [{ test: dyn("if-test"), body: dyn("if-body") }] }),
        // No fallback on the Switch.
        createSwitch({ cases: [{ test: dyn("sw-test"), body: dyn("sw-body") }] }),
        // No fallback on the SlotPlaceholder.
        {
          kind: "SlotPlaceholder",
          name: "default",
          scopedArgs: [dyn("slot-arg")],
          loc: UNKNOWN_LOCATION,
        } as IRSlotPlaceholder,
      ],
    });
    const diags = validateComponent(comp).filter((d) => d.code === "INK0020");
    // 2 from if + 2 from switch + 1 from slot = 5
    expect(diags).toHaveLength(5);
  });

  it("walks ComponentInstance attrs with both static and expression values", () => {
    const comp = emptyComponent();
    const componentInstance: IRComponentInstance = {
      kind: "ComponentInstance",
      reference: ident("Foo"),
      attrs: [
        // Mix static + expression to cover the `attr.value.kind === "Expression"` false branch.
        {
          name: "tone",
          value: createStaticValue("dark"),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
        {
          name: "variant",
          value: createDynamicExpression(ident("variant")),
          binding: "normal",
          loc: UNKNOWN_LOCATION,
        },
      ],
      events: [],
      slots: [],
      loc: UNKNOWN_LOCATION,
    };
    comp.render = componentInstance;
    const diags = validateComponent(comp).filter((d) => d.code === "INK0020");
    // Only the dynamic attr produces a diagnostic; the static one is skipped.
    expect(diags).toHaveLength(1);
  });

  it("walks every render-node kind to find dynamic expressions", () => {
    const comp = emptyComponent();
    const dyn = (n: string) => createDynamicExpression(ident(n));

    const componentInstance: IRComponentInstance = {
      kind: "ComponentInstance",
      reference: ident("Foo"),
      attrs: [{ name: "x", value: dyn("ci-attr"), binding: "normal", loc: UNKNOWN_LOCATION }],
      events: [{ name: "onClick", handler: dyn("ci-evt"), loc: UNKNOWN_LOCATION }],
      slots: [createSlotContent({ body: dyn("ci-slot") })],
      loc: UNKNOWN_LOCATION,
    };

    const slotPlaceholder: IRSlotPlaceholder = {
      kind: "SlotPlaceholder",
      name: "header",
      scopedArgs: [dyn("slot-arg")],
      fallback: dyn("slot-fb"),
      loc: UNKNOWN_LOCATION,
    };

    comp.render = createFragment([
      createElement({
        tag: "div",
        attrs: [{ name: "x", value: dyn("el-attr"), binding: "normal", loc: UNKNOWN_LOCATION }],
        events: [{ name: "onClick", handler: dyn("el-evt"), loc: UNKNOWN_LOCATION }],
        refs: [{ ref: dyn("el-ref"), loc: UNKNOWN_LOCATION }],
        children: [
          createIf({
            branches: [{ test: dyn("if-test"), body: dyn("if-body") }],
            fallback: dyn("if-fb"),
          }),
          createFor({
            each: dyn("for-each"),
            itemBinding: "i",
            key: dyn("for-key"),
            body: dyn("for-body"),
          }),
          createSwitch({
            cases: [{ test: dyn("sw-test"), body: dyn("sw-body") }],
            fallback: dyn("sw-fb"),
          }),
          slotPlaceholder,
          componentInstance,
          createText("static"),
          createElement({
            tag: "span",
            attrs: [
              {
                name: "id",
                value: createStaticValue("static"),
                binding: "normal",
                loc: UNKNOWN_LOCATION,
              },
            ],
          }),
        ],
      }),
    ]);
    const diags = validateComponent(comp).filter((d) => d.code === "INK0020");
    // 1 element attr + 1 event + 1 ref
    // + 1 if-test + 1 if-body + 1 if-fb
    // + 1 for-each + 1 for-key + 1 for-body
    // + 1 sw-test + 1 sw-body + 1 sw-fb
    // + 1 slot-arg + 1 slot-fb
    // + 1 ci-attr + 1 ci-evt + 1 ci-slot
    // = 17
    expect(diags).toHaveLength(17);
  });
});

describe("validateComponent — clean component", () => {
  it("returns no diagnostics for a clean component", () => {
    const comp = emptyComponent();
    const symCount = stubSymbol("count");
    comp.memos.push({
      name: "doubled",
      symbol: stubSymbol("doubled"),
      expr: createExpression({
        expr: ident("body"),
        resolution: {
          deps: [{ symbol: symCount, kind: "signal", name: "count", path: [], conditional: false }],
          isReactive: true,
          isDynamic: false,
        },
      }),
      loc: UNKNOWN_LOCATION,
    });
    comp.effects.push({
      body: ident("eff"),
      deps: [{ symbol: symCount, kind: "signal", name: "count", path: [], conditional: false }],
      cleanup: "absent",
      isDynamic: false,
      loc: UNKNOWN_LOCATION,
    });
    expect(validateComponent(comp)).toEqual([]);
  });
});
