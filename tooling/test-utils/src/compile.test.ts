import { describe, it, expect } from "vitest";
import { compileSource, compileComponent } from "./compile.ts";
import { resolveComponent } from "./resolve.ts";

const BUTTON_SOURCE = `
import { defineComponent } from "@inkline/core";
export default defineComponent((props: { label: string; disabled?: boolean }) => {
  return <button disabled={props.disabled}>{props.label}</button>;
});
`;

describe("compileSource", () => {
  it("compiles inline source to all 7 targets", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    expect(result.ok).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(Object.keys(result.files)).toHaveLength(7);
  });

  it("compiles to specific targets only", async () => {
    const result = await compileSource(BUTTON_SOURCE, { targets: ["react", "vue"] });
    expect(result.ok).toBe(true);
    expect(Object.keys(result.files)).toHaveLength(2);
    expect(result.files.react).toBeDefined();
    expect(result.files.vue).toBeDefined();
  });

  it("returns generated files via filesFor()", async () => {
    const result = await compileSource(BUTTON_SOURCE, { targets: ["react"] });
    const files = result.filesFor("react");
    expect(files.length).toBeGreaterThan(0);
    expect(files[0]!.contents).toContain("button");
  });

  it("throws when accessing missing target via filesFor()", async () => {
    const result = await compileSource(BUTTON_SOURCE, { targets: ["react"] });
    expect(() => result.filesFor("vue")).toThrow("No files generated");
  });
});

describe("compileComponent", () => {
  it("compiles a file from disk", async () => {
    const filePath = resolveComponent(
      import.meta.url,
      "../../../core/compiler/src/__fixtures__/Button.ink.tsx",
    );
    const result = await compileComponent(filePath, { targets: ["react"] });
    expect(result.ok).toBe(true);
    expect(result.filesFor("react").length).toBeGreaterThan(0);
  });
});
