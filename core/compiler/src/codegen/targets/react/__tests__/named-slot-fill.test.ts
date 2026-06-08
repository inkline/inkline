// React: parity guard for JSX-valued named-slot fills — the fill stays a JSX child
// (`<IButton.icon><span>★</span></IButton.icon>`), unaffected by the template-target fix (UXF-12, #459).
import { describe, it, expect } from "vitest";
import { compileToFiles } from "../../../../testing/codegen.ts";

// NamedSlotFill emits a child (IButton) and the parent that fills the named slot; assert the parent.
async function parentOutput(): Promise<string> {
  const files = await compileToFiles("NamedSlotFill", "react");
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
  it("named slot fill stays a JSX child (regression guard)", async () => {
    const out = await parentOutput();
    expect(out).toContain("<IButton.icon>");
    expect(out).toContain("<span>");
  });
});
