// React: a JSX-valued named-slot fill compiles to a node prop (`icon={<span>★</span>}`) — the form
// the React target consumes (`{props.icon}`), not a `<IButton.icon>` child that never reaches the
// consumer. The template-target decomposition landed in UXF-12 (#459); the JSX targets
// (React/Solid/Qwik) were brought in line with their own consumption convention afterwards.
import { describe, it, expect } from "vitest";
import { compileToFiles } from "../../../../testing/codegen.ts";

// NamedSlotFill emits a child (IButton) and the parent that fills its named slot; assert the parent.
async function parentOutput(): Promise<string> {
  const files = await compileToFiles("NamedSlotFill", "react");
  return files.find((f) => f.includes("icon={")) ?? files[files.length - 1]!;
}

describe("UXF-12: JSX-valued named-slot fills", () => {
  it("compiles a named slot fill to a node prop", async () => {
    const out = await parentOutput();
    expect(out).toContain("icon={<span>★</span>}");
    expect(out).not.toContain("<IButton.icon>");
    expect(out).not.toContain("renderIcon");
  });

  it("re-projects a parent slot through the node prop", async () => {
    const out = await parentOutput();
    expect(out).toContain("icon={props.icon}");
  });
});
