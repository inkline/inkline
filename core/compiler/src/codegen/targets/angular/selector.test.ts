import { describe, it, expect } from "vitest";
import { angularSelector, angularAttrSelector, angularElementSelector } from "./selector.ts";

describe("angularSelector", () => {
  it("derives a kebab-case ink-* element selector, folding a leading I into the prefix", () => {
    expect(angularSelector("IBadge")).toBe("ink-badge");
    expect(angularSelector("IInputControlBase")).toBe("ink-input-control-base");
    expect(angularSelector("Label")).toBe("ink-label");
  });
});

describe("angularAttrSelector", () => {
  it("derives a camelCase ink* attribute selector, folding a leading I into the prefix", () => {
    expect(angularAttrSelector("IButtonBase")).toBe("inkButtonBase");
    expect(angularAttrSelector("IBadge")).toBe("inkBadge");
    expect(angularAttrSelector("IInputControlBase")).toBe("inkInputControlBase");
    expect(angularAttrSelector("Label")).toBe("inkLabel");
  });
});

describe("angularElementSelector", () => {
  it("combines a native tag with an attribute selector", () => {
    expect(angularElementSelector("button", "inkButtonBase")).toBe("button[inkButtonBase]");
    expect(angularElementSelector("div", "inkFieldGroup")).toBe("div[inkFieldGroup]");
  });
});
