import { compile } from "../src/pipeline/compile.ts";

const FIXTURE = `
import { createSignal, createMemo, createEffect, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  createEffect(() => console.log(count()));
  return (
    <div>
      <p>{count()}</p>
      <p>{doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
`;

async function main() {
  const iterations = 10;
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await compile(
      { fileName: "Counter.ink.tsx", source: FIXTURE },
      { targets: ["react", "solid", "vue", "svelte"], sourceMap: "none" },
    );
    times.push(performance.now() - start);
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`Benchmark: full compile (Counter, 4 targets, ${iterations} iterations)`);
  console.log(`  avg: ${avg.toFixed(1)}ms  min: ${min.toFixed(1)}ms  max: ${max.toFixed(1)}ms`);
  console.log("Formal tinybench integration with .bench-baseline.json: deferred.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
