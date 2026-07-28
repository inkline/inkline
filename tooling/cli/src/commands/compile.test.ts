import { describe, it, expect, afterEach, vi } from "vitest";
import {
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync,
  existsSync,
  type FSWatcher,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCommand } from "citty";
import type { GeneratedFile } from "@inkline/storybook/generator";
import type { BarrelGroup } from "@inkline/compiler";
import compile, { flushNamedBarrels, seedNamedBarrels, writeNamespaceBarrels } from "./compile.ts";
import type { BarrelMap, BarrelEntry } from "../lib/barrel.ts";

// compile.ts is exercised in-process here (not via a subprocess like inkline.test.ts) so that the
// command's logic — barrel routing, story generation, watch-mode rebuilds — is actually instrumented
// for coverage. inkline.test.ts remains the end-to-end check that the published binary wires up.

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES = resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "core",
  "compiler",
  "src",
  "__fixtures__",
);
const TMP = resolve(__dirname, "..", "..", ".tmp-compile-unit");

const STYLED_HEADLESS: BarrelGroup[] = [
  { file: "index.ts", match: "styled" },
  { file: "headless.ts", match: "headless" },
];

const COMPONENT = `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <button />);\n`;

function tmpDir(name: string): string {
  const dir = resolve(TMP, name);
  mkdirSync(dir, { recursive: true });
  return dir;
}

function entry(componentName: string, fileName: string): BarrelEntry {
  return { componentName, fileName, target: "react" };
}

/** Run the compile command in-process, capturing console output and the resulting process exit code. */
async function runCompile(rawArgs: string[]): Promise<{
  logs: string;
  errs: string;
  result: unknown;
  exitCode: number;
}> {
  const logs: string[] = [];
  const errs: string[] = [];
  vi.spyOn(console, "log").mockImplementation((...a: unknown[]) => void logs.push(a.join(" ")));
  vi.spyOn(console, "error").mockImplementation((...a: unknown[]) => void errs.push(a.join(" ")));
  process.exitCode = 0;
  const { result } = await runCommand(compile, { rawArgs });
  return {
    logs: logs.join("\n"),
    errs: errs.join("\n"),
    result,
    exitCode: Number(process.exitCode),
  };
}

function waitFor(predicate: () => boolean, timeoutMs = 8000): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const start = performance.now();
    const tick = () => {
      if (predicate()) return resolvePromise();
      if (performance.now() - start > timeoutMs) return reject(new Error("waitFor: timed out"));
      setTimeout(tick, 25);
    };
    tick();
  });
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * macOS recursive `fs.watch` arms asynchronously: a mutation issued in the same tick the watcher is
 * created can land before the OS-level watch registers, dropping the change event so the rebuild
 * never fires and `waitFor` times out. Let the watcher settle before the first write. (Only the first
 * write races — once a `waitFor` poll loop has run, the watcher is long since armed.)
 */
const WATCHER_SETTLE_MS = 100;

afterEach(() => {
  // A leaked non-zero exit code would fail the whole vitest process; always reset it.
  process.exitCode = 0;
  vi.restoreAllMocks();
  if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
});

describe("seedNamedBarrels", () => {
  it("seeds missing barrels with empty arrays and leaves populated ones untouched", () => {
    const dir = resolve("/out/react");
    const map: BarrelMap = new Map([[dir, new Map([["index.ts", [entry("A", "A.tsx")]]])]]);

    seedNamedBarrels(map, STYLED_HEADLESS);

    const byFile = map.get(dir)!;
    expect(byFile.get("index.ts")!.map((e) => e.componentName)).toEqual(["A"]);
    expect(byFile.get("headless.ts")).toEqual([]);
  });
});

describe("flushNamedBarrels", () => {
  it("seeds, then writes every barrel through the injected writer", () => {
    const dir = resolve("/out/react");
    const map: BarrelMap = new Map([[dir, new Map([["index.ts", [entry("B", "B.tsx")]]])]]);
    const writes = new Map<string, string>();

    flushNamedBarrels(map, STYLED_HEADLESS, (p, c) => writes.set(p, c));

    expect(writes.get(resolve(dir, "index.ts"))).toBe("export { B } from './B.tsx';\n");
    // The unmatched `headless` group is seeded empty and still written, so its build entry resolves.
    expect(writes.get(resolve(dir, "headless.ts"))).toBe("\n");
  });
});

describe("writeNamespaceBarrels", () => {
  it("writes one namespace barrel per target, empty for targets with no stories", () => {
    const reactDir = resolve("/out/react");
    const vueDir = resolve("/out/vue");
    const files = [
      {
        target: "react",
        path: resolve(reactDir, "components/x/stories/IX.stories.ts"),
        contents: "",
      },
    ] as unknown as GeneratedFile[];
    const writes = new Map<string, string>();

    writeNamespaceBarrels(
      files,
      ["react", "vue"],
      "dist",
      { react: reactDir, vue: vueDir },
      { file: "stories.ts", match: "stories", mode: "namespace" },
      (p, c) => writes.set(p, c),
    );

    expect(writes.get(resolve(reactDir, "stories.ts"))).toBe(
      "export * as IXStories from './components/x/stories/IX.stories.ts';\n",
    );
    expect(writes.get(resolve(vueDir, "stories.ts"))).toBe("\n");
  });
});

describe("compile command (in-process)", () => {
  it("compiles a component and writes the default index.ts barrel", async () => {
    const out = tmpDir("happy");

    const { exitCode } = await runCompile([
      resolve(FIXTURES, "Counter.ink.tsx"),
      "--target",
      "react",
      "--out-dir",
      out,
    ]);

    expect(exitCode).toBe(0);
    expect(existsSync(resolve(out, "react", "Counter.tsx"))).toBe(true);
    expect(readFileSync(resolve(out, "react", "index.ts"), "utf-8")).toContain(
      "export { Counter }",
    );
  });

  it("exits 2 when no target is given via flag or config", async () => {
    const { exitCode, errs } = await runCompile([resolve(FIXTURES, "Counter.ink.tsx")]);
    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0084");
    expect(errs).toContain("No compilation target specified");
  });

  it("exits 2 with a suggestion when the target is misspelled", async () => {
    const { exitCode, errs } = await runCompile([
      resolve(FIXTURES, "Counter.ink.tsx"),
      "--target",
      "reakt",
    ]);
    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0085");
    expect(errs).toContain('Did you mean "react"?');
  });

  it("exits 2 when the pattern matches no files", async () => {
    const { exitCode, errs } = await runCompile([
      resolve(TMP, "does-not-exist", "*.ink.tsx"),
      "--target",
      "react",
    ]);
    expect(exitCode).toBe(2);
    expect(errs).toContain("no files matched");
  });

  it("exits 1 and reports the diagnostic when compilation errors", async () => {
    const out = tmpDir("diag");
    const { exitCode, errs } = await runCompile([
      resolve(FIXTURES, "Diag_ShowNoWhen.ink.tsx"),
      "--target",
      "react",
      "--out-dir",
      out,
    ]);
    expect(exitCode).toBe(1);
    expect(errs.length).toBeGreaterThan(0);
  });

  it("reports the info-level INK0045 notice on a one-shot astro build", async () => {
    const out = tmpDir("astro-info");
    const { exitCode, errs } = await runCompile([
      resolve(FIXTURES, "ModelInput.ink.tsx"),
      "--target",
      "astro",
      "--out-dir",
      out,
    ]);
    // INK0045 is info, not error — it prints but does not fail the build.
    expect(exitCode).toBe(0);
    expect(errs).toContain("INK0045");
  });

  it("cleans target directories before compiling", async () => {
    const out = tmpDir("clean");
    mkdirSync(resolve(out, "react"), { recursive: true });
    writeFileSync(resolve(out, "react", "stale.tsx"), "// stale");

    await runCompile([resolve(FIXTURES, "Counter.ink.tsx"), "--target", "react", "--out-dir", out]);

    expect(existsSync(resolve(out, "react", "stale.tsx"))).toBe(false);
    expect(existsSync(resolve(out, "react", "Counter.tsx"))).toBe(true);
  });

  it("keeps existing output when --no-clean is passed", async () => {
    const out = tmpDir("no-clean");
    mkdirSync(resolve(out, "react"), { recursive: true });
    writeFileSync(resolve(out, "react", "keep.tsx"), "// keep");

    await runCompile([
      resolve(FIXTURES, "Counter.ink.tsx"),
      "--target",
      "react",
      "--out-dir",
      out,
      "--no-clean",
    ]);

    expect(existsSync(resolve(out, "react", "keep.tsx"))).toBe(true);
  });

  it("splits styled / headless components and writes a namespace stories barrel", async () => {
    const configDir = tmpDir("split");
    const srcDir = resolve(configDir, "src");
    // Output must be shaped `<root>/<target>/<storiesDir>` so the story generator (which derives
    // root + storiesDir from the output dir) writes the generated CSF files back into it.
    const reactDir = resolve(configDir, "out", "react", ".inkline");
    const buttonDir = resolve(srcDir, "components", "button");
    const styledDir = resolve(buttonDir, "styled");
    const headlessDir = resolve(buttonDir, "headless");
    const storiesDir = resolve(buttonDir, "stories");
    mkdirSync(styledDir, { recursive: true });
    mkdirSync(headlessDir, { recursive: true });
    mkdirSync(storiesDir, { recursive: true });
    writeFileSync(resolve(styledDir, "IButton.ink.tsx"), COMPONENT);
    writeFileSync(resolve(headlessDir, "IButtonBase.ink.tsx"), COMPONENT);
    writeFileSync(
      resolve(storiesDir, "IButton.ink.stories.ts"),
      `export default { component: "IButton", title: "Components/Button" };\nexport const Default = {};\n`,
    );
    const configPath = resolve(configDir, "inkline.config.mjs");
    writeFileSync(
      configPath,
      `export default {
        srcDir: ${JSON.stringify(srcDir)},
        targets: ["react"],
        targetOutDir: { react: ${JSON.stringify(reactDir)} },
        barrels: [
          { file: "index.ts", match: "styled" },
          { file: "headless.ts", match: "headless" },
          { file: "stories.ts", match: "stories", mode: "namespace" },
        ],
      };\n`,
    );

    const { exitCode } = await runCompile([
      resolve(styledDir, "IButton.ink.tsx"),
      resolve(headlessDir, "IButtonBase.ink.tsx"),
      "--config",
      configPath,
    ]);

    expect(exitCode).toBe(0);

    const styled = readFileSync(resolve(reactDir, "index.ts"), "utf-8");
    expect(styled).toContain("export { IButton }");
    expect(styled).not.toContain("IButtonBase");

    expect(readFileSync(resolve(reactDir, "headless.ts"), "utf-8")).toContain(
      "export { IButtonBase }",
    );
    expect(readFileSync(resolve(reactDir, "stories.ts"), "utf-8")).toContain(
      "export * as IButtonStories from './components/button/stories/IButton.stories.ts';",
    );
  });
});

describe("compile command --out-dir precedence", () => {
  const SOURCE = () => resolve(FIXTURES, "Counter.ink.tsx");

  function writeOutDirConfig(dir: string, outDir: string): string {
    const configPath = resolve(dir, "inkline.config.mjs");
    writeFileSync(configPath, `export default { outDir: ${JSON.stringify(outDir)} };\n`);
    return configPath;
  }

  it("prefers the --out-dir flag over the config file's outDir", async () => {
    const base = tmpDir("out-dir-flag");
    const fromConfig = resolve(base, "a");
    const fromFlag = resolve(base, "b");
    const configPath = writeOutDirConfig(base, fromConfig);

    const { exitCode } = await runCompile([
      SOURCE(),
      "--target",
      "react",
      "--config",
      configPath,
      "--out-dir",
      fromFlag,
    ]);

    expect(exitCode).toBe(0);
    expect(existsSync(resolve(fromFlag, "react", "Counter.tsx"))).toBe(true);
    expect(existsSync(fromConfig)).toBe(false);
  });

  it("falls back to the config file's outDir when the flag is absent", async () => {
    const base = tmpDir("out-dir-config");
    const fromConfig = resolve(base, "a");
    const configPath = writeOutDirConfig(base, fromConfig);

    const { exitCode } = await runCompile([SOURCE(), "--target", "react", "--config", configPath]);

    expect(exitCode).toBe(0);
    expect(existsSync(resolve(fromConfig, "react", "Counter.tsx"))).toBe(true);
  });

  it("falls back to dist when neither the flag nor the config sets an output directory", async () => {
    // `dist` resolves against the process cwd, so run from an empty temp dir that also has no
    // discoverable inkline.config.* — otherwise the repo's own config/dist would be in play.
    const base = tmpDir("out-dir-default");
    const cwd = process.cwd();
    process.chdir(base);
    try {
      const { exitCode } = await runCompile([SOURCE(), "--target", "react"]);
      expect(exitCode).toBe(0);
      expect(existsSync(resolve(base, "dist", "react", "Counter.tsx"))).toBe(true);
    } finally {
      process.chdir(cwd);
    }
  });
});

describe("compile command --source-map precedence", () => {
  const SOURCE = () => resolve(FIXTURES, "Counter.ink.tsx");
  const INLINE_MARKER = "//# sourceMappingURL=data:application/json;base64,";

  /**
   * Compile into a fresh output directory and report the two observable outcomes: an inline map is
   * appended to the emitted file, an external one is written beside it as `.map`, and `none` leaves
   * neither. Reading the artifacts keeps this a black-box check of what the user actually gets.
   */
  async function compileWith(
    name: string,
    extraArgs: string[],
    configSourceMap?: string,
  ): Promise<{ contents: string; hasExternalMap: boolean }> {
    const base = tmpDir(name);
    const outDir = resolve(base, "out");
    const args = [SOURCE(), "--target", "react", "--out-dir", outDir, ...extraArgs];

    if (configSourceMap !== undefined) {
      const configPath = resolve(base, "inkline.config.mjs");
      writeFileSync(
        configPath,
        `export default { sourceMap: ${JSON.stringify(configSourceMap)} };\n`,
      );
      args.push("--config", configPath);
    }

    const { exitCode } = await runCompile(args);
    expect(exitCode).toBe(0);

    const outFile = resolve(outDir, "react", "Counter.tsx");
    return {
      contents: readFileSync(outFile, "utf-8"),
      hasExternalMap: existsSync(`${outFile}.map`),
    };
  }

  // The citty `default: "external"` used to make `args["source-map"]` permanently defined, so this
  // branch of the chain was unreachable and a config `sourceMap` was silently ignored.
  it("uses the config file's sourceMap when no flag is passed", async () => {
    const { contents, hasExternalMap } = await compileWith("source-map-config", [], "inline");
    expect(contents).toContain(INLINE_MARKER);
    expect(hasExternalMap).toBe(false);
  });

  it("prefers --source-map over the config file's sourceMap", async () => {
    const { contents, hasExternalMap } = await compileWith(
      "source-map-flag",
      ["--source-map", "none"],
      "inline",
    );
    expect(contents).not.toContain(INLINE_MARKER);
    expect(hasExternalMap).toBe(false);
  });

  it("falls back to external when neither the flag nor the config sets sourceMap", async () => {
    const { contents, hasExternalMap } = await compileWith("source-map-default", []);
    expect(hasExternalMap).toBe(true);
    expect(contents).not.toContain(INLINE_MARKER);
  });

  it("honours --source-map when the config is silent", async () => {
    const { contents } = await compileWith("source-map-flag-only", ["--source-map", "inline"]);
    expect(contents).toContain(INLINE_MARKER);
  });
});

describe("compile command --verbose precedence", () => {
  const SOURCE = () => resolve(FIXTURES, "Counter.ink.tsx");
  /** `reportConfigError` prints the error stack only when `verbose` resolved true. */
  const STACK_FRAME = "\n    at ";

  /**
   * Resolve `verbose` observably: a misspelled `--target` routes through `reportConfigError`, which
   * appends the stack trace only under verbose. A config `verbose: true` is present in every case so
   * the flag's ability to override it is what is under test.
   */
  async function stackShown(name: string, extraArgs: string[]): Promise<boolean> {
    const base = tmpDir(name);
    const configPath = resolve(base, "inkline.config.mjs");
    writeFileSync(configPath, `export default { verbose: true };\n`);

    const { exitCode, errs } = await runCompile([
      SOURCE(),
      "--target",
      "reakt",
      "--config",
      configPath,
      ...extraArgs,
    ]);

    expect(exitCode).toBe(2);
    expect(errs).toContain("INK0085");
    return errs.includes(STACK_FRAME);
  }

  it("uses the config file's verbose when no flag is passed", async () => {
    expect(await stackShown("verbose-config", [])).toBe(true);
  });

  // With the old citty `default: false`, `--no-verbose` was indistinguishable from an omitted flag,
  // so a config `verbose: true` could never be switched off from the command line.
  it("lets --no-verbose override a config verbose: true", async () => {
    expect(await stackShown("verbose-no-flag", ["--no-verbose"])).toBe(false);
  });

  it("honours --verbose", async () => {
    expect(await stackShown("verbose-flag", ["--verbose"])).toBe(true);
  });
});

describe("compile command watch mode", () => {
  it("rebuilds on a component change and regenerates stories on a story change", async () => {
    const configDir = tmpDir("watch");
    const srcDir = resolve(configDir, "src");
    const reactDir = resolve(configDir, "out", "react", ".inkline");
    const widgetDir = resolve(srcDir, "components", "widget");
    const styledDir = resolve(widgetDir, "styled");
    const storiesDir = resolve(widgetDir, "stories");
    mkdirSync(styledDir, { recursive: true });
    mkdirSync(storiesDir, { recursive: true });
    const componentFile = resolve(styledDir, "IWidget.ink.tsx");
    const storiesFile = resolve(storiesDir, "IWidget.ink.stories.ts");
    writeFileSync(componentFile, COMPONENT);
    writeFileSync(
      storiesFile,
      `export default { component: "IWidget", title: "Components/Widget" };\nexport const Default = {};\n`,
    );
    const configPath = resolve(configDir, "inkline.config.mjs");
    writeFileSync(
      configPath,
      `export default {
        srcDir: ${JSON.stringify(srcDir)},
        targets: ["react"],
        targetOutDir: { react: ${JSON.stringify(reactDir)} },
        barrels: [
          { file: "index.ts", match: "styled" },
          { file: "stories.ts", match: "stories", mode: "namespace" },
        ],
      };\n`,
    );

    const logs: string[] = [];
    vi.spyOn(console, "log").mockImplementation((...a: unknown[]) => void logs.push(a.join(" ")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    process.exitCode = 0;

    const { result } = await runCommand(compile, {
      rawArgs: [componentFile, "--config", configPath, "--watch"],
    });
    const watcher = result as FSWatcher;

    try {
      await delay(WATCHER_SETTLE_MS);
      // 1. A component edit triggers an incremental rebuild.
      logs.length = 0;
      writeFileSync(
        componentFile,
        `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <section />);\n`,
      );
      await waitFor(() => logs.some((l) => l.includes("Rebuilt")));
      expect(
        readFileSync(resolve(reactDir, "components/widget/styled/IWidget.tsx"), "utf-8"),
      ).toContain("section");

      // 2. A story edit triggers story regeneration.
      logs.length = 0;
      writeFileSync(
        storiesFile,
        `export default { component: "IWidget", title: "Components/Widget" };\nexport const Default = {};\nexport const Second = {};\n`,
      );
      await waitFor(() => logs.some((l) => l.includes("story file")));
    } finally {
      watcher.close();
      // Let any debounced rebuild/story timers fire before the temp dir is removed in afterEach.
      await delay(300);
    }
  });
});

describe("compile command watch mode: dev reporting level", () => {
  // Compiled to astro this emits both the info-level INK0045 notice (two-way binding) and a
  // warning-level INK0010 (the effect has no reactive deps). The watch loop reports only warning+,
  // so on the initial compile and every rebuild it must drop INK0045 but keep INK0010.
  const MODEL = (tag: string) =>
    `import { defineComponent, defineModel, createEffect } from "@inkline/core";
export default defineComponent(() => {
  const [value, setValue] = defineModel<string>("value");
  createEffect(() => {
    console.log("static");
  });
  return <${tag} value={value()} onInput={(e) => setValue(e.target.value)} />;
});
`;

  it("drops info (INK0045) but keeps warnings (INK0010) across initial compile and rebuilds", async () => {
    const configDir = tmpDir("watch-astro");
    const srcDir = resolve(configDir, "src");
    const astroDir = resolve(configDir, "out", "astro", ".inkline");
    const fieldDir = resolve(srcDir, "components", "field", "styled");
    mkdirSync(fieldDir, { recursive: true });
    const componentFile = resolve(fieldDir, "IField.ink.tsx");
    writeFileSync(componentFile, MODEL("input"));
    const configPath = resolve(configDir, "inkline.config.mjs");
    writeFileSync(
      configPath,
      `export default {
        srcDir: ${JSON.stringify(srcDir)},
        targets: ["astro"],
        targetOutDir: { astro: ${JSON.stringify(astroDir)} },
        barrels: [{ file: "index.ts", match: "styled" }],
      };\n`,
    );

    const logs: string[] = [];
    const errs: string[] = [];
    vi.spyOn(console, "log").mockImplementation((...a: unknown[]) => void logs.push(a.join(" ")));
    vi.spyOn(console, "error").mockImplementation((...a: unknown[]) => void errs.push(a.join(" ")));
    process.exitCode = 0;

    const { result } = await runCommand(compile, {
      rawArgs: [componentFile, "--config", configPath, "--watch"],
    });
    const watcher = result as FSWatcher;

    try {
      // Initial compile already ran (in watch mode): the info notice is filtered, the warning shows.
      expect(errs.join("\n")).not.toContain("INK0045");
      expect(errs.join("\n")).toContain("INK0010");

      await delay(WATCHER_SETTLE_MS);
      // A rebuild re-emits both; INK0045 stays filtered while the warning still surfaces.
      logs.length = 0;
      errs.length = 0;
      writeFileSync(componentFile, MODEL("textarea"));
      await waitFor(() => logs.some((l) => l.includes("Rebuilt")));
      expect(errs.join("\n")).not.toContain("INK0045");
      expect(errs.join("\n")).toContain("INK0010");
    } finally {
      watcher.close();
      await delay(300);
    }
  });
});
