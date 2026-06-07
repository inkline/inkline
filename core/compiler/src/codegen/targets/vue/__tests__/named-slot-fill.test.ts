// Vue: filling a child component's named slot with JSX content (`<IButton icon={<span>★</span>}>`)
// must emit structural slot content (`<template #icon>`), not a text interpolation (UXF-12, #459).
import { describe, it, expect } from "vitest";
import { compileToFiles } from "../../../../testing/codegen.ts";

// NamedSlotFill emits a child (IButton) and the parent that fills the named slot; assert the parent.
async function parentOutput(): Promise<string> {
  const files = await compileToFiles("NamedSlotFill", "vue");
  return (
    files.find(
      (f) =>
        f.includes("template #icon") ||
        f.includes("IButton.icon") ||
        f.includes("snippet icon") ||
        f.includes('slot="icon"'),
    ) ?? files[files.length - 1]!
  );
}

describe("UXF-12: JSX-valued named-slot fills", () => {
  it("emits <template #icon> with structural content, not a mustache", async () => {
    const out = await parentOutput();
    expect(out).toContain("<template #icon>");
    expect(out).toContain("<span>");
    expect(out).toContain("★");
    // The regression: JSX wrapped in a text interpolation.
    expect(out).not.toContain("{{ <span");
    expect(out).not.toMatch(/\{\{\s*<\/?span/);
  });

  it('re-projection (`icon={<Slot name="icon"/>}`) emits a nested <slot>', async () => {
    const out = await parentOutput();
    expect(out).toContain('<slot name="icon"');
    expect(out).not.toMatch(/\{\{\s*<Slot/);
  });
});
