import { describe, it, expect } from "vitest";
import {
  cFile,
  cImport,
  cStmt,
  cExpr,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cTmplElement,
  cTmplDirective,
  cTmplAttr,
  cGroup,
  cIndent,
} from "./builders.ts";
import { walkCode } from "./visit.ts";
import type { Code } from "./nodes.ts";

describe("walkCode", () => {
  it("visits CScript children", () => {
    const stmt = cStmt({ body: "const x = 1;" });
    const script = { kind: "CScript" as const, lang: "ts" as const, setup: true, children: [stmt] };

    const kinds: string[] = [];
    walkCode(script, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CScript", "CStmt"]);
  });

  it("visits CFile children", () => {
    const stmt = cStmt({ body: "const x = 1;" });
    const file = cFile({ flavor: "tsx", children: [stmt] });

    const kinds: string[] = [];
    walkCode(file, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CFile", "CStmt"]);
  });

  it("visits CJsxElement attrs and children", () => {
    const attr = cJsxAttr({
      name: "id",
      value: { kind: "static", text: "x" },
    });
    const text = cJsxText({ text: "Hello" });
    const el = cJsxElement({ tag: "div", attrs: [attr], children: [text] });

    const kinds: string[] = [];
    walkCode(el, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CJsxElement", "CJsxAttr", "CJsxText"]);
  });

  it("visits CTmplElement directives, attrs, and children", () => {
    const dir = cTmplDirective({ directive: "v-if", expr: cExpr({ text: "show" }) });
    const attr = cTmplAttr({
      name: "class",
      value: { kind: "static", text: "btn" },
    });
    const el = cTmplElement({
      tag: "div",
      directives: [dir],
      attrs: [attr],
    });

    const kinds: string[] = [];
    walkCode(el, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CTmplElement", "CTmplDirective", "CTmplAttr"]);
  });

  it("visits CStmt CExpr body", () => {
    const expr = cExpr({ text: "x" });
    const stmt = cStmt({ body: expr });

    const kinds: string[] = [];
    walkCode(stmt, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CStmt", "CExpr"]);
  });

  it("does not descend into string CStmt body", () => {
    const stmt = cStmt({ body: "const x = 1;" });
    const kinds: string[] = [];
    walkCode(stmt, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CStmt"]);
  });

  it("visits CGroup children", () => {
    const stmt = cStmt({ body: "x" });
    const group = cGroup({ children: [stmt] });

    const kinds: string[] = [];
    walkCode(group, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CGroup", "CStmt"]);
  });

  it("visits CIndent children", () => {
    const stmt = cStmt({ body: "x" });
    const indent = cIndent({ children: [stmt] });

    const kinds: string[] = [];
    walkCode(indent, {
      enter: (n) => {
        kinds.push(n.kind);
      },
    });
    expect(kinds).toEqual(["CIndent", "CStmt"]);
  });

  it("skips children when enter returns false", () => {
    const stmt = cStmt({ body: cExpr({ text: "x" }) });
    const file = cFile({ flavor: "tsx", children: [stmt] });

    const kinds: string[] = [];
    walkCode(file, {
      enter: (n) => {
        kinds.push(n.kind);
        if (n.kind === "CStmt") return false;
      },
    });
    expect(kinds).toEqual(["CFile", "CStmt"]);
  });

  it("calls exit in reverse order", () => {
    const text = cJsxText({ text: "Hi" });
    const el = cJsxElement({ tag: "p", children: [text] });
    const file = cFile({ flavor: "tsx", children: [el] });

    const events: string[] = [];
    walkCode(file, {
      enter: (n) => {
        events.push(`enter:${n.kind}`);
      },
      exit: (n) => {
        events.push(`exit:${n.kind}`);
      },
    });
    expect(events).toEqual([
      "enter:CFile",
      "enter:CJsxElement",
      "enter:CJsxText",
      "exit:CJsxText",
      "exit:CJsxElement",
      "exit:CFile",
    ]);
  });

  it("passes parent to visitor", () => {
    const imp = cImport({ module: "react", named: [{ imported: "useState" }] });
    const file = cFile({ flavor: "tsx", children: [imp] });

    const parents: Array<Code | undefined> = [];
    walkCode(file, {
      enter: (_, parent) => {
        parents.push(parent);
      },
    });
    expect(parents[0]).toBeUndefined();
    expect(parents[1]).toBe(file);
  });

  it("handles leaf nodes: CImport, CExpr, CJsxText", () => {
    const nodes = [
      cImport({ module: "x", defaultLocal: "X" }),
      cExpr({ text: "x" }),
      cJsxText({ text: "hi" }),
    ];
    for (const node of nodes) {
      const kinds: string[] = [];
      walkCode(node, {
        enter: (n) => {
          kinds.push(n.kind);
        },
      });
      expect(kinds).toHaveLength(1);
    }
  });
});
