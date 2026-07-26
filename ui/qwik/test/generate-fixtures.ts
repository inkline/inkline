// Vitest globalSetup for the Qwik behaviour suite.
//
// Compiles the real headless checkbox control (`ICheckboxControlBase.ink.tsx`) to its Qwik target
// output and writes it to `test/__generated__/` before any test runs. The behaviour test then imports
// that generated component so qwikVite extracts its `$()` handlers into real QRLs — the same path a
// production build takes. Generating from source every run (rather than committing a golden file)
// keeps the runtime assertion honest: it always exercises whatever the Qwik codegen currently emits.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "@inkline/compiler";

const here = dirname(fileURLToPath(import.meta.url));

/** One headless `.ink.tsx` source → its generated Qwik `.tsx` on disk. */
const FIXTURES = [
  {
    source: resolve(
      here,
      "../../components/src/components/checkbox/headless/ICheckboxControlBase.ink.tsx",
    ),
    out: resolve(here, "__generated__/ICheckboxControlBase.tsx"),
  },
] as const;

export default async function setup(): Promise<void> {
  for (const { source, out } of FIXTURES) {
    const src = readFileSync(source, "utf-8");
    const result = await compile({ fileName: source, source: src }, { targets: ["qwik"] });

    const errors = result.diagnostics.filter((d) => d.severity === "error");
    if (errors.length > 0) {
      throw new Error(
        `Qwik compile of ${source} produced errors:\n${errors.map((e) => `${e.code}: ${e.title}`).join("\n")}`,
      );
    }

    const file = result.files.qwik?.[0];
    if (!file) {
      throw new Error(`Qwik compile of ${source} produced no output file`);
    }

    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, file.contents, "utf-8");
  }
}
