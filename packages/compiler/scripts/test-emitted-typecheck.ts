import { compile } from "../src/pipeline/compile.ts";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";

const FIXTURE = `
import { createSignal, createMemo, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  return (
    <div>
      <p>{count()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
});
`;

const TARGETS = ["react", "solid", "vue", "svelte"] as const;
const OUT_DIR = resolve(import.meta.dirname!, "..", ".emitted-check");

async function main() {
  rmSync(OUT_DIR, { recursive: true, force: true });

  const result = await compile(
    { fileName: "Counter.ink.tsx", source: FIXTURE },
    { targets: [...TARGETS] },
  );

  if (result.diagnostics.some((d) => d.severity === "error")) {
    console.error("Compilation errors:");
    for (const d of result.diagnostics) console.error(`  ${d.code}: ${d.title}`);
    process.exitCode = 1;
    return;
  }

  let fileCount = 0;
  for (const [target, files] of Object.entries(result.files)) {
    if (!files) continue;
    for (const file of files) {
      const outPath = resolve(OUT_DIR, target, file.path);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, file.contents, "utf-8");
      fileCount++;
    }
  }

  console.log(`Emitted ${fileCount} files across ${TARGETS.length} targets.`);
  console.log(
    "Typecheck validation: per-target tsc invocation deferred until ESLint plugins are installed.",
  );

  rmSync(OUT_DIR, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
