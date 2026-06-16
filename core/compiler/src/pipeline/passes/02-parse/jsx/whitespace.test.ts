import { describe, it, expect } from "vitest";
import { cleanJsxText } from "./whitespace.ts";

describe("cleanJsxText", () => {
  it("keeps single-line text unchanged", () => {
    expect(cleanJsxText("hello")).toBe("hello");
  });

  it("preserves a meaningful trailing space on a single line", () => {
    // `<p>Hello, {name}</p>` — the space after the comma must survive.
    expect(cleanJsxText("Hello, ")).toBe("Hello, ");
  });

  it("preserves a meaningful leading space", () => {
    // `<p>{count} characters</p>` — the space before "characters" must survive.
    expect(cleanJsxText(" characters")).toBe(" characters");
  });

  it("drops pure newline + indent formatting whitespace (between elements)", () => {
    expect(cleanJsxText("\n      ")).toBe("");
    expect(cleanJsxText("\n  \n  ")).toBe("");
  });

  it("trims the newline-touching edges of content text", () => {
    expect(cleanJsxText("\n  Hello,\n  ")).toBe("Hello,");
    expect(cleanJsxText("\n  hi\n")).toBe("hi");
  });

  it("joins multiple non-empty lines with a single space", () => {
    expect(cleanJsxText("a\nb")).toBe("a b");
  });

  it("keeps an inline whitespace-only run (no newline)", () => {
    expect(cleanJsxText(" ")).toBe(" ");
    expect(cleanJsxText("   ")).toBe("   ");
  });

  it("converts tabs to spaces", () => {
    expect(cleanJsxText("a\tb")).toBe("a b");
  });
});
