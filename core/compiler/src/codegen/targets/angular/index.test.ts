import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import { DYNAMIC_DEPS, type SymbolId } from "../../../ir/reactivity.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  createAttribute,
  createComponentInstance,
  createElement,
  createExpr,
  createIf,
  createStaticValue,
  createSwitch,
  createText,
} from "../../../ir/render/builders.ts";
import {
  counterRender,
  emitCode as emitFor,
  emitWithCtx,
  emitWithFile,
  loc,
  makeComp,
  makeCtxWithExternalImport,
  mockExpr,
  propsLabelDisabled,
  richComp,
  runInvariants,
  transitionWithIf,
} from "../../../testing/codegen.ts";
import { angular } from "./index.ts";

function emitCode(comp: IRComponent): string {
  return emitFor(angular, comp);
}

describe("Angular nullish native-element attributes", () => {
  it("binds a plain dynamic attr via [attr.name] with ?? null so a nullish value omits it", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        { name: "id", value: createExpr({ expr: mockExpr("id()") }), binding: "normal", loc },
      ],
    });
    const code = emitCode(makeComp("Field", el));
    expect(code).toContain('[attr.id]="(id()) ?? null"');
    expect(code).not.toContain('[id]="');
  });

  it("keeps boolean / value-semantic attrs as property bindings", () => {
    const el = createElement({
      tag: "input",
      attrs: [
        { name: "value", value: createExpr({ expr: mockExpr("value()") }), binding: "normal", loc },
        {
          name: "disabled",
          value: createExpr({ expr: mockExpr("disabled()") }),
          binding: "normal",
          loc,
        },
      ],
    });
    const code = emitCode(makeComp("Field", el));
    expect(code).toContain('[value]="value()"');
    expect(code).toContain('[disabled]="disabled()"');
    expect(code).not.toContain("[attr.value]");
    expect(code).not.toContain("[attr.disabled]");
  });

  it("leaves component @Input bindings untouched (only native elements change)", () => {
    const ci = createComponentInstance({
      reference: mockExpr("Card") as ts.Identifier,
      resolved: { module: null, name: "Card" },
      attrs: [
        { name: "id", value: createExpr({ expr: mockExpr("id()") }), binding: "normal", loc },
      ],
    });
    const code = emitCode(makeComp("Page", ci));
    expect(code).toContain('[id]="id()"');
    expect(code).not.toContain("[attr.id]");
  });
});

describe("Angular codegen fixes", () => {
  describe("ComponentInstance attrs, events, slots", () => {
    it("renders attrs on component instances", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        attrs: [
          { name: "title", value: { kind: "Static", value: "Hello", loc }, binding: "normal", loc },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("<ink-card");
      expect(code).toContain('title="Hello"');
    });

    it("renders dynamic attrs with binding syntax", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Panel") as ts.Identifier,
        resolved: { module: null, name: "Panel" },
        attrs: [
          {
            name: "visible",
            value: createExpr({ expr: mockExpr("isOpen()") }),
            binding: "normal",
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("[visible]=");
    });

    it("renders events with Angular event syntax", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Button") as ts.Identifier,
        resolved: { module: null, name: "Button" },
        events: [
          {
            name: "onClick",
            handler: createExpr({ expr: mockExpr("() => handleClick()") }),
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("(click)=");
    });

    it("preserves camelCase for multi-word component @Output events", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Field") as ts.Identifier,
        resolved: { module: null, name: "Field" },
        events: [
          {
            name: "onValueChange",
            handler: createExpr({ expr: mockExpr("(v) => handle(v)") }),
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("(valueChange)=");
      expect(code).not.toContain("valuechange");
    });

    it("renders slot content", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Card") as ts.Identifier,
        resolved: { module: null, name: "Card" },
        slots: [
          {
            name: "default",
            body: createText({ value: "card body" }),
            scopedParams: [],
            loc,
          },
        ],
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      expect(code).toContain("card body");
      expect(code).toContain("</ink-card>");
    });

    it("emits a non-self-closing tag when no slots", () => {
      const ci = createComponentInstance({
        reference: mockExpr("Icon") as ts.Identifier,
        resolved: { module: null, name: "Icon" },
      });
      const comp = makeComp("Page", ci);
      const code = emitCode(comp);
      // Angular's JIT template parser mishandles self-closed component tags.
      expect(code).toContain("<ink-icon></ink-icon>");
    });
  });

  describe("Element refs", () => {
    it("emits template reference variable and viewChild declaration", () => {
      const render = createElement({
        tag: "input",
        refs: [
          {
            ref: createExpr({ expr: mockExpr("inputRef"), deps: DYNAMIC_DEPS }),
            category: "element",
            loc,
          },
        ],
      });
      const comp = makeComp("Form", render, {
        refs: [
          {
            name: "inputRef",
            symbolId: "t::ref::inputRef@0" as SymbolId,
            category: "element",
            elementType: "HTMLInputElement",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).toContain("#inputRef");
      expect(code).toContain("viewChild<ElementRef>('inputRef')");
      expect(code).toContain("viewChild");
    });

    it("unwraps an element ref read in an effect to `.nativeElement` for imperative DOM writes", () => {
      // The `viewChild<ElementRef>` signal returns the ElementRef wrapper; a `.current` read must
      // unwrap to `this.inputRef()?.nativeElement` so `el.indeterminate = …` lands on the real node
      // (the bug this change fixes — previously it mutated the wrapper, a silent no-op).
      const render = createElement({
        tag: "input",
        refs: [
          {
            ref: createExpr({ expr: mockExpr("inputRef"), deps: DYNAMIC_DEPS }),
            category: "element",
            loc,
          },
        ],
      });
      const comp = makeComp("Form", render, {
        refs: [
          {
            name: "inputRef",
            symbolId: "t::ref::inputRef@0" as SymbolId,
            category: "element",
            elementType: "HTMLInputElement",
            loc,
          },
        ],
        effects: [
          {
            body: mockExpr(
              "() => { const el = inputRef.current; if (el) { el.indeterminate = true; } }",
            ),
            deps: DYNAMIC_DEPS,
            cleanup: "absent",
            isDynamic: false,
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).toContain("const el = this.inputRef()?.nativeElement;");
    });

    it("does not unwrap a component ref (keeps the raw viewChild signal read)", () => {
      // A component ref (`category: "component"`) is not an ElementRef-wrapped DOM node, so its
      // `.current` read stays `this.childRef()` — no `.nativeElement` unwrap.
      const comp = makeComp("Wrapper", createElement({ tag: "div" }), {
        refs: [
          {
            name: "childRef",
            symbolId: "t::ref::childRef@0" as SymbolId,
            category: "component",
            loc,
          },
        ],
        effects: [
          {
            body: mockExpr("() => { console.log(childRef.current); }"),
            deps: DYNAMIC_DEPS,
            cleanup: "absent",
            isDynamic: false,
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).toContain("console.log(this.childRef())");
      expect(code).not.toContain("nativeElement");
    });
  });

  describe("multiple refs", () => {
    it("does not duplicate viewChild/ElementRef imports", () => {
      const render = createElement({
        tag: "div",
        children: [
          createElement({
            tag: "input",
            refs: [
              {
                ref: createExpr({ expr: mockExpr("inputRef"), deps: DYNAMIC_DEPS }),
                category: "element" as const,
                loc,
              },
            ],
          }),
          createElement({
            tag: "button",
            refs: [
              {
                ref: createExpr({ expr: mockExpr("buttonRef"), deps: DYNAMIC_DEPS }),
                category: "element" as const,
                loc,
              },
            ],
          }),
        ],
      });
      const comp = makeComp("Form", render, {
        refs: [
          {
            name: "inputRef",
            symbolId: "t::ref::inputRef@0" as SymbolId,
            category: "element",
            elementType: "HTMLInputElement",
            loc,
          },
          {
            name: "buttonRef",
            symbolId: "t::ref::buttonRef@0" as SymbolId,
            category: "element",
            elementType: "HTMLButtonElement",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      expect(code).not.toMatch(/viewChild.*viewChild.*viewChild/);
      expect(code).toContain("viewChild<ElementRef>('inputRef')");
      expect(code).toContain("viewChild<ElementRef>('buttonRef')");
    });
  });

  describe("multiple resources", () => {
    it("does not duplicate resource import", () => {
      const comp = makeComp("Data", createElement({ tag: "div" }), {
        resources: [
          {
            name: "users",
            fetcher: createExpr({ expr: mockExpr("() => fetchUsers()") }),
            symbolId: "t::signal::users@0" as SymbolId,
            loadingName: "loading",
            errorName: "error",
            refetchName: "refetch",
            loc,
          },
          {
            name: "posts",
            fetcher: createExpr({ expr: mockExpr("() => fetchPosts()") }),
            symbolId: "t::signal::posts@0" as SymbolId,
            loadingName: "loading",
            errorName: "error",
            refetchName: "refetch",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      // Resources lower to signal state + an async loader, so no `resource` symbol is imported.
      const importLine = code.split("\n").find((l) => l.includes("@angular/core"))!;
      expect(importLine).not.toContain("resource");
      expect(code).toContain("users = signal(undefined)");
      expect(code).toContain("posts = signal(undefined)");
    });
  });

  describe("resource handling", () => {
    it("lowers a resource to signal state plus an async loader", () => {
      const comp = makeComp("Data", createElement({ tag: "div" }), {
        resources: [
          {
            name: "data",
            fetcher: createExpr({ expr: mockExpr("() => fetchData()") }),
            symbolId: "t::signal::data@0" as SymbolId,
            loadingName: "loading",
            errorName: "error",
            refetchName: "refetch",
            loc,
          },
        ],
      });
      const code = emitCode(comp);
      // data/loading/error become reactive signal fields.
      expect(code).toContain("data = signal(undefined)");
      expect(code).toContain("loading = signal(true)");
      expect(code).toContain("error = signal(undefined)");
      // The async loader runs the fetcher and writes results into those signals.
      // `fetchData` is the resource fetcher (an external function), not a class signal, so it is
      // called plainly — no `this.` prefix (which would wrongly read it as a component member).
      expect(code).toContain("(() => fetchData())().then((d) => this.data.set(d))");
      expect(code).toContain(".catch((e) => this.error.set(e))");
      expect(code).toContain(".finally(() => this.loading.set(false))");
      // No `resource` runtime symbol is imported anymore.
      expect(code).not.toContain("resource({");
    });
  });
});

describe("angular conformance", () => {
  it("uses eslint with the angular plugin", () => {
    expect(angular.conformance).toBeDefined();
    const c = angular.conformance!;
    expect(c.lint.tool).toBe("eslint");
    expect(c.lint.config).toContain("angular.eslint.config.js");
    expect(c.typecheck.dtsImports).toContain("@angular/core");
    expect(runInvariants(c, { path: "X.ts", contents: "" })).toHaveLength(0);
    expect(runInvariants(c, { path: "X.tsx", contents: "" })).toHaveLength(1);
  });

  it("declares no control-flow imports", () => {
    expect(Object.keys(angular.conformance!.controlFlowImports)).toHaveLength(0);
  });
});

describe("angular emit + print", () => {
  it("Counter component", () => {
    const { fileName, code } = emitWithFile(angular, richComp("Counter", counterRender));
    expect(fileName).toBe("Counter.component.ts");
    expect(code).toMatchSnapshot();
  });

  it("output contains the @Component decorator", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("@Component");
  });

  it("output imports from @angular/core", () => {
    expect(emitCode(richComp("Counter", counterRender))).toContain("@angular/core");
  });

  it("props type generation", () => {
    const comp = richComp("Button", createElement({ tag: "div" }), { props: propsLabelDisabled() });
    expect(emitCode(comp)).toMatchSnapshot();
  });

  it("control flow: If emits @if/@else if", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("a()") }), body: createText({ value: "A" }) },
        { test: createExpr({ expr: mockExpr("b()") }), body: createText({ value: "B" }) },
      ],
      fallback: createText({ value: "fallback" }),
    });
    const code = emitCode(richComp("IfTest", createElement({ tag: "div", children: [ifNode] })));
    expect(code).toContain("@if");
    expect(code).toContain("@else if");
    expect(code).toContain("@else");
  });

  it("external import appears at the top of the file", () => {
    const code = emitWithCtx(
      angular,
      richComp("Test", createElement({ tag: "div" })),
      makeCtxWithExternalImport(angular),
    );
    expect(code).toContain('import { badge } from "virtual:styleframe";');
    expect(code.indexOf('"@angular/core"')).toBeLessThan(code.indexOf("virtual:styleframe"));
  });

  it("transition passes through to the child", () => {
    const code = emitCode(
      richComp("Fade", createElement({ tag: "div", children: [transitionWithIf] })),
    );
    expect(code).not.toContain("Transition");
    expect(code).toContain("@if");
    expect(code).toMatchSnapshot();
  });
});

describe("Angular additional branch coverage", () => {
  it("Switch with a fallback emits a trailing @else", () => {
    const sw = createSwitch({
      cases: [{ test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "X" }) }],
      fallback: createText({ value: "fallback" }),
    });
    const code = emitCode(makeComp("Sw", createElement({ tag: "div", children: [sw] })));
    expect(code).toContain("@else {");
    expect(code).toContain("fallback");
  });

  it("merges a class onto a component instance via [klass] under fallthrough", () => {
    const ci = createComponentInstance({
      reference: mockExpr("Card") as ts.Identifier,
      resolved: { module: null, name: "Card" },
      acceptsAttrFallthrough: true,
      attrs: [
        createAttribute({
          name: "class",
          value: createStaticValue({ value: "badge" }),
          binding: "class",
        }),
      ],
    });
    const code = emitCode(makeComp("Page", ci));
    expect(code).toContain("[klass]=");
  });

  it("emits a two-way model binding as a <prop>Change output", () => {
    const ci = createComponentInstance({
      reference: mockExpr("Field") as ts.Identifier,
      resolved: { module: null, name: "Field" },
      events: [
        {
          name: "update:value",
          twoWayProp: "value",
          handler: createExpr({ expr: mockExpr("(v) => set(v)") }),
          loc,
        },
      ],
    });
    const code = emitCode(makeComp("Page", ci));
    expect(code).toContain("(valueChange)=");
  });

  it("self-closes a void element that has no attributes", () => {
    const code = emitCode(makeComp("V", createElement({ tag: "br" })));
    expect(code).toContain("<br />");
  });

  it("a fallthrough root element merges its own class and forwards klass when it has none", () => {
    const withClass = emitCode(
      makeComp(
        "C",
        createElement({
          tag: "div",
          acceptsAttrFallthrough: true,
          attrs: [
            createAttribute({
              name: "class",
              value: createStaticValue({ value: "x" }),
              binding: "class",
            }),
          ],
          children: [createText({ value: "y" })],
        }),
      ),
    );
    expect(withClass).toContain("[class]=");
    const noClass = emitCode(
      makeComp(
        "C",
        createElement({
          tag: "div",
          acceptsAttrFallthrough: true,
          children: [createText({ value: "y" })],
        }),
      ),
    );
    expect(noClass).toContain('[class]="klass()"');
  });

  it("binds [klass] from a component-instance class even without fallthrough", () => {
    const ci = createComponentInstance({
      reference: mockExpr("Card") as ts.Identifier,
      resolved: { module: null, name: "Card" },
      attrs: [
        createAttribute({
          name: "class",
          value: createStaticValue({ value: "badge" }),
          binding: "class",
        }),
      ],
    });
    expect(emitCode(makeComp("Page", ci))).toContain("[klass]=");
  });

  it("For with an index binding tracks via $index", () => {
    const forNode: IRNode = {
      kind: "For",
      each: createExpr({ expr: mockExpr("items()") }),
      itemBinding: "item",
      indexBinding: "i",
      key: createExpr({ expr: mockExpr("item.id") }),
      syntheticKey: true,
      body: createText({ value: "row" }),
      loc,
    };
    const code = emitCode(makeComp("List", createElement({ tag: "ul", children: [forNode] })));
    expect(code).toContain("@for");
    expect(code).toContain("$index");
  });

  it("a real @if branch followed by a statically-true branch emits @else", () => {
    const ifNode = createIf({
      branches: [
        { test: createExpr({ expr: mockExpr("x()") }), body: createText({ value: "A" }) },
        { test: createExpr({ expr: mockExpr("true") }), body: createText({ value: "B" }) },
      ],
    });
    const code = emitCode(makeComp("If", createElement({ tag: "div", children: [ifNode] })));
    expect(code).toContain("@if (x())");
    expect(code).toContain("@else {");
  });

  it("an element with no attributes emits a bare tag", () => {
    const code = emitCode(
      makeComp("D", createElement({ tag: "div", children: [createText({ value: "hi" })] })),
    );
    expect(code).toContain("<div>");
    expect(code).not.toContain("<div ");
  });
});
