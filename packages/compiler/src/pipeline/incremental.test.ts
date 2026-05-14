import { describe, it, expect } from "vitest";
import { compileIncremental, createIncrementalState } from "./incremental.ts";

const COUNTER_SOURCE = `
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
});
`;

const BUTTON_SOURCE = `
import { defineComponent } from "@inkline/core";
export default defineComponent((props: { label: string }) => {
  return <button>{props.label}</button>;
});
`;

describe("compileIncremental", () => {
  it("compiles all files on first run", async () => {
    const state = createIncrementalState();
    const result = await compileIncremental(
      state,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react"] },
    );

    expect(result.changed).toEqual(["Counter.ink.tsx"]);
    expect(result.skipped).toEqual([]);
    expect(result.files.react).toBeDefined();
    expect(result.files.react!.length).toBeGreaterThan(0);
    expect(result.nextState.sourceHashes.size).toBe(1);
  });

  it("skips unchanged files on second run", async () => {
    const state0 = createIncrementalState();
    const r1 = await compileIncremental(
      state0,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react"] },
    );

    const r2 = await compileIncremental(
      r1.nextState,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react"] },
    );

    expect(r2.changed).toEqual([]);
    expect(r2.skipped).toEqual(["Counter.ink.tsx"]);
    expect(r2.files.react).toBeDefined();
  });

  it("recompiles changed files", async () => {
    const state0 = createIncrementalState();
    const r1 = await compileIncremental(
      state0,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react"] },
    );

    const modified = COUNTER_SOURCE.replace("0", "42");
    const r2 = await compileIncremental(
      r1.nextState,
      [{ fileName: "Counter.ink.tsx", source: modified }],
      { targets: ["react"] },
    );

    expect(r2.changed).toEqual(["Counter.ink.tsx"]);
    expect(r2.skipped).toEqual([]);
  });

  it("handles multiple files with mixed changes", async () => {
    const state0 = createIncrementalState();
    const r1 = await compileIncremental(
      state0,
      [
        { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
        { fileName: "Button.ink.tsx", source: BUTTON_SOURCE },
      ],
      { targets: ["react"] },
    );

    expect(r1.changed).toHaveLength(2);

    const r2 = await compileIncremental(
      r1.nextState,
      [
        { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
        { fileName: "Button.ink.tsx", source: BUTTON_SOURCE.replace("label", "text") },
      ],
      { targets: ["react"] },
    );

    expect(r2.changed).toEqual(["Button.ink.tsx"]);
    expect(r2.skipped).toEqual(["Counter.ink.tsx"]);
  });

  it("returns diagnostics from all files", async () => {
    const state = createIncrementalState();
    const result = await compileIncremental(
      state,
      [
        { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
        { fileName: "Button.ink.tsx", source: BUTTON_SOURCE },
      ],
      { targets: ["react"] },
    );

    expect(result.diagnostics).toBeDefined();
  });
});
