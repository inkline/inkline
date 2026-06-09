// Astro is static: a model is a read-only `let` seeded from its prop; emitted events are no-ops.
import { describe, it, expect } from "vitest";
import { compileTo, compileToAll } from "../../../../testing/codegen.ts";
import { compileFixture } from "../../../../testing/harness.ts";

describe("BoundField: $bind:value on a component (parent side)", () => {
  it("passes the value one-way and drops the (inert) update event", async () => {
    const out = await compileToAll("BoundField", "astro");
    expect(out).toContain("<Field value={text} />");
    expect(out).not.toContain("update:value");
    expect(out).not.toContain("onUpdate");
  });
});

describe("ModelInput: defineModel → read-only let", () => {
  it("seeds a mutable let from the prop and renders the value (no two-way runtime)", async () => {
    const out = await compileTo("ModelInput", "astro");
    expect(out).toContain("let value = props.value");
    expect(out).toContain("value={value}");
    expect(out).toContain("value?: string");
  });
});

describe("EmitButton: defineEmits → no-op", () => {
  it("rewrites emit(name, …) to a no-op (events do not fire on a static target)", async () => {
    const out = await compileTo("EmitButton", "astro");
    expect(out).toContain("() => undefined");
  });
});

describe("Astro two-way diagnostic", () => {
  it("reports INK0045 as info (two-way binding is not interactive on the static target)", async () => {
    const { diagnostics } = await compileFixture("ModelInput", ["astro"]);
    const d = diagnostics.find((x) => x.code === "INK0045");
    expect(d).toBeDefined();
    expect(d?.severity).toBe("info");
  });
});
