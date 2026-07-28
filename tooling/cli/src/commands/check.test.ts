import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCommand, type ArgsDef, type CommandDef } from "citty";
import type { InklineConfig } from "@inkline/compiler";

// `check` and `compile` are exercised in-process against a stubbed `compile()` so the option bag each
// one hands the compiler can be captured and compared directly. The point of these tests is the
// plumbing between config file and compiler, not the compilation itself.
const { compileCalls } = vi.hoisted(() => ({
  compileCalls: [] as Partial<InklineConfig>[],
}));

vi.mock("@inkline/compiler", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inkline/compiler")>();
  return {
    ...actual,
    compile: async (_input: unknown, options: Partial<InklineConfig>) => {
      compileCalls.push(options);
      return { files: {}, diagnostics: [] };
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

/** A config that sets every field the CLI is expected to forward to the compiler. */
function writeFixture(dir: string): string {
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
    };\n`,
  );
  return configPath;
}

async function run<T extends ArgsDef>(
  command: CommandDef<T>,
  rawArgs: string[],
): Promise<{ errs: string; exitCode: number }> {
  const errs: string[] = [];
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation((...a: unknown[]) => void errs.push(a.join(" ")));
  process.exitCode = 0;
  await runCommand(command, { rawArgs });
  return { errs: errs.join("\n"), exitCode: Number(process.exitCode) };
}

let cwd: string;

beforeEach(() => {
  cwd = process.cwd();
  compileCalls.length = 0;
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
