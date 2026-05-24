import { describe, it, expect } from "vitest";
import {
  BANNER,
  assertIdentifier,
  buildSlotRender,
  getSlotImports,
  isScoped,
  mergeSlots,
  serializeArgs,
  toKebabCase,
} from "./shared.ts";

describe("BANNER", () => {
  it("marks files as generated and points at the source", () => {
    expect(BANNER).toContain("AUTO-GENERATED");
    expect(BANNER).toContain("ui/components/stories/");
  });
});

describe("assertIdentifier", () => {
  it("accepts valid identifiers", () => {
    expect(() => assertIdentifier("Button", "component")).not.toThrow();
    expect(() => assertIdentifier("_Default$1", "story")).not.toThrow();
  });

  it("rejects invalid identifiers with a labelled message", () => {
    expect(() => assertIdentifier("My-Comp", "component")).toThrow(
      /Invalid component "My-Comp": must be a valid JavaScript identifier\./,
    );
    expect(() => assertIdentifier("1st", "story name")).toThrow(/Invalid story name/);
    expect(() => assertIdentifier("", "component")).toThrow(/Invalid component/);
  });
});

describe("serializeArgs", () => {
  it("produces compact deterministic JSON", () => {
    expect(serializeArgs({ label: "Hi", disabled: true })).toBe('{"label":"Hi","disabled":true}');
  });
});

describe("isScoped", () => {
  it("returns false for a string slot value", () => {
    expect(isScoped("Click me")).toBe(false);
  });

  it("returns true for a scoped slot object", () => {
    expect(isScoped({ params: ["item"], content: "item.label" })).toBe(true);
  });
});

describe("mergeSlots", () => {
  it("returns undefined when both are undefined", () => {
    expect(mergeSlots(undefined, undefined)).toBeUndefined();
  });

  it("returns meta slots when story has none", () => {
    const meta = { default: "text" };
    expect(mergeSlots(meta, undefined)).toBe(meta);
  });

  it("returns story slots when meta has none", () => {
    const story = { default: "text" };
    expect(mergeSlots(undefined, story)).toBe(story);
  });

  it("merges with story overriding meta for same-named slots", () => {
    const meta = { default: "meta", header: "meta header" };
    const story = { default: "story" };
    expect(mergeSlots(meta, story)).toEqual({
      default: "story",
      header: "meta header",
    });
  });
});

describe("toKebabCase", () => {
  it("converts PascalCase to kebab-case", () => {
    expect(toKebabCase("IBadge")).toBe("i-badge");
    expect(toKebabCase("IButton")).toBe("i-button");
    expect(toKebabCase("Card")).toBe("card");
    expect(toKebabCase("ListItem")).toBe("list-item");
  });
});

describe("getSlotImports", () => {
  it("returns createElement import for react", () => {
    expect(getSlotImports("react")).toEqual(['import { createElement } from "react";']);
  });

  it("returns h import for vue", () => {
    expect(getSlotImports("vue")).toEqual(['import { h } from "vue";']);
  });

  it("returns empty for unsupported targets", () => {
    expect(getSlotImports("svelte")).toEqual([]);
  });
});

describe("buildSlotRender", () => {
  it("builds React render with default slot", () => {
    const render = buildSlotRender("Button", { default: "Click me" }, "react");
    expect(render).toBe('(args) => createElement(Button, args, "Click me")');
  });

  it("builds React render with named slot as renderProp", () => {
    const render = buildSlotRender("Card", { header: "Title" }, "react");
    expect(render).toBe('(args) => createElement(Card, { ...args, renderHeader: () => "Title" })');
  });

  it("builds React render with default and named slots", () => {
    const render = buildSlotRender("Card", { default: "Body", header: "Title" }, "react");
    expect(render).toContain('renderHeader: () => "Title"');
    expect(render).toContain(', "Body")');
  });

  it("builds React render with scoped default slot as renderDefault", () => {
    const render = buildSlotRender(
      "List",
      { default: { params: ["item"], content: "item.label" } },
      "react",
    );
    expect(render).toContain("renderDefault: (item) => item.label");
    expect(render).not.toContain(', "');
  });

  it("builds React render with scoped named slot", () => {
    const render = buildSlotRender(
      "List",
      { item: { params: ["item", "index"], content: "`${index}: ${item.label}`" } },
      "react",
    );
    expect(render).toContain("renderItem: (item, index) => `${index}: ${item.label}`");
  });

  it("builds Vue render with default slot", () => {
    const render = buildSlotRender("Button", { default: "Click me" }, "vue");
    expect(render).toBe('(args) => h(Button, args, { default: () => "Click me" })');
  });

  it("builds Vue render with named slots", () => {
    const render = buildSlotRender("Card", { default: "Body", header: "Title" }, "vue");
    expect(render).toContain('default: () => "Body"');
    expect(render).toContain('header: () => "Title"');
  });

  it("builds Vue render with scoped slot using destructured params", () => {
    const render = buildSlotRender(
      "List",
      { item: { params: ["item", "index"], content: "item.label" } },
      "vue",
    );
    expect(render).toContain("item: ({ item, index }) => item.label");
  });

  it("builds Solid render with createComponent + mergeProps", () => {
    const render = buildSlotRender("Button", { default: "Click me" }, "solid");
    expect(render).toContain("createComponent(Button, mergeProps(args,");
    expect(render).toContain('children: "Click me"');
  });

  it("builds Angular render with template and argsToTemplate", () => {
    const render = buildSlotRender("IBadge", { default: "Badge text" }, "angular");
    expect(render).toContain("argsToTemplate(args)");
    expect(render).toContain("<i-badge ");
    expect(render).toContain("Badge text");
    expect(render).toContain("</i-badge>");
  });

  it("builds Angular render with named slots as ng-container", () => {
    const render = buildSlotRender("ICard", { default: "Body", header: "Title" }, "angular");
    expect(render).toContain('<ng-container slot="header">Title</ng-container>');
    expect(render).toContain("Body");
  });

  it("returns null for unsupported targets", () => {
    expect(buildSlotRender("Button", { default: "text" }, "svelte")).toBeNull();
    expect(buildSlotRender("Button", { default: "text" }, "astro")).toBeNull();
  });
});
