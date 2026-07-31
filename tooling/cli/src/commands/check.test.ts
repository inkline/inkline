import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCommand, type ArgsDef, type CommandDef } from "citty";
import type { Diagnostic, InklineConfig } from "@inkline/compiler";

// `check` and `compile` are exercised in-process against a stubbed `compile()` so the option bag each
// one hands the compiler can be captured and compared directly. The point of these tests is the
// plumbing between config file and compiler, not the compilation itself.
const { compileCalls, stubDiagnostics } = vi.hoisted(() => ({
  compileCalls: [] as Partial<InklineConfig>[],
  // What every stubbed `compile()` call reports. Empty by default; a reporting test pushes to it.
  // Every compiled file gets the same set, which is also the cross-file duplicate the reporter is
  // meant to collapse into one line.
  stubDiagnostics: [] as Diagnostic[],
}));

vi.mock("@inkline/compiler", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inkline/compiler")>();
  return {
    ...actual,
    compile: async (_input: unknown, options: Partial<InklineConfig>) => {
      compileCalls.push(options);
      return { files: {}, diagnostics: [...stubDiagnostics] };
    },
  };
});

// Story generation is a side effect of `compile` only; stub it so the two commands differ in nothing
// but the option bag under test.
vi.mock("@inkline/storybook/generator", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inkline/storybook/generator")>();
  return { ...actual, generate: async () => ({ files: [], components: [] }) };
});

const checkCommand = (await import("./check.ts")).default;
const compileCommand = (await import("./compile.ts")).default;

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMP = resolve(__dirname, "..", "..", ".tmp-check-unit");

const COMPONENT = `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <button />);\n`;

/**
 * A config that sets every field the CLI is expected to forward to the compiler. `extra` is appended
 * verbatim, for the reporting tests that need one more key without a second fixture to keep in sync.
 */
function writeFixture(dir: string, extra = ""): string {
  mkdirSync(resolve(dir, "src"), { recursive: true });
  writeFileSync(resolve(dir, "src", "A.ink.tsx"), COMPONENT);
  writeFileSync(resolve(dir, "src", "B.ink.tsx"), COMPONENT);
  writeFileSync(resolve(dir, "types.tsconfig.json"), `{ "files": [] }\n`);

  const configPath = resolve(dir, "inkline.config.mjs");
  writeFileSync(
    configPath,
    `export default {
      targets: ["react"],
      srcDir: "src",
      outDir: "out",
      targetOutDir: { react: "out/react" },
      sourceMap: "inline",
      targetOptions: { react: { forwardRef: true } },
      plugins: [{ name: "fixture-plugin" }],
      verbose: true,
      tsconfig: "types.tsconfig.json",
      barrels: [{ file: "index.ts", match: "" }],
      ${extra}
    };\n`,
  );
  return configPath;
}

/** A diagnostic the stubbed `compile()` will report. Defaults to the `info` INK0068 advisory. */
function makeDiag(overrides: Partial<Diagnostic> = {}): Diagnostic {
  return {
    code: "INK0068" as Diagnostic["code"],
    severity: "info",
    title: "hasSlot() always returns true",
    url: "",
    loc: { file: "IInput.ink.tsx", line: 39, column: 1, offset: 0, length: 0 },
    ...overrides,
  };
}

async function run<T extends ArgsDef>(
  command: CommandDef<T>,
  rawArgs: string[],
): Promise<{ errs: string; outs: string; exitCode: number }> {
  const errs: string[] = [];
  const outs: string[] = [];
  vi.spyOn(console, "log").mockImplementation((...a: unknown[]) => void outs.push(a.join(" ")));
  vi.spyOn(console, "error").mockImplementation((...a: unknown[]) => void errs.push(a.join(" ")));
  process.exitCode = 0;
  await runCommand(command, { rawArgs });
  return { errs: errs.join("\n"), outs: outs.join("\n"), exitCode: Number(process.exitCode) };
}

let cwd: string;

beforeEach(() => {
  cwd = process.cwd();
  compileCalls.length = 0;
  stubDiagnostics.length = 0;
});

afterEach(() => {
  process.chdir(cwd);
  process.exitCode = 0;
  vi.restoreAllMocks();
  if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
});

describe("check command inputs", () => {
  it("expands a glob and checks every matching file", async () => {
    const dir = resolve(TMP, "glob");
    writeFixture(dir);
    process.chdir(dir);

    const { exitCode } = await run(checkCommand, [
      "src/**/*.ink.tsx",
      "--config",
      "inkline.config.mjs",
    ]);

    expect(exitCode).toBe(0);
    expect(compileCalls).toHaveLength(2);
  });

  it("reports a zero-match pattern instead of throwing ENOENT", async () => {
    const dir = resolve(TMP, "no-match");
    writeFixture(dir);
    process.chdir(dir);

    const { errs, exitCode } = await run(checkCommand, [
      "src/**/*.nonexistent",
      "--config",
      "inkline.config.mjs",
    ]);

    expect(exitCode).toBe(2);
    expect(errs).toContain("no files matched the given patterns");
    expect(compileCalls).toHaveLength(0);
  });
});

/**
 * A config value of the wrong type used to reach the consumers as its declared type and blow up on
 * the first method call — `targets.join`, `barrels.filter`, `srcDir.endsWith` — after the validator
 * had already reported the problem. The commands stop at the boundary instead, so these cases are
 * about the exit being clean, not about any one consumer being hardened.
 */
describe("wrong-typed config values", () => {
  function writeBadConfig(name: string, body: string): string {
    const dir = resolve(TMP, name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "A.ink.tsx"), COMPONENT);
    const configPath = resolve(dir, "inkline.config.mjs");
    writeFileSync(configPath, `export default ${body};\n`);
    process.chdir(dir);
    return configPath;
  }

  it("exits with a diagnostic instead of a TypeError on a string targets", async () => {
    const configPath = writeBadConfig("bad-targets", `{ targets: "react" }`);

    const { errs, exitCode } = await run(checkCommand, ["A.ink.tsx", "--config", configPath]);

    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0083");
    expect(errs).toContain("Invalid config value at targets");
    expect(errs).toContain("the configuration is unusable");
    expect(errs).not.toContain("TypeError");
    expect(compileCalls).toHaveLength(0);
  });

  it.each([
    ["barrels", `{ targets: ["react"], barrels: "index.ts" }`],
    ["srcDir", `{ targets: ["react"], srcDir: 42 }`],
    ["targetOutDir", `{ targets: ["react"], targetOutDir: "out/react" }`],
  ])("stops compile on a wrong-typed %s before it consumes it", async (field, body) => {
    const configPath = writeBadConfig(`bad-${field}`, body);

    const { errs, exitCode } = await run(compileCommand, ["A.ink.tsx", "--config", configPath]);

    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0083");
    expect(errs).toContain(`Invalid config value at ${field}`);
    expect(errs).not.toContain("TypeError");
    expect(compileCalls).toHaveLength(0);
  });

  it("keeps an unknown key non-fatal", async () => {
    const configPath = writeBadConfig(
      "unknown-key",
      `{ targets: ["react"], sourceMaps: "inline" }`,
    );
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const { exitCode } = await run(checkCommand, ["A.ink.tsx", "--config", configPath]);

    expect(exitCode).toBe(0);
    expect(compileCalls).toHaveLength(1);
  });

  // `targetOutDir` and `targetOptions` are records, so zod rejects an unknown target under
  // `invalid_key` rather than `unrecognized_keys`. Same meaning, same non-fatal treatment: a
  // leftover entry for a target that is no longer built is ignored, not a reason to stop.
  it.each([
    ["targetOutDir", `{ targets: ["react"], targetOutDir: { preact: "out/preact" } }`],
    ["targetOptions", `{ targets: ["react"], targetOptions: { preact: { jsx: true } } }`],
  ])("keeps an unknown %s target non-fatal", async (field, body) => {
    const configPath = writeBadConfig(`unknown-${field}-key`, body);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { exitCode } = await run(checkCommand, ["A.ink.tsx", "--config", configPath]);

    expect(exitCode).toBe(0);
    expect(compileCalls).toHaveLength(1);
    expect(warn.mock.calls.flat().join("\n")).toContain(`Unknown config key: ${field}.preact`);
  });
});

describe("check / compile option parity", () => {
  it("builds identical compile options from the same config file", async () => {
    const dir = resolve(TMP, "parity");
    const configPath = writeFixture(dir);
    process.chdir(dir);

    await run(compileCommand, ["src/A.ink.tsx", "--config", configPath]);
    const compileOptions = compileCalls.at(-1);
    compileCalls.length = 0;

    await run(checkCommand, ["src/A.ink.tsx", "--config", configPath]);
    const checkOptions = compileCalls.at(-1);

    expect(compileOptions).toBeDefined();
    // `sourceMap` is the single sanctioned divergence: `check` writes no output, so producing maps
    // would be wasted work. Every other field — notably `tsconfig`, `targetOptions` and `verbose` —
    // must match, or `check` grades against a different program than the build compiles.
    expect(checkOptions).toEqual({ ...compileOptions, sourceMap: "none" });
    expect(checkOptions?.tsconfig).toBe("types.tsconfig.json");
    expect(checkOptions?.targetOptions).toEqual({ react: { forwardRef: true } });
  });

  // The assertion above only ever exercises an omitted `--verbose`, and that is exactly the input
  // where `||` and `??` agree — so it cannot see `check` losing the `??` half of the resolution.
  // Passing the flag is what separates them: under `||` a config `verbose: true` survives
  // `--no-verbose`, which is the defect this pair of commands was just fixed for.
  it("lets --no-verbose override a config verbose: true, matching compile", async () => {
    const dir = resolve(TMP, "verbose-parity");
    const configPath = writeFixture(dir);
    process.chdir(dir);

    await run(compileCommand, ["src/A.ink.tsx", "--config", configPath, "--no-verbose"]);
    const compileOptions = compileCalls.at(-1);
    compileCalls.length = 0;

    await run(checkCommand, ["src/A.ink.tsx", "--config", configPath, "--no-verbose"]);
    const checkOptions = compileCalls.at(-1);

    expect(compileOptions?.verbose).toBe(false);
    expect(checkOptions?.verbose).toBe(false);
  });

  it("reports missing targets as a diagnostic rather than inventing a target set", async () => {
    const dir = resolve(TMP, "no-targets");
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "A.ink.tsx"), COMPONENT);
    const configPath = resolve(dir, "inkline.config.mjs");
    writeFileSync(configPath, `export default {};\n`);
    process.chdir(dir);

    const { errs, exitCode } = await run(checkCommand, ["A.ink.tsx", "--config", configPath]);

    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0084");
    expect(compileCalls).toHaveLength(0);
  });
});

// `check` used to print `result.diagnostics` straight to `console.error`, unfiltered and
// undeduplicated, while `compile` went through `report.ts`. The two commands drifted apart in two
// releases without anything failing, because nothing pinned the claim they both make in their docs:
// that `check` reports what the build reports. These are that pin.
describe("check / compile diagnostic reporting parity", () => {
  it("withholds what a config reportLevel withholds, and says it did", async () => {
    const dir = resolve(TMP, "level-config");
    const configPath = writeFixture(dir, `reportLevel: "error",`);
    process.chdir(dir);
    stubDiagnostics.push(makeDiag({ severity: "warning", code: "INK0010" as Diagnostic["code"] }));

    const { errs, outs, exitCode } = await run(checkCommand, [
      "src/A.ink.tsx",
      "--config",
      configPath,
    ]);

    expect(exitCode).toBe(0);
    expect(errs).not.toContain("INK0010");
    // A bare `0 warnings` cannot be told apart from "there were none", so the line names the finding
    // it hid and the flag that reveals it.
    expect(outs).toContain("1 warning withheld at --report-level error");
  });

  it("reports what --report-level info asks for, overriding the config", async () => {
    const dir = resolve(TMP, "level-flag");
    const configPath = writeFixture(dir, `reportLevel: "error",`);
    process.chdir(dir);
    stubDiagnostics.push(makeDiag({ severity: "info" }));

    const { errs, outs } = await run(checkCommand, [
      "src/A.ink.tsx",
      "--config",
      configPath,
      "--report-level",
      "info",
    ]);

    expect(errs).toContain("INK0068");
    expect(outs).toContain("1 note");
    expect(outs).not.toContain("withheld");
  });

  it("collapses a finding raised in several files into one line", async () => {
    const dir = resolve(TMP, "dedup");
    const configPath = writeFixture(dir);
    process.chdir(dir);
    stubDiagnostics.push(makeDiag({ severity: "warning", code: "INK0010" as Diagnostic["code"] }));

    // Two files, each reporting the same finding at the same position: one call site to fix.
    const { errs, outs } = await run(checkCommand, ["src/**/*.ink.tsx", "--config", configPath]);

    expect(compileCalls).toHaveLength(2);
    expect(errs.split("INK0010")).toHaveLength(2);
    expect(outs).toContain("Checked 2 files");
  });

  it("prints the diagnostics compile prints, byte for byte", async () => {
    const dir = resolve(TMP, "report-parity");
    const configPath = writeFixture(dir);
    process.chdir(dir);
    stubDiagnostics.push(
      makeDiag({ severity: "warning", code: "INK0010" as Diagnostic["code"] }),
      makeDiag({ severity: "warning", code: "INK0010" as Diagnostic["code"] }),
      makeDiag({ severity: "info" }),
    );

    const compiled = await run(compileCommand, ["src/**/*.ink.tsx", "--config", configPath]);
    const checked = await run(checkCommand, ["src/**/*.ink.tsx", "--config", configPath]);

    // The duplicate collapses and the `info` note is withheld at the shared `warning` default —
    // whichever command you ask, and without either one naming a level.
    expect(checked.errs).toBe(compiled.errs);
    expect(checked.errs).toContain("INK0010");
    expect(checked.errs).not.toContain("INK0068");
  });

  it("fails the check on an error the reporting level hid", async () => {
    const dir = resolve(TMP, "error-exit");
    const configPath = writeFixture(dir);
    process.chdir(dir);
    // No level can hide an error today; the exit status is computed before filtering so that stays
    // true if one ever can.
    stubDiagnostics.push(makeDiag({ severity: "error", code: "INK0001" as Diagnostic["code"] }));

    const { exitCode } = await run(checkCommand, ["src/A.ink.tsx", "--config", configPath]);

    expect(exitCode).toBe(1);
  });

  it("reports an unusable --report-level as INK0087 before reading a file", async () => {
    const dir = resolve(TMP, "bad-level");
    const configPath = writeFixture(dir);
    process.chdir(dir);

    const { errs, exitCode } = await run(checkCommand, [
      "src/A.ink.tsx",
      "--config",
      configPath,
      "--report-level",
      "waring",
    ]);

    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0087");
    expect(compileCalls).toHaveLength(0);
  });
});
