import { runBenchSuite, saveBaseline } from "../src/testing/bench.ts";

async function main() {
  const saveFlag = process.argv.includes("--save-baseline");

  console.log("Running benchmark suite...\n");
  const suite = await runBenchSuite();

  for (const r of suite.results) {
    console.log(`  ${r.name}`);
    console.log(
      `    ${r.hz.toFixed(1)} ops/s  mean: ${r.meanMs.toFixed(2)}ms  p99: ${r.p99Ms.toFixed(2)}ms`,
    );
  }

  if (suite.baseline) {
    console.log("\nBaseline comparison:");
    for (const r of suite.results) {
      const base = suite.baseline[r.name];
      if (!base) continue;
      const delta = ((r.hz - base) / base) * 100;
      const sign = delta >= 0 ? "+" : "";
      console.log(`  ${r.name}: ${sign}${delta.toFixed(1)}%`);
    }
  }

  if (suite.regressions.length > 0) {
    console.error("\n✗ Performance regressions detected:");
    for (const r of suite.regressions) console.error(`  ${r}`);
    process.exitCode = 1;
  } else {
    console.log("\n✓ No regressions.");
  }

  if (saveFlag) {
    saveBaseline(suite.results);
    console.log("\nBaseline saved to .bench-baseline.json");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
