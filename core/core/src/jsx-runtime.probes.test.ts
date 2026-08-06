/**
 * Pins the *safety level* of `JSX.IntrinsicElements` — the RFC §2.3 probe table.
 *
 * `jsx-runtime.test.ts` covers the runtime stubs; this file covers the types, which is the whole
 * point of the surface. Twelve deliberate authoring mistakes: eight the type surface must catch, two
 * the *compiler* catches instead, two nothing catches. All three groups are assertions. A re-sync of
 * `./vendor/jsx-intrinsics.d.ts` that stops catching one of the eight fails here instead of silently
 * downgrading every author's editor, and one that starts catching a row this table says it does not
 * fails too — telling us to update the table rather than leaving a documented gap stale.
 *
 * Rows 9 and 12 are the compiler-covered pair (UXF-136). TypeScript still cannot see them — a
 * hyphenated attribute name is exempt from unknown-property checking, and `` [K in `$${string}`] ``
 * is open by construction — so their `codes` stay empty *and always will*. What changed is that the
 * mistake no longer reaches the author's output: `@inkline/compiler` reports INK0072 and INK0073 for
 * exactly these sources. This package cannot import the compiler to prove that (the compiler
 * devDepends on this one; the reverse is a cycle), so the proof lives in
 * `core/compiler/src/pipeline/passes/03-lower/attribute-checks.test.ts`, which compiles the same two
 * mistakes and asserts the codes. `inkCode` below is the join between the two files.
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
  /**
   * The `@inkline/compiler` code that catches this mistake when the type surface cannot. Set on rows
   * TypeScript is structurally unable to see but the compiler still refuses to let through.
   */
  readonly inkCode?: string;
  /** Why nothing catches it. Required for every remaining blind spot, so none is ever a mystery. */
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
    inkCode: "INK0072",
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
    inkCode: "INK0073",
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

  it("accounts for every case the type surface does not catch", () => {
    // Either the compiler covers it (`inkCode`) or we say out loud why nothing does (`blindSpot`).
    // "Neither" is how a gap becomes invisible.
    const unaccounted = PROBES.filter(
      (probe) => probe.codes.length === 0 && !probe.inkCode && !probe.blindSpot,
    );
    expect(unaccounted).toEqual([]);
  });

  it("does not claim compiler cover for a case the type surface already catches", () => {
    const bothColumns = PROBES.filter((probe) => probe.codes.length > 0 && probe.inkCode);
    expect(bothColumns).toEqual([]);
  });

  it("moves rows 9 and 12 to the caught column (UXF-136)", () => {
    // Named explicitly so deleting the compiler check cannot quietly restore the blind spots: the
    // codes are asserted end-to-end in the compiler's `attribute-checks.test.ts`.
    const covered = PROBES.filter((probe) => probe.inkCode).map((probe) => [
      probe.row,
      probe.inkCode,
    ]);
    expect(covered).toEqual([
      [9, "INK0072"],
      [12, "INK0073"],
    ]);
  });
});
