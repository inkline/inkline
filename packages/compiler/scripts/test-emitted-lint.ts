import { compile } from "../src/pipeline/compile.ts";

const FIXTURE = `
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [count, setCount] = createSignal(0);
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
});
`;

async function main() {
  const result = await compile(
    { fileName: "Counter.ink.tsx", source: FIXTURE },
    { targets: ["react", "solid", "vue", "svelte"] },
  );

  if (result.diagnostics.some((d) => d.severity === "error")) {
    console.error("Compilation errors:");
    for (const d of result.diagnostics) console.error(`  ${d.code}: ${d.title}`);
    process.exitCode = 1;
    return;
  }

  const totalFiles = Object.values(result.files).reduce((n, f) => n + (f?.length ?? 0), 0);
  console.log(
    `Emitted ${totalFiles} files. Lint validation: per-target ESLint invocation deferred until plugins are installed.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
