import { describe, it, expect } from "vitest";
import { compile } from "./compile.ts";
import { compileIncremental, createIncrementalState, seedIncrementalState } from "./incremental.ts";

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
        { fileName: "IButton.ink.tsx", source: BUTTON_SOURCE },
      ],
      { targets: ["react"] },
    );

    expect(r1.changed).toHaveLength(2);

    const r2 = await compileIncremental(
      r1.nextState,
      [
        { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
        { fileName: "IButton.ink.tsx", source: BUTTON_SOURCE.replace("label", "text") },
      ],
      { targets: ["react"] },
    );

    expect(r2.changed).toEqual(["IButton.ink.tsx"]);
    expect(r2.skipped).toEqual(["Counter.ink.tsx"]);
  });

  it("returns diagnostics from all files", async () => {
    const state = createIncrementalState();
    const result = await compileIncremental(
      state,
      [
        { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
        { fileName: "IButton.ink.tsx", source: BUTTON_SOURCE },
      ],
      { targets: ["react"] },
    );

    expect(result.diagnostics).toBeDefined();
    expect(Array.isArray(result.diagnostics)).toBe(true);
  });

  it("file removal between runs excludes removed file from output", async () => {
    const state0 = createIncrementalState();
    const r1 = await compileIncremental(
      state0,
      [
        { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
        { fileName: "IButton.ink.tsx", source: BUTTON_SOURCE },
      ],
      { targets: ["react"] },
    );

    expect(r1.changed).toHaveLength(2);

    const r2 = await compileIncremental(
      r1.nextState,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react"] },
    );

    expect(r2.skipped).toEqual(["Counter.ink.tsx"]);
    expect(r2.changed).toEqual([]);
  });

  it("multi-target incremental produces output for each target", async () => {
    const state = createIncrementalState();
    const result = await compileIncremental(
      state,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react", "vue"] },
    );

    expect(result.files.react).toBeDefined();
    expect(result.files.vue).toBeDefined();
    expect(result.files.react!.length).toBeGreaterThan(0);
    expect(result.files.vue!.length).toBeGreaterThan(0);
  });
});

describe("seedIncrementalState", () => {
  it("lets the next run skip files already compiled by a one-shot compile", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      {
        targets: ["react"],
      },
    );

    const seeded = seedIncrementalState([
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE, result },
    ]);

    const next = await compileIncremental(
      seeded,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE }],
      { targets: ["react"] },
    );

    expect(next.changed).toEqual([]);
    expect(next.skipped).toEqual(["Counter.ink.tsx"]);
    // The cached result is served, not an empty shell.
    expect(next.files.react!.length).toBe(result.files.react!.length);
  });

  it("still recompiles a seeded file once its source changes", async () => {
    const result = await compile(
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE },
      {
        targets: ["react"],
      },
    );

    const seeded = seedIncrementalState([
      { fileName: "Counter.ink.tsx", source: COUNTER_SOURCE, result },
    ]);

    const next = await compileIncremental(
      seeded,
      [{ fileName: "Counter.ink.tsx", source: COUNTER_SOURCE.replace("0", "42") }],
      { targets: ["react"] },
    );

    expect(next.changed).toEqual(["Counter.ink.tsx"]);
    expect(next.skipped).toEqual([]);
  });

  it("returns an empty state for no seeds", () => {
    expect(seedIncrementalState([]).sourceHashes.size).toBe(0);
  });
});
