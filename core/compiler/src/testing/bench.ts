import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Bench, type TaskResultWithStatistics } from "tinybench";
import { compile } from "../pipeline/compile.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASELINE_PATH = resolve(__dirname, "..", "..", ".bench-baseline.json");

export interface BenchResult {
  readonly name: string;
  readonly hz: number;
  readonly meanMs: number;
  readonly p99Ms: number;
}

export interface BenchSuiteResult {
  readonly results: readonly BenchResult[];
  readonly regressions: readonly string[];
  readonly baseline?: Record<string, number>;
}

export async function runBenchSuite(): Promise<BenchSuiteResult> {
  const fixturePath = resolve(__dirname, "..", "__fixtures__", "Counter.ink.tsx");
  const source = readFileSync(fixturePath, "utf-8");

  const bench = new Bench({ warmupIterations: 3, iterations: 20 });

  bench.add("compile Counter (react)", async () => {
    await compile({ fileName: fixturePath, source }, { targets: ["react"] });
  });

  bench.add("compile Counter (all 4 targets)", async () => {
    await compile(
      { fileName: fixturePath, source },
      { targets: ["react", "solid", "vue", "svelte"] },
    );
  });

  await bench.run();

  const results: BenchResult[] = bench.tasks.map((task) => {
    const r = task.result as unknown as TaskResultWithStatistics | null;
    return {
      name: task.name,
      hz: r?.throughput?.mean ?? 0,
      meanMs: r?.latency?.mean ?? 0,
      p99Ms: r?.latency?.p99 ?? 0,
    };
  });

  const baseline = loadBaseline();
  const regressions: string[] = [];

  if (baseline) {
    for (const r of results) {
      const baseHz = baseline[r.name];
      if (baseHz && r.hz < baseHz * 0.9) {
        const pct = (((baseHz - r.hz) / baseHz) * 100).toFixed(1);
        regressions.push(
          `${r.name}: ${pct}% slower (${r.hz.toFixed(1)} vs baseline ${baseHz.toFixed(1)} ops/s)`,
        );
      }
    }
  }

  return { results, regressions, baseline: baseline ?? undefined };
}

function loadBaseline(): Record<string, number> | null {
  if (!existsSync(BASELINE_PATH)) return null;
  try {
    return JSON.parse(readFileSync(BASELINE_PATH, "utf-8")) as Record<string, number>;
  } catch {
    return null;
  }
}

export function saveBaseline(results: readonly BenchResult[]): void {
  const data: Record<string, number> = {};
  for (const r of results) data[r.name] = r.hz;
  writeFileSync(BASELINE_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
