import { describe, it, expect } from "vitest";
import { compileSource } from "./compile.ts";
import {
  expectCompilationSuccess,
  expectNoDiagnostics,
  expectCorrectFileExtensions,
  expectOutputContains,
  expectOutputNotContains,
  expectImports,
} from "./assertions.ts";

const BUTTON_SOURCE = `
import { defineComponent } from "@inkline/core";
export default defineComponent((props: { label: string }) => {
  return <button>{props.label}</button>;
});
`;

describe("expectCompilationSuccess", () => {
  it("passes for valid component", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    expectCompilationSuccess(result);
  });
});

describe("expectNoDiagnostics", () => {
  it("passes for valid component", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    expectNoDiagnostics(result);
  });
});

describe("expectCorrectFileExtensions", () => {
  it("validates file extensions for all targets", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    expectCorrectFileExtensions(result);
  });
});

describe("expectOutputContains", () => {
  it("passes when output contains substring", async () => {
    const result = await compileSource(BUTTON_SOURCE, { targets: ["react"] });
    expectOutputContains(result.filesFor("react"), "button");
  });

  it("fails when output does not contain substring", async () => {
    const result = await compileSource(BUTTON_SOURCE, { targets: ["react"] });
    expect(() => expectOutputContains(result.filesFor("react"), "nonexistent_xyz")).toThrow();
  });
});

describe("expectOutputNotContains", () => {
  it("passes when output does not contain substring", async () => {
    const result = await compileSource(BUTTON_SOURCE, { targets: ["react"] });
    expectOutputNotContains(result.filesFor("react"), "nonexistent_xyz");
  });
});

const COUNTER_SOURCE = `
import { defineComponent, createSignal } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
});
`;

describe("expectImports", () => {
  it("validates react imports", async () => {
    const result = await compileSource(COUNTER_SOURCE, { targets: ["react"] });
    expectImports(result.filesFor("react"), "react", ["useState"]);
  });
});
