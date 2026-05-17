import { describe, it, expect } from "vitest";
import { compile } from "../pipeline/compile.ts";
import { verifyIdentifierMappings } from "./sourcemap.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";

const COUNTER_SOURCE = `// @ts-nocheck
import { createSignal, createMemo, defineComponent } from "@inkline/core";

export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  return (
    <div>
      <p>{count()}</p>
      <p>{doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
`;

const COUNTER_FILE = "Counter.ink.tsx";

async function compileWithMaps(target: TargetName) {
  const result = await compile(
    { fileName: COUNTER_FILE, source: COUNTER_SOURCE },
    { targets: [target], sourceMap: "external" },
  );
  const files = result.files[target];
  expect(files).toBeDefined();
  expect(files!.length).toBeGreaterThan(0);
  return files![0]!;
}

function countMappings(file: GeneratedFile): number {
  if (!file.sourceMap) return 0;
  const map = JSON.parse(file.sourceMap) as { mappings: string };
  return map.mappings.split(",").filter((s) => s.length > 0).length;
}

describe("source-map round-trip", () => {
  it("react: has source maps with non-trivial mappings", async () => {
    const file = await compileWithMaps("react");
    expect(file.sourceMap).toBeDefined();
    expect(countMappings(file)).toBeGreaterThan(0);
  });

  it("react: mappings resolve to source file", async () => {
    const file = await compileWithMaps("react");
    const map = JSON.parse(file.sourceMap!) as { sources: string[] };
    expect(map.sources).toContain(COUNTER_FILE);
  });

  it("react: source map has version 3", async () => {
    const file = await compileWithMaps("react");
    const map = JSON.parse(file.sourceMap!) as { version: number };
    expect(map.version).toBe(3);
  });

  it("all targets produce source map objects when sourceMap is external", async () => {
    const result = await compile(
      { fileName: COUNTER_FILE, source: COUNTER_SOURCE },
      { targets: ["react", "solid", "vue", "svelte"], sourceMap: "external" },
    );

    for (const target of ["react", "solid", "vue", "svelte"] as const) {
      const files = result.files[target];
      if (!files) continue;
      for (const file of files) {
        expect(file.sourceMap, `${target}/${file.path}`).toBeDefined();
      }
    }
  });

  it("react: node-level mappings cover at least one element", async () => {
    const file = await compileWithMaps("react");
    const n = countMappings(file);
    expect(n).toBeGreaterThanOrEqual(1);
  });

  it("inline source map mode embeds map in content", async () => {
    const result = await compile(
      { fileName: COUNTER_FILE, source: COUNTER_SOURCE },
      { targets: ["react"], sourceMap: "inline" },
    );
    const file = result.files.react![0]!;
    expect(file.contents).toContain("//# sourceMappingURL=data:application/json;base64,");
  });

  it("none source map mode produces no map", async () => {
    const result = await compile(
      { fileName: COUNTER_FILE, source: COUNTER_SOURCE },
      { targets: ["react"], sourceMap: "none" },
    );
    const file = result.files.react![0]!;
    expect(file.sourceMap).toBeUndefined();
  });

  it("verifyIdentifierMappings reports missing source map", () => {
    const results = verifyIdentifierMappings({ path: "x.tsx", contents: "const x = 1;" }, [
      { name: "x", originalLine: 0, originalColumn: 6 },
    ]);
    expect(results).toHaveLength(1);
    expect(results[0]!.pass).toBe(false);
    expect(results[0]!.error).toContain("No source map");
  });

  it("verifyIdentifierMappings reports identifier not found", async () => {
    const file = await compileWithMaps("react");
    const results = verifyIdentifierMappings(file, [
      { name: "nonexistentVar", originalLine: 0, originalColumn: 0 },
    ]);
    expect(results[0]!.pass).toBe(false);
    expect(results[0]!.error).toContain("not found in generated");
  });
});
