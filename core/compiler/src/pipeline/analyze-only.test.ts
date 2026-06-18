import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { analyzeOnly, buildAngularRegistry } from "./compile.ts";

const FIXTURES_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "__fixtures__");

describe("analyzeOnly", () => {
  it("runs program→parse→lower→analyze and returns the analyzed module without emitting", async () => {
    const fileName = resolve(FIXTURES_DIR, "IButton.ink.tsx");
    const source = readFileSync(fileName, "utf-8");

    const analyzed = await analyzeOnly({ fileName, source }, { targets: ["angular"] });

    expect(analyzed.module.components).toHaveLength(1);
    const comp = analyzed.module.components[0]!;
    expect(comp.render.kind).toBe("Element");
    expect(analyzed.graphs.size).toBe(1);
  });

  it("feeds buildAngularRegistry on real compiled IR (the CLI/harness pre-pass integration)", async () => {
    const fileName = resolve(FIXTURES_DIR, "IButton.ink.tsx");
    const source = readFileSync(fileName, "utf-8");

    const analyzed = await analyzeOnly({ fileName, source }, { targets: ["angular"] });
    const registry = buildAngularRegistry([analyzed.module]);

    // The fixture's `<button>` root has no `element` flag, so attribute-selector codegen is opt-out:
    // it resolves to a `wrapper` (the integration still works — analyzeOnly → IR → classify).
    expect(registry.get(analyzed.module.components[0]!.name)).toMatchObject({ kind: "wrapper" });
  });
});
