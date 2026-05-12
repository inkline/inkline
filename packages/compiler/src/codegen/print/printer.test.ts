import { describe, it, expect } from "vitest";
import { print } from "./printer.ts";
import {
  cFile,
  cScript,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cTmplElement,
  cTmplDirective,
  cTmplAttr,
  cTmplText,
  cTmplMustache,
  cGroup,
  cIndent,
} from "../code-ir/builders.ts";

describe("print", () => {
  it("prints a simple CFile with statements", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cStmt({ body: "const x = 1;" }), cStmt({ body: "const y = 2;" })],
    });
    const { code } = print(file);
    expect(code).toBe("const x = 1;\nconst y = 2;\n");
  });

  it("prints CImport with named imports", () => {
    const file = cFile({
      flavor: "tsx",
      children: [
        cImport({ module: "react", named: [{ imported: "useState" }, { imported: "useEffect" }] }),
      ],
    });
    const { code } = print(file);
    expect(code).toBe('import { useState, useEffect } from "react";\n');
  });

  it("prints CImport with default import", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cImport({ module: "react", defaultLocal: "React" })],
    });
    const { code } = print(file);
    expect(code).toBe('import React from "react";\n');
  });

  it("prints CImport with default and named", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cImport({ module: "react", defaultLocal: "React", named: [{ imported: "FC" }] })],
    });
    const { code } = print(file);
    expect(code).toBe('import React, { FC } from "react";\n');
  });

  it("prints CImport with alias", () => {
    const file = cFile({
      flavor: "tsx",
      children: [
        cImport({
          module: "react",
          named: [{ imported: "useState", local: "useCount" }],
        }),
      ],
    });
    const { code } = print(file);
    expect(code).toBe('import { useState as useCount } from "react";\n');
  });

  it("prints CImport type-only", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cImport({ module: "react", named: [{ imported: "FC" }], typeOnly: true })],
    });
    const { code } = print(file);
    expect(code).toBe('import type { FC } from "react";\n');
  });

  it("prints CStmt with CExpr body and semicolon", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cStmt({ body: cExpr({ text: "console.log('hi')" }) })],
    });
    const { code } = print(file);
    expect(code).toBe("console.log('hi');\n");
  });

  it("prints CRaw verbatim", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cRaw({ text: '"use client";' })],
    });
    const { code } = print(file);
    expect(code).toBe('"use client";\n');
  });

  it("prints CRaw with embedded newlines", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cRaw({ text: "// line 1\n// line 2" })],
    });
    const { code } = print(file);
    expect(code).toBe("// line 1\n// line 2\n");
  });

  it("prints CJsxElement with children", () => {
    const el = cJsxElement({
      tag: "div",
      children: [cJsxText({ text: "Hello" })],
    });
    const { code } = print(el);
    expect(code).toBe("<div>\n  Hello\n</div>\n");
  });

  it("prints CJsxElement self-closing", () => {
    const el = cJsxElement({ tag: "br", selfClose: true });
    const { code } = print(el);
    expect(code).toBe("<br />\n");
  });

  it("prints CJsxElement with attrs", () => {
    const el = cJsxElement({
      tag: "button",
      attrs: [
        cJsxAttr({ name: "className", value: { kind: "static", text: "btn" } }),
        cJsxAttr({ name: "disabled", value: { kind: "boolean" } }),
        cJsxAttr({
          name: "onClick",
          value: { kind: "expr", expr: cExpr({ text: "handleClick" }) },
        }),
      ],
      children: [cJsxText({ text: "Click" })],
    });
    const { code } = print(el);
    expect(code).toBe(
      '<button className="btn" disabled onClick={handleClick}>\n  Click\n</button>\n',
    );
  });

  it("prints empty CJsxElement", () => {
    const el = cJsxElement({ tag: "div" });
    const { code } = print(el);
    expect(code).toBe("<div></div>\n");
  });

  it("prints CScript", () => {
    const script = cScript({
      setup: true,
      children: [
        cImport({ module: "vue", named: [{ imported: "ref" }] }),
        cStmt({ body: "const count = ref(0);" }),
      ],
    });
    const { code } = print(script);
    expect(code).toBe(
      '<script setup lang="ts">\n' +
        '  import { ref } from "vue";\n' +
        "  const count = ref(0);\n" +
        "</script>\n",
    );
  });

  it("prints CTmplElement with directives and attrs", () => {
    const el = cTmplElement({
      tag: "div",
      directives: [
        cTmplDirective({
          directive: "v-if",
          expr: cExpr({ text: "show" }),
        }),
      ],
      attrs: [
        cTmplAttr({
          name: "class",
          value: { kind: "static", text: "container" },
        }),
      ],
      children: [cTmplText({ text: "Hello" })],
    });
    const { code } = print(el);
    expect(code).toBe('<div v-if="show" class="container">\n  Hello\n</div>\n');
  });

  it("prints CTmplMustache", () => {
    const m = cTmplMustache({ expr: cExpr({ text: "count" }) });
    const { code } = print(m);
    expect(code).toBe("{{ count }}");
  });

  it("prints CTmplDirective with arg and modifier", () => {
    const dir = cTmplDirective({
      directive: "v-on",
      arg: "click",
      modifier: ["prevent"],
      expr: cExpr({ text: "handler" }),
    });
    const { code } = print(dir);
    expect(code).toBe('v-on:click.prevent="handler"');
  });

  it("prints CIndent increases depth", () => {
    const indent = cIndent({
      children: [cStmt({ body: "x = 1;" })],
    });
    const { code } = print(indent);
    expect(code).toBe("  x = 1;\n");
  });

  it("prints CGroup inline", () => {
    const group = cGroup({
      fit: true,
      children: [cRaw({ text: "a" }), cRaw({ text: " + " }), cRaw({ text: "b" })],
    });
    const { code } = print(group);
    expect(code).toBe("a + b");
  });

  it("respects custom indent size", () => {
    const el = cJsxElement({
      tag: "div",
      children: [cJsxText({ text: "Hi" })],
    });
    const { code } = print(el, { indent: 4 });
    expect(code).toBe("<div>\n    Hi\n</div>\n");
  });

  it("respects custom newline", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cStmt({ body: "x;" })],
    });
    const { code } = print(file, { newline: "\r\n" });
    expect(code).toBe("x;\r\n");
  });

  it("generates external source map", () => {
    const loc = { file: "test.tsx", line: 1, column: 1, offset: 0, length: 5 };
    const file = cFile({
      flavor: "tsx",
      children: [cStmt({ body: "const x = 1;", span: loc })],
    });
    const result = print(file, { sourceMap: "external" });

    expect(result.code).toBe("const x = 1;\n");
    expect(result.map).toBeDefined();
    const map = JSON.parse(result.map!);
    expect(map.version).toBe(3);
    expect(map.sources).toContain("test.tsx");
  });

  it("generates inline source map", () => {
    const loc = { file: "test.tsx", line: 1, column: 1, offset: 0, length: 5 };
    const file = cFile({
      flavor: "tsx",
      children: [cStmt({ body: "const x = 1;", span: loc })],
    });
    const result = print(file, { sourceMap: "inline" });

    expect(result.map).toBeUndefined();
    expect(result.code).toContain("//# sourceMappingURL=data:application/json;base64,");
  });

  it("omits source map when mode is none", () => {
    const file = cFile({
      flavor: "tsx",
      children: [cStmt({ body: "x;" })],
    });
    const result = print(file);
    expect(result.map).toBeUndefined();
  });

  it("handles nested JSX elements", () => {
    const inner = cJsxElement({
      tag: "span",
      children: [cJsxText({ text: "text" })],
    });
    const outer = cJsxElement({
      tag: "div",
      children: [inner],
    });
    const { code } = print(outer);
    expect(code).toBe("<div>\n" + "  <span>\n" + "    text\n" + "  </span>\n" + "</div>\n");
  });

  it("handles preserve-newline-before hint", () => {
    const file = cFile({
      flavor: "tsx",
      children: [
        cStmt({ body: "a;" }),
        { ...cStmt({ body: "b;" }), hints: ["preserve-newline-before"] },
      ],
    });
    const { code } = print(file);
    expect(code).toBe("a;\n\nb;\n");
  });
});
