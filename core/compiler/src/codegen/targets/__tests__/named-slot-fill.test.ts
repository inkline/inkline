import { describe, it, expect } from "vitest";
import { compileFixture } from "../../../testing/harness.ts";
import type { TargetName } from "../../context.ts";

async function code(fixture: string, target: TargetName): Promise<string> {
  const result = await compileFixture(fixture, [target]);
  const files = result.files[target];
  expect(files, `${fixture} should produce ${target} output`).toBeDefined();
  // NamedSlotFill defines both a child (IButton) and the parent; the parent file is the
  // one filling the named slot.
  const parent = files!.find(
    (f) =>
      f.contents.includes("template #icon") ||
      f.contents.includes("IButton.icon") ||
      f.contents.includes("snippet icon") ||
      f.contents.includes('slot="icon"'),
  );
  return (parent ?? files![files!.length - 1]!).contents;
}

// ---------------------------------------------------------------------------
// UXF-12: filling a child component's named slot with JSX content
// (`<IButton icon={<span>★</span>}>`) must emit structural slot content, not a
// text interpolation. The bug surfaced on Vue (`{{ <span>★</span> }}`) but the
// root cause — keeping the fill as an opaque Expression IR node — affected every
// template target. Fixed by decomposing the JSX in the slots lowering pass so all
// targets receive real render nodes.
// ---------------------------------------------------------------------------
describe("UXF-12: JSX-valued named-slot fills", () => {
  it("Vue: emits <template #icon> with structural content, not a mustache", async () => {
    const out = await code("NamedSlotFill", "vue");
    expect(out).toContain("<template #icon>");
    expect(out).toContain("<span>");
    expect(out).toContain("★");
    // The regression: JSX wrapped in a text interpolation.
    expect(out).not.toContain("{{ <span");
    expect(out).not.toMatch(/\{\{\s*<\/?span/);
  });

  it('Vue: re-projection (`icon={<Slot name="icon"/>}`) emits a nested <slot>', async () => {
    const out = await code("NamedSlotFill", "vue");
    expect(out).toContain('<slot name="icon"');
    expect(out).not.toMatch(/\{\{\s*<Slot/);
  });

  it("Svelte: emits a named {#snippet} with structural content, not a mustache", async () => {
    const out = await code("NamedSlotFill", "svelte");
    expect(out).toContain("{#snippet icon()}");
    expect(out).toContain("<span>");
    expect(out).not.toContain("{<span");
  });

  it('Astro: emits a slotted <Fragment slot="icon"> with structural content', async () => {
    const out = await code("NamedSlotFill", "astro");
    expect(out).toContain('<Fragment slot="icon">');
    expect(out).toContain("<span>");
  });

  it("React: parity — named slot fill stays a JSX child (regression guard)", async () => {
    const out = await code("NamedSlotFill", "react");
    expect(out).toContain("<IButton.icon>");
    expect(out).toContain("<span>");
  });
});
