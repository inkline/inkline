import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { compile } from "../../compile.ts";

// `defineProps<T>()` where `T` names a type declared in *another* module is the one case the design
// flagged as a risk: the macro has no parameter to hang a type on, so it must reach the declaration
// through the checker alone. The pair lives here rather than in `src/__fixtures__/` because the
// emitted output imports its sibling, and the per-fixture `tsc` sweep typechecks one fixture's
// output in isolation — every cross-file fixture in that directory is quarantined for it, and that
// quarantine list may only shrink.
const FIXTURES = resolve(dirname(fileURLToPath(import.meta.url)), "__fixtures__");

async function compileImported(targets: readonly ("react" | "solid" | "vue")[]) {
  const fileName = resolve(FIXTURES, "PropsMacroImported.ink.tsx");
  return compile({ fileName, source: readFileSync(fileName, "utf-8") }, { targets });
}

describe("defineProps with an imported type argument", () => {
  it("resolves the imported interface into props", async () => {
    const result = await compileImported(["react"]);

    expect(result.diagnostics).toEqual([]);
    expect(result.module?.module.components[0]?.props.map((p) => [p.name, p.required])).toEqual([
      ["label", true],
      ["size", false],
    ]);
  });

  it("keeps the type argument's name so the import stays meaningful", async () => {
    const result = await compileImported(["react", "solid", "vue"]);

    expect(result.module?.module.components[0]?.propsTypeText).toBe("PropsMacroBaseProps");
    for (const target of ["react", "solid", "vue"] as const) {
      const out = (result.files[target] ?? []).map((f) => f.contents).join("\n");
      expect(out, target).toContain("PropsMacroBaseProps");
      // R4: the macro and its `@inkline/core` import are both erased.
      expect(out, target).not.toContain("@inkline/core");
    }
  });
});
