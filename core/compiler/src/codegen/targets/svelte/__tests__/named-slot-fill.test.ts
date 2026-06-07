// Svelte: filling a child component's named slot with JSX content must emit a structural named
// {#snippet}, not a text interpolation (UXF-12, #459).
import { describe, it, expect } from "vitest";
import { compileToFiles } from "../../../../testing/codegen.ts";

// NamedSlotFill emits a child (IButton) and the parent that fills the named slot; assert the parent.
async function parentOutput(): Promise<string> {
  const files = await compileToFiles("NamedSlotFill", "svelte");
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
  it("emits a named {#snippet} with structural content, not a mustache", async () => {
    const out = await parentOutput();
    expect(out).toContain("{#snippet icon()}");
    expect(out).toContain("<span>");
    expect(out).not.toContain("{<span");
  });
});
