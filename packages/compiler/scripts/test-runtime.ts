import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { compileFixture } from "../src/testing/harness.ts";
import { runConformanceInvariants } from "../src/testing/conformance.ts";
import type { TargetName } from "../src/codegen/context.ts";
import { builtinRegistry } from "../src/codegen/registry.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "src", "__fixtures__");
const TARGETS: TargetName[] = ["react", "solid", "vue", "svelte"];

async function main() {
  const fixtures = readdirSync(FIXTURES_DIR)
    .filter((f) => f.endsWith(".ink.tsx"))
    .map((f) => f.replace(".ink.tsx", ""));

  console.log(
    `Running conformance invariants: ${fixtures.length} fixtures × ${TARGETS.length} targets...\n`,
  );

  let totalErrors = 0;

  for (const fixture of fixtures) {
    const compiled = await compileFixture(fixture, TARGETS);

    if (compiled.diagnostics.some((d) => d.severity === "error")) {
      console.error(`  ✗ ${fixture}: compilation errors`);
      for (const d of compiled.diagnostics) console.error(`    ${d.code}: ${d.title}`);
      totalErrors++;
      continue;
    }

    for (const targetName of TARGETS) {
      const files = compiled.files[targetName];
      if (!files || files.length === 0) continue;

      const target = builtinRegistry.get(targetName);
      if (!target?.conformance) {
        console.log(`  ⊘ ${fixture} → ${targetName}: no conformance spec`);
        continue;
      }

      let targetErrors = 0;
      for (const file of files) {
        const diags = runConformanceInvariants(target.conformance.invariants, file);
        if (diags.length > 0) {
          console.error(`  ✗ ${fixture} → ${targetName}/${file.path}`);
          for (const d of diags) console.error(`    ${d.title}`);
          targetErrors += diags.length;
        }
      }

      if (targetErrors === 0) {
        console.log(`  ✓ ${fixture} → ${targetName}`);
      }
      totalErrors += targetErrors;
    }
  }

  console.log(
    totalErrors === 0
      ? `\n✓ All fixtures pass conformance invariants.`
      : `\n✗ ${totalErrors} failure(s).`,
  );
  process.exitCode = totalErrors > 0 ? 1 : 0;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
