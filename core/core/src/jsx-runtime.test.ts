import { describe, it, expect } from "vitest";
import { jsx, jsxs, Fragment } from "./jsx-runtime.ts";

describe("jsx", () => {
  it("wraps type and props into an element record", () => {
    expect(jsx("div", { id: "a" })).toEqual({ type: "div", props: { id: "a" } });
  });

  it("ignores the optional key argument", () => {
    expect(jsx("div", { id: "a" }, "key-1")).toEqual({ type: "div", props: { id: "a" } });
  });
});

describe("jsxs", () => {
  it("wraps type and props for multi-child elements", () => {
    const props = { children: ["x", "y"] };
    expect(jsxs("ul", props)).toEqual({ type: "ul", props });
  });

  it("ignores the optional key argument", () => {
    expect(jsxs("ul", { children: [] }, "key-2")).toEqual({ type: "ul", props: { children: [] } });
  });
});

describe("Fragment", () => {
  it("is the shared registered inkline fragment symbol", () => {
    expect(Fragment).toBe(Symbol.for("inkline.fragment"));
  });
});
