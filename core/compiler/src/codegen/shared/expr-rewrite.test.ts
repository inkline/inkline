import { describe, it, expect } from "vitest";
import * as ts from "typescript";
import type { RewriteRules } from "../context.ts";
import { rewriteExpr, rewriteEventName, rewriteAttrName } from "./expr-rewrite.ts";

function mockExpr(code: string): ts.Expression {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true);
  return (sf.statements[0] as ts.ExpressionStatement).expression;
}

// Every identifier these suites read as a zero-arg call is a reactive accessor (signal/memo), so
// they are declared as known reads — exactly as a target's emit() does via `reactiveReadNames()`.
// A name absent from this set (e.g. an imported recipe `recipe()`) is treated as a plain call.
const READS = new Set([
  "count",
  "other",
  "a",
  "b",
  "c",
  "ok",
  "yes",
  "no",
  "idx",
  "x",
  "name",
  "items",
  "val",
]);

const STRIP: RewriteRules = {
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  reactiveReads: READS,
};

const PRESERVE: RewriteRules = {
  reactiveRead: { kind: "preserve-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  reactiveReads: READS,
};

const FIELD: RewriteRules = {
  reactiveRead: { kind: "field-access", field: "value" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  reactiveReads: READS,
};

describe("rewriteExpr", () => {
  describe("reactiveRead modes — zero-arg identifier call", () => {
    it("strip-call: count() → count", () => {
      expect(rewriteExpr(mockExpr("count()"), STRIP)).toBe("count");
    });

    it("preserve-call: count() → count()", () => {
      expect(rewriteExpr(mockExpr("count()"), PRESERVE)).toBe("count()");
    });

    it("field-access: count() → count.value", () => {
      expect(rewriteExpr(mockExpr("count()"), FIELD)).toBe("count.value");
    });
  });

  describe("compound expressions under each mode", () => {
    it("strip-call: count() * 2 + other()", () => {
      const result = rewriteExpr(mockExpr("count() * 2 + other()"), STRIP);
      expect(result).toBe("count * 2 + other");
    });

    it("preserve-call: count() * 2 + other()", () => {
      const result = rewriteExpr(mockExpr("count() * 2 + other()"), PRESERVE);
      expect(result).toBe("count() * 2 + other()");
    });

    it("field-access: count() * 2 + other()", () => {
      const result = rewriteExpr(mockExpr("count() * 2 + other()"), FIELD);
      expect(result).toBe("count.value * 2 + other.value");
    });
  });

  describe("zero-arg call gating — only known reactive accessors are reactive reads", () => {
    it("strip-call: an unknown zero-arg call keeps its call (e.g. an imported recipe)", () => {
      expect(rewriteExpr(mockExpr("recipe()"), STRIP)).toBe("recipe()");
    });

    it("preserve-call: an unknown zero-arg call keeps its call", () => {
      expect(rewriteExpr(mockExpr("recipe()"), PRESERVE)).toBe("recipe()");
    });

    it("field-access: an unknown zero-arg call keeps its call (no .value)", () => {
      expect(rewriteExpr(mockExpr("recipe()"), FIELD)).toBe("recipe()");
    });

    it("strip-call: a known accessor is stripped while an unknown call is preserved", () => {
      expect(rewriteExpr(mockExpr("count() + recipe()"), STRIP)).toBe("count + recipe()");
    });
  });

  describe("expression types", () => {
    it("binary expression preserves operator", () => {
      expect(rewriteExpr(mockExpr("a() + b()"), STRIP)).toBe("a + b");
      expect(rewriteExpr(mockExpr("a() - b()"), STRIP)).toBe("a - b");
      expect(rewriteExpr(mockExpr("a() === b()"), STRIP)).toBe("a === b");
    });

    it("conditional expression", () => {
      expect(rewriteExpr(mockExpr("ok() ? yes() : no()"), STRIP)).toBe("ok ? yes : no");
    });

    it("property access", () => {
      expect(rewriteExpr(mockExpr("obj.prop"), STRIP)).toBe("obj.prop");
    });

    it("property access with optional chaining", () => {
      expect(rewriteExpr(mockExpr("obj?.prop"), STRIP)).toBe("obj?.prop");
    });

    it("element access", () => {
      expect(rewriteExpr(mockExpr("arr[idx()]"), STRIP)).toBe("arr[idx]");
    });

    it("element access with optional chaining", () => {
      expect(rewriteExpr(mockExpr("arr?.[idx()]"), STRIP)).toBe("arr?.[idx]");
    });

    it("arrow function — single param, no type", () => {
      expect(rewriteExpr(mockExpr("x => x()"), STRIP)).toBe("x => x");
    });

    it("arrow function — multiple params or typed", () => {
      const result = rewriteExpr(mockExpr("(x: number, y: number) => x + y"), STRIP);
      expect(result).toBe("(x: number, y: number) => x + y");
    });

    it("arrow function — block body", () => {
      const result = rewriteExpr(mockExpr("x => { return x(); }"), STRIP);
      expect(result).toBe("x => { return x; }");
    });

    it("function expression", () => {
      const result = rewriteExpr(mockExpr("(function foo(x) { return x; })"), STRIP);
      expect(result).toBe("(function foo(x) { return x; })");
    });

    it("parenthesized expression", () => {
      expect(rewriteExpr(mockExpr("(a() + b())"), STRIP)).toBe("(a + b)");
    });

    it("prefix unary", () => {
      expect(rewriteExpr(mockExpr("!ok()"), STRIP)).toBe("!ok");
    });

    it("postfix unary", () => {
      expect(rewriteExpr(mockExpr("i++"), STRIP)).toBe("i++");
    });

    it("template expression", () => {
      const result = rewriteExpr(mockExpr("`hello ${name()}`"), STRIP);
      expect(result).toBe("`hello ${name}`");
    });

    it("array literal", () => {
      expect(rewriteExpr(mockExpr("[a(), b(), c()]"), STRIP)).toBe("[a, b, c]");
    });

    it("non-null assertion", () => {
      expect(rewriteExpr(mockExpr("val()!"), STRIP)).toBe("val!");
    });

    it("spread element", () => {
      expect(rewriteExpr(mockExpr("[...items()]"), STRIP)).toBe("[...items]");
    });

    it("as expression strips type assertion", () => {
      expect(rewriteExpr(mockExpr("val() as string"), STRIP)).toBe("val");
    });

    it("call with arguments — callee not subject to strip", () => {
      expect(rewriteExpr(mockExpr("fn(a(), b())"), STRIP)).toBe("fn(a, b)");
    });

    it("optional call", () => {
      expect(rewriteExpr(mockExpr("fn?.(a())"), STRIP)).toBe("fn?.(a)");
    });
  });

  describe("walkBlock via arrow-with-block", () => {
    it("return statement", () => {
      const result = rewriteExpr(mockExpr("() => { return count(); }"), STRIP);
      expect(result).toBe("() => { return count; }");
    });

    it("expression statement", () => {
      const result = rewriteExpr(mockExpr("() => { setCount(count()); }"), STRIP);
      expect(result).toBe("() => { setCount(count); }");
    });

    it("variable statement (const)", () => {
      const result = rewriteExpr(mockExpr("() => { const x = count(); }"), STRIP);
      expect(result).toBe("() => { const x = count; }");
    });

    it("variable statement (let)", () => {
      const result = rewriteExpr(mockExpr("() => { let x = count(); }"), STRIP);
      expect(result).toBe("() => { let x = count; }");
    });

    it("empty block", () => {
      const result = rewriteExpr(mockExpr("() => {}"), STRIP);
      expect(result).toBe("() => {}");
    });

    it("bare return", () => {
      const result = rewriteExpr(mockExpr("() => { return; }"), STRIP);
      expect(result).toBe("() => { return; }");
    });
  });
});

describe("rewriteEventName", () => {
  const camel: RewriteRules = { ...STRIP, eventNameCase: "camel" };
  const kebab: RewriteRules = { ...STRIP, eventNameCase: "kebab" };
  const lower: RewriteRules = { ...STRIP, eventNameCase: "lower" };

  it("camel: onClick → onClick", () => {
    expect(rewriteEventName("onClick", camel)).toBe("onClick");
  });

  it("camel: onMouseDown → onMouseDown", () => {
    expect(rewriteEventName("onMouseDown", camel)).toBe("onMouseDown");
  });

  it("kebab: onClick → @click", () => {
    expect(rewriteEventName("onClick", kebab)).toBe("@click");
  });

  it("kebab: onMouseDown → @mouse-down", () => {
    expect(rewriteEventName("onMouseDown", kebab)).toBe("@mouse-down");
  });

  it("lower: onClick → onclick", () => {
    expect(rewriteEventName("onClick", lower)).toBe("onclick");
  });

  it("lower: onMouseDown → onmousedown", () => {
    expect(rewriteEventName("onMouseDown", lower)).toBe("onmousedown");
  });

  it("a name without the `on` prefix is used as-is", () => {
    expect(rewriteEventName("Click", camel)).toBe("onClick");
  });

  it("lower: a component callback keeps its camelCase (isComponent=true)", () => {
    expect(rewriteEventName("onValueChange", lower, true)).toBe("onValueChange");
  });
});

describe("rewriteAttrName", () => {
  const html: RewriteRules = { ...STRIP, jsxAttrCasing: "html" };
  const react: RewriteRules = { ...STRIP, jsxAttrCasing: "react" };

  it("html: className → class", () => {
    expect(rewriteAttrName("className", html)).toBe("class");
  });

  it("html: htmlFor → for", () => {
    expect(rewriteAttrName("htmlFor", html)).toBe("for");
  });

  it("html: unknown passes through", () => {
    expect(rewriteAttrName("id", html)).toBe("id");
  });

  it("react: class → className", () => {
    expect(rewriteAttrName("class", react)).toBe("className");
  });

  it("react: for → htmlFor", () => {
    expect(rewriteAttrName("for", react)).toBe("htmlFor");
  });

  it("react: readonly → readOnly", () => {
    expect(rewriteAttrName("readonly", react)).toBe("readOnly");
  });

  it("html: readonly passes through", () => {
    expect(rewriteAttrName("readonly", html)).toBe("readonly");
  });

  it("react: unknown passes through", () => {
    expect(rewriteAttrName("id", react)).toBe("id");
  });

  it("no casing rule: passes through unchanged", () => {
    const none = { ...STRIP, jsxAttrCasing: undefined } as unknown as RewriteRules;
    expect(rewriteAttrName("className", none)).toBe("className");
  });

  // On a custom component instance the React DOM canonicalisation must not fire — the child's prop
  // interface uses the HTML-native lowercase name, so a renamed key would silently never arrive.
  it("react component: readonly stays readonly", () => {
    expect(rewriteAttrName("readonly", react, true)).toBe("readonly");
  });

  it("react component: for stays for", () => {
    expect(rewriteAttrName("for", react, true)).toBe("for");
  });

  it("react component: class → className is preserved (deliberate exception)", () => {
    expect(rewriteAttrName("class", react, true)).toBe("className");
  });

  it("react component: unknown passes through", () => {
    expect(rewriteAttrName("id", react, true)).toBe("id");
  });
});

describe("rewriteExpr — additional expression forms", () => {
  it("object literal: property, spread, and shorthand members", () => {
    const result = rewriteExpr(mockExpr("({ a: count(), ...other, b })"), STRIP);
    expect(result).toContain("a: count");
    expect(result).toContain("...other");
    expect(result).toContain("b");
  });

  it("array literal with a spread element", () => {
    expect(rewriteExpr(mockExpr("[count(), ...items()]"), STRIP)).toBe("[count, ...items]");
  });

  it("non-null assertion", () => {
    expect(rewriteExpr(mockExpr("count()!"), STRIP)).toBe("count!");
  });

  it("`as` assertion unwraps to the inner expression", () => {
    expect(rewriteExpr(mockExpr("count() as number"), STRIP)).toBe("count");
  });

  it("if/else statement inside an arrow block", () => {
    const result = rewriteExpr(
      mockExpr("() => { if (ok()) { setCount(count()); } else { setCount(other()); } }"),
      STRIP,
    );
    expect(result).toContain("if (ok)");
    expect(result).toContain("else");
    expect(result).toContain("setCount(count)");
  });

  it("for-of statement inside an arrow block", () => {
    const result = rewriteExpr(
      mockExpr("() => { for (const i of items()) { setCount(i); } }"),
      STRIP,
    );
    expect(result).toContain("for (const i of items)");
  });
});
