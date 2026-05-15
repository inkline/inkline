import { describe, it, expect } from "vitest";
import { compileSource } from "./compile.ts";
import { snapshotOutput } from "./snapshot.ts";

const BUTTON_SOURCE = `
import { defineComponent } from "@inkline/core";
export default defineComponent((props: { label: string }) => {
  return <button>{props.label}</button>;
});
`;

describe("snapshotOutput", () => {
  it("returns keyed output for all targets", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    const output = snapshotOutput(result);
    const keys = Object.keys(output);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys.some((k) => k.startsWith("react/"))).toBe(true);
    expect(keys.some((k) => k.startsWith("vue/"))).toBe(true);
  });

  it("filters to specific targets", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    const output = snapshotOutput(result, { targets: ["react"] });
    const keys = Object.keys(output);
    expect(keys.every((k) => k.startsWith("react/"))).toBe(true);
  });

  it("excludes source map files", async () => {
    const result = await compileSource(BUTTON_SOURCE, { config: { sourceMap: "external" } });
    const output = snapshotOutput(result);
    expect(Object.keys(output).some((k) => k.endsWith(".map"))).toBe(false);
  });
});
