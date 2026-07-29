/**
 * Pins the *safety level* of `JSX.IntrinsicElements` — the RFC §2.3 probe table.
 *
 * `jsx-runtime.test.ts` covers the runtime stubs; this file covers the types, which is the whole
 * point of the surface. Twelve deliberate authoring mistakes: eight the surface must catch, four it
 * structurally cannot. Both halves are assertions. A re-sync of `./vendor/solid-jsx.d.ts` that stops
 * catching one of the eight fails here instead of silently downgrading every author's editor, and
 * one that starts catching one of the four fails too — telling us to update the table rather than
 * leaving the documented blind spots stale.
 *
 * Kept separate from `jsx-runtime.test.ts` because it spawns `tsc`; the unit tests stay instant.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

interface Probe {
  /** Row in the RFC §2.3 table. */
  readonly row: number;
  readonly mistake: string;
  /** Diagnostic codes the surface must emit for this file, in source order. Empty means none. */
  readonly codes: readonly string[];
  /** Why `codes` is empty. Required for every blind spot, so none of them is ever a mystery. */
  readonly blindSpot?: string;
  readonly source: string;
}

const PROBES: readonly Probe[] = [
  {
    row: 1,
    mistake: "unknown attribute",
    codes: ["TS2322"],
    source: `export const el = <div notARealAttribute="x" />;\n`,
  },
  {
    row: 2,
    mistake: "wrong value type for a known attribute",
    codes: ["TS2322"],
    source: `export const el = <input disabled="yes-please" />;\n`,
  },
  {
    row: 3,
    mistake: "misspelled event handler",
    codes: ["TS2322"],
    source: `export const el = <button onClik={() => {}} />;\n`,
  },
  {
    row: 4,
    mistake: "bad member access on the event object",
    codes: ["TS2339"],
    source: `export const el = <button onClick={(e) => e.nope.deep()} />;\n`,
  },
  {
    row: 5,
    mistake: "bad member access on `currentTarget`",
    codes: ["TS2339"],
    source: `export const el = <input onInput={(e) => console.log(e.currentTarget.notAValue)} />;\n`,
  },
  {
    row: 6,
    mistake: "non-existent intrinsic element",
    codes: ["TS2339"],
    source: `export const el = <notatag />;\n`,
  },
  {
    row: 7,
    mistake: "React attribute name (`htmlFor`)",
    codes: ["TS2322"],
    source: `export const el = <label htmlFor="x" />;\n`,
  },
  {
    row: 8,
    mistake: "React attribute name (`className`)",
    codes: ["TS2322"],
    source: `export const el = <div className="wrapper" />;\n`,
  },
  {
    row: 9,
    mistake: "misspelled ARIA attribute",
    codes: [],
    blindSpot:
      "TypeScript exempts JSX attribute names that are not valid identifiers from unknown-property " +
      "checking, so every hyphenated name is accepted whatever the element type says. Not fixable " +
      "from a type definition — `data-*` authoring depends on the same exemption.",
    source: `export const el = <div aria-hiddenn="true" />;\n`,
  },
  {
    row: 10,
    mistake: "misspelled component prop",
    codes: [],
    blindSpot:
      "`InkComponent` carries `[attr: string]: any` (see `index.ts`) so every component accepts " +
      "every prop. Typing component props is a separate, explicit non-goal of this change.",
    source:
      `import { defineComponent } from "@inkline/core";\n` +
      `const Button = defineComponent<{ color?: string }>(() => <button />);\n` +
      `export const el = <Button colr="light" />;\n`,
  },
  {
    row: 11,
    mistake: "invalid member of an open string union",
    codes: [],
    blindSpot:
      "The vendored upstream types `input.type` as the enumerated union plus `(string & {})` — the " +
      "autocomplete idiom, which keeps suggestions while accepting any string. Inherited by design.",
    source: `export const el = <input type="definitely-not-a-type" />;\n`,
  },
  {
    row: 12,
    mistake: "nonsense compiler directive",
    codes: [],
    blindSpot:
      "`InklineOwned` declares `` [K in `$${string}`]?: any ``, so every `$`-prefixed key is open. " +
      "Directive names are the compiler's vocabulary, not the type system's; validating them belongs " +
      "in the compiler's diagnostics.",
    source: `export const el = <div $bind:totalNonsense={1} />;\n`,
  },
];

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const tsc = join(dirname(require.resolve("typescript/package.json")), "bin", "tsc");

/**
 * Deliberately not the package's own `tsconfig.json`: the probes must be checked with the settings
 * an *author* gets (`jsx-runtime` as the JSX source), and `paths` points at the sources so the probe
 * measures the working tree rather than a stale `dist/`.
 */
const TSCONFIG = {
  compilerOptions: {
    target: "esnext",
    lib: ["es2023", "dom"],
    module: "preserve",
    moduleResolution: "bundler",
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    types: [],
    jsx: "react-jsx",
    jsxImportSource: "@inkline/core",
    paths: {
      "@inkline/core": ["../src/index.ts"],
      "@inkline/core/jsx-runtime": ["../src/jsx-runtime.ts"],
    },
  },
  include: ["*.tsx"],
};

const fileFor = (row: number) => `case-${String(row).padStart(2, "0")}.tsx`;

describe("JSX.IntrinsicElements safety level (RFC §2.3)", () => {
  let probeDir: string;
  let diagnostics: Map<string, string[]>;

  beforeAll(() => {
    // Created inside the package so `csstype` resolves through the normal `node_modules` walk-up;
    // the `.jsx-probe-*` prefix is git-ignored, which also keeps oxlint away from files that are
    // broken on purpose.
    probeDir = mkdtempSync(join(packageRoot, ".jsx-probe-"));
    writeFileSync(join(probeDir, "tsconfig.json"), JSON.stringify(TSCONFIG, null, 2));
    for (const probe of PROBES) {
      writeFileSync(join(probeDir, fileFor(probe.row)), probe.source);
    }

    const run = spawnSync(tsc, ["-p", "tsconfig.json", "--pretty", "false"], {
      cwd: probeDir,
      encoding: "utf8",
    });
    if (run.error) throw run.error;

    diagnostics = new Map(PROBES.map((probe) => [fileFor(probe.row), []]));
    for (const line of run.stdout.split("\n")) {
      const match = /^(case-\d+\.tsx)\(\d+,\d+\): error (TS\d+):/.exec(line);
      if (match) {
        diagnostics.get(match[1]!)!.push(match[2]!);
      } else if (/^\S.*error TS\d+:/.test(line)) {
        // A config or resolution failure would otherwise read as "nothing was caught" and quietly
        // turn all twelve assertions into noise.
        throw new Error(`tsc reported a diagnostic outside the probe files:\n${line}`);
      }
    }
  }, 60_000);

  afterAll(() => {
    rmSync(probeDir, { recursive: true, force: true });
  });

  it.each(PROBES)("row $row — $mistake", ({ row, codes }) => {
    expect(diagnostics.get(fileFor(row))).toEqual(codes);
  });

  it("documents why each uncaught case is uncaught", () => {
    const undocumented = PROBES.filter((probe) => probe.codes.length === 0 && !probe.blindSpot);
    expect(undocumented).toEqual([]);
  });
});
