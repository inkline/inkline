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

const componentsSrc = (rel: string) => resolve(here, "../../components/src/components", rel);

/** One `.ink.tsx` source → its generated Qwik `.tsx` on disk. */
const FIXTURES = [
  {
    source: componentsSrc("checkbox/headless/ICheckboxControlBase.ink.tsx"),
    out: resolve(here, "__generated__/ICheckboxControlBase.tsx"),
  },
  // The full Select tree (styled root + its four headless parts), mirrored so the styled component's
  // relative imports (`../headless/ISelect*`) resolve. The SSR test (INK-35) imports the styled root
  // and renders it through qwikVite to prove the codegen'd QRL handlers survive extraction instead of
  // throwing `[object Promise]` at SSR.
  {
    source: componentsSrc("select/styled/ISelect.ink.tsx"),
    out: resolve(here, "__generated__/select/styled/ISelect.tsx"),
  },
  {
    source: componentsSrc("select/headless/ISelectBase.ink.tsx"),
    out: resolve(here, "__generated__/select/headless/ISelectBase.tsx"),
  },
  {
    source: componentsSrc("select/headless/ISelectTriggerBase.ink.tsx"),
    out: resolve(here, "__generated__/select/headless/ISelectTriggerBase.tsx"),
  },
  {
    source: componentsSrc("select/headless/ISelectListboxBase.ink.tsx"),
    out: resolve(here, "__generated__/select/headless/ISelectListboxBase.tsx"),
  },
  {
    source: componentsSrc("select/headless/ISelectOptionBase.ink.tsx"),
    out: resolve(here, "__generated__/select/headless/ISelectOptionBase.tsx"),
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
