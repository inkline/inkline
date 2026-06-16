import { describe, it, expect } from "vitest";
import { childrenArePhrasing } from "./phrasing.ts";
import type { IRNode } from "../../ir/render/nodes.ts";

const node = (kind: string): IRNode => ({ kind }) as unknown as IRNode;

describe("childrenArePhrasing", () => {
  it("is true when a Text child is present", () => {
    expect(childrenArePhrasing([node("Element"), node("Text")])).toBe(true);
  });

  it("is true when an Expression child is present", () => {
    expect(childrenArePhrasing([node("Expression")])).toBe(true);
  });

  it("is false for element-only children", () => {
    expect(childrenArePhrasing([node("Element"), node("ComponentInstance")])).toBe(false);
  });

  it("is false for no children", () => {
    expect(childrenArePhrasing([])).toBe(false);
  });
});
