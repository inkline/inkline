import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  existsSync,
  rmSync,
  writeFileSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  symlinkSync,
} from "node:fs";
import { renderUsage } from "citty";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_PATH = resolve(__dirname, "inkline.ts");
const FIXTURES_DIR = resolve(
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
const TMP_OUT = resolve(__dirname, "..", "..", ".tmp-cli-test");

const PACKAGE_DIR = resolve(__dirname, "..", "..");

function run(...args: string[]): {
  stdout: string;
  stderr: string;
  output: string;
  status: number;
} {
  return runIn(PACKAGE_DIR, ...args);
}

/**
 * Run the CLI from a chosen working directory. Anything asserting on paths that resolve *from* the
 * cwd — the `--clean` guard below — must run from a throwaway directory, not the package: a
 * regression in the guard deletes whatever the cwd is.
 */
function runIn(
  cwd: string,
  ...args: string[]
): { stdout: string; stderr: string; output: string; status: number } {
  const result = spawnSync(process.execPath, ["--import", "tsx", CLI_PATH, ...args], {
    encoding: "utf-8",
    cwd,
    timeout: 30_000,
  });
  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  return {
    stdout,
    stderr,
    output: stdout + stderr,
    status: result.status ?? 1,
  };
}

describe("inkline CLI help", () => {
  // Spawns the real binary rather than re-declaring the subcommand map, so the assertion is
  // about what users see and cannot drift from `src/index.ts`.
  it("root help shows the wired commands and nothing that is unimplemented", () => {
    const { output, status } = run("--help");
    expect(status).toBe(0);
    expect(output).toContain("compile");
    expect(output).toContain("check");
    expect(output).toContain("init");
    expect(output).not.toMatch(/\badd\b/);
  });

  it("compile help shows options", async () => {
    const { default: compile } = await import("../commands/compile.ts");
    const usage = await renderUsage(compile);
    expect(usage).toContain("--target");
    expect(usage).toContain("--out-dir");
    expect(usage).toContain("--config");
  });
});

describe("compile", () => {
  it("reports a missing target as a diagnostic", () => {
    const { output, status } = run("compile", resolve(FIXTURES_DIR, "Counter.ink.tsx"));
    expect(status).toBe(2);
    expect(output).toContain("INK0084");
    expect(output).toContain("No compilation target specified");
    expect(output).toContain("react, solid, vue, svelte, angular, qwik, astro");
    expect(output).not.toMatch(/\n\s+at /);
  });

  it("reports an unknown target as a diagnostic with a suggestion", () => {
    const { output, status } = run(
      "compile",
      resolve(FIXTURES_DIR, "Counter.ink.tsx"),
      "--target",
      "reakt",
    );
    expect(status).toBe(2);
    expect(output).toContain("INK0085");
    expect(output).toContain('Unknown target "reakt"');
    expect(output).toContain('Did you mean "react"?');
    expect(output).toContain("react, solid, vue, svelte, angular, qwik, astro");
    expect(output).not.toContain("dist/index.mjs");
    expect(output).not.toMatch(/\n\s+at /);
  });

  it("omits the suggestion when nothing is close", () => {
    const { output, status } = run(
      "compile",
      resolve(FIXTURES_DIR, "Counter.ink.tsx"),
      "--target",
      "nuxt",
    );
    expect(status).toBe(2);
    expect(output).toContain('Unknown target "nuxt"');
    expect(output).not.toContain("Did you mean");
  });

  it("surfaces the underlying stack under --verbose", () => {
    const { output, status } = run(
      "compile",
      resolve(FIXTURES_DIR, "Counter.ink.tsx"),
      "--target",
      "reakt",
      "--verbose",
    );
    expect(status).toBe(2);
    expect(output).toContain("INK0085");
    expect(output).toContain("InklineConfigError");
    expect(output).toMatch(/\n\s+at /);
  });

  it("rejects a bad target before --clean touches the output directory", () => {
    const outDir = resolve(TMP_OUT, "clean-guard-test");
    const canary = resolve(outDir, "react", "keep-me.txt");
    try {
      mkdirSync(resolve(outDir, "react"), { recursive: true });
      writeFileSync(canary, "canary", "utf-8");

      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--target",
        "react,reakt",
        "--out-dir",
        outDir,
        "--clean",
      );
      expect(status).toBe(2);
      expect(existsSync(canary)).toBe(true);
    } finally {
      if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true });
    }
  });

  /**
   * The bad-target canary above guards the `resolveOptions` stop, which a wrong-typed config value
   * never reaches. Before the config check moved ahead of `--clean`, `targetOutDir: { react: 42 }`
   * validated as a warning, cleaned `vue` on the way past, and only then threw on `resolve(42)` —
   * so a config that failed validation had already deleted a directory. Reordering the stop is the
   * whole fix, and nothing else in the suite fails if it moves back: the command never compiles in
   * either arrangement.
   */
  it("rejects a wrong-typed targetOutDir before --clean touches any output directory", () => {
    const dir = resolve(TMP_OUT, "clean-guard-config");
    const outDir = resolve(dir, "out");
    const configPath = resolve(dir, "inkline.config.mjs");
    const canaries = [
      resolve(outDir, "react", "keep-me.txt"),
      resolve(outDir, "vue", "keep-me.txt"),
    ];
    try {
      for (const canary of canaries) {
        mkdirSync(dirname(canary), { recursive: true });
        writeFileSync(canary, "canary", "utf-8");
      }
      // `vue` is listed first so it would be cleaned before `react` throws on `resolve(42)`.
      writeFileSync(
        configPath,
        'export default { targets: ["vue", "react"], targetOutDir: { react: 42 } };\n',
        "utf-8",
      );

      const { output, status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--config",
        configPath,
        "--out-dir",
        outDir,
        "--clean",
      );

      expect(status).toBe(2);
      expect(output).toContain("INK0083");
      expect(output).not.toContain("TypeError");
      for (const canary of canaries) expect(existsSync(canary)).toBe(true);
    } finally {
      if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true });
    }
  });

  /**
   * The two stops above catch a config that fails *validation*. These catch the one that passes it:
   * `""` and `"/"` are valid `z.string()` values, so nothing upstream objects, and `--clean`
   * (default on) used to hand the resolved path straight to `rmSync(…, { recursive: true, force:
   * true })`. `targetOutDir: { react: "" }` resolved to the working directory and deleted the
   * user's sources, README and the config itself before the command failed on its own missing input.
   *
   * Each case runs from its own throwaway directory and asserts both halves: the canary survives
   * *and* the exit is non-zero. Only the first is a regression test — a `--clean` that silently
   * declined to clean would also leave the canary, and that is not the fix.
   */
  describe("--clean path guard", () => {
    const cases = [
      {
        name: "an empty targetOutDir (resolves to the working directory)",
        config: 'export default { targets: ["react"], targetOutDir: { react: "" } };\n',
        reason: "it is the current working directory",
      },
      {
        name: "a root targetOutDir",
        config: 'export default { targets: ["react"], targetOutDir: { react: "/" } };\n',
        reason: "it is the filesystem root",
      },
      {
        name: "an empty outDir (resolves the target outside the project)",
        config: 'export default { targets: ["react"], outDir: "" };\n',
        reason: "it is outside the output directory",
      },
    ];

    for (const { name, config, reason } of cases) {
      it(`refuses to clean and exits non-zero for ${name}`, () => {
        const projectDir = resolve(TMP_OUT, "clean-guard", name.replace(/\W+/g, "-"));
        const canary = resolve(projectDir, "do-not-delete.txt");
        const configPath = resolve(projectDir, "inkline.config.mjs");
        try {
          mkdirSync(projectDir, { recursive: true });
          writeFileSync(canary, "canary", "utf-8");
          writeFileSync(configPath, config, "utf-8");

          const { output, status } = runIn(
            projectDir,
            "compile",
            resolve(FIXTURES_DIR, "Counter.ink.tsx"),
            "--config",
            configPath,
            "--clean",
          );

          expect(status).toBe(2);
          expect(output).toContain("refusing to clean");
          expect(output).toContain(reason);
          expect(output).toContain("Nothing was deleted");
          expect(existsSync(canary)).toBe(true);
          expect(existsSync(configPath)).toBe(true);
        } finally {
          if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true, force: true });
        }
      });
    }

    /**
     * A second name for the working directory, built on purpose, because the guard's first version
     * compared `resolve()`d strings and every other test here spells the project exactly the way
     * `process.cwd()` reports it. macOS hands out such a second name by default — `/tmp` →
     * `/private/tmp`, `/var` → `/private/var` — so `targetOutDir: { react: "/tmp/proj" }` walked
     * past a guard that refuses the identical `/private/tmp/proj`, and took the sources, the README
     * and the config with it.
     */
    it("refuses to clean the working directory named through a symlink", () => {
      const root = resolve(TMP_OUT, "clean-guard-symlink");
      const projectDir = resolve(root, "project");
      const alias = resolve(root, "project-alias");
      const canary = resolve(projectDir, "do-not-delete.txt");
      const configPath = resolve(projectDir, "inkline.config.mjs");
      try {
        mkdirSync(projectDir, { recursive: true });
        symlinkSync(projectDir, alias);
        writeFileSync(canary, "canary", "utf-8");
        // The alias must really be a different string, or the test proves nothing.
        expect(alias).not.toBe(realpathSync(alias));
        writeFileSync(
          configPath,
          `export default { targets: ["react"], targetOutDir: { react: ${JSON.stringify(alias)} } };\n`,
          "utf-8",
        );

        const { output, status } = runIn(
          projectDir,
          "compile",
          resolve(FIXTURES_DIR, "Counter.ink.tsx"),
          "--config",
          configPath,
          "--clean",
        );

        expect(status).toBe(2);
        expect(output).toContain("refusing to clean");
        expect(output).toContain("it is the current working directory");
        expect(output).toContain("real path");
        expect(output).toContain("Nothing was deleted");
        expect(existsSync(canary)).toBe(true);
        expect(existsSync(configPath)).toBe(true);
      } finally {
        if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true, force: true });
      }
    });

    // AC of the fix, and what stops the guard from being written as "inside outDir or nothing":
    // an absolute per-target override is a documented feature, and `ui/components/inkline.config.ts`
    // points every one of its targets outside `outDir`. Those still clean.
    it("still cleans an absolute targetOutDir outside outDir", () => {
      const projectDir = resolve(TMP_OUT, "clean-guard-override");
      const reactDir = resolve(projectDir, "elsewhere", "react");
      const configPath = resolve(projectDir, "inkline.config.mjs");
      const stale = resolve(reactDir, "stale.tsx");
      try {
        mkdirSync(reactDir, { recursive: true });
        writeFileSync(stale, "// stale", "utf-8");
        writeFileSync(
          configPath,
          `export default {
            targets: ["react"],
            outDir: ${JSON.stringify(resolve(projectDir, "dist"))},
            targetOutDir: { react: ${JSON.stringify(reactDir)} },
          };\n`,
          "utf-8",
        );

        const { status } = runIn(
          projectDir,
          "compile",
          resolve(FIXTURES_DIR, "Counter.ink.tsx"),
          "--config",
          configPath,
          "--clean",
        );

        expect(status).toBe(0);
        expect(existsSync(stale)).toBe(false);
        expect(existsSync(resolve(reactDir, "Counter.tsx"))).toBe(true);
      } finally {
        if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true, force: true });
      }
    });
  });

  it("compiles with --target react", () => {
    try {
      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--target",
        "react",
        "--out-dir",
        TMP_OUT,
      );
      expect(status).toBe(0);
      expect(existsSync(resolve(TMP_OUT, "react", "Counter.tsx"))).toBe(true);
    } finally {
      if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true });
    }
  });

  it("loads targets from config file", () => {
    const configDir = resolve(TMP_OUT, "config-test");
    const configPath = resolve(configDir, "inkline.config.mjs");
    const outDir = resolve(configDir, "out");
    try {
      mkdirSync(configDir, { recursive: true });
      writeFileSync(
        configPath,
        `export default { targets: ["react"], outDir: ${JSON.stringify(outDir)} };\n`,
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("routes output with targetOutDir", () => {
    const configDir = resolve(TMP_OUT, "target-out-dir-test");
    const reactDir = resolve(configDir, "react-out");
    const vueDir = resolve(configDir, "vue-out");
    const configPath = resolve(configDir, "inkline.config.mjs");
    try {
      mkdirSync(configDir, { recursive: true });
      writeFileSync(
        configPath,
        `export default {
          targets: ["react", "vue"],
          targetOutDir: {
            react: ${JSON.stringify(reactDir)},
            vue: ${JSON.stringify(vueDir)},
          },
        };\n`,
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);
      expect(existsSync(resolve(reactDir, "Counter.tsx"))).toBe(true);
      expect(existsSync(resolve(vueDir, "Counter.vue"))).toBe(true);
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("generates barrel index.ts per target directory", () => {
    const configDir = resolve(TMP_OUT, "barrel-test");
    const reactDir = resolve(configDir, "react-out");
    const configPath = resolve(configDir, "inkline.config.mjs");
    try {
      mkdirSync(configDir, { recursive: true });
      writeFileSync(
        configPath,
        `export default {
          targets: ["react"],
          targetOutDir: { react: ${JSON.stringify(reactDir)} },
        };\n`,
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);

      const barrelPath = resolve(reactDir, "index.ts");
      expect(existsSync(barrelPath)).toBe(true);
      const barrel = readFileSync(barrelPath, "utf-8");
      expect(barrel).toContain("export { Counter }");
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("barrel includes multiple components sorted alphabetically", () => {
    const configDir = resolve(TMP_OUT, "barrel-multi-test");
    const reactDir = resolve(configDir, "react-out");
    const configPath = resolve(configDir, "inkline.config.mjs");
    try {
      mkdirSync(configDir, { recursive: true });
      writeFileSync(
        configPath,
        `export default {
          targets: ["react"],
          targetOutDir: { react: ${JSON.stringify(reactDir)} },
        };\n`,
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        resolve(FIXTURES_DIR, "IButton.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);

      const barrel = readFileSync(resolve(reactDir, "index.ts"), "utf-8");
      const lines = barrel.trim().split("\n");
      expect(lines).toHaveLength(2);
      expect(lines[0]).toContain("Counter");
      expect(lines[1]).toContain("IButton");
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("splits configured barrels into styled / headless / stories per target", () => {
    const configDir = resolve(TMP_OUT, "barrel-split-test");
    const srcDir = resolve(configDir, "src");
    // The output dir must be shaped `<root>/<target>/<storiesDir>` so the story generator
    // (which derives root/storiesDir from the output dir) writes CSF files back into it.
    const reactDir = resolve(configDir, "out", "react", ".inkline");
    const configPath = resolve(configDir, "inkline.config.mjs");
    const buttonDir = resolve(srcDir, "components", "button");
    const styledDir = resolve(buttonDir, "styled");
    const headlessDir = resolve(buttonDir, "headless");
    const storiesDir = resolve(buttonDir, "stories");
    try {
      mkdirSync(styledDir, { recursive: true });
      mkdirSync(headlessDir, { recursive: true });
      mkdirSync(storiesDir, { recursive: true });
      writeFileSync(
        resolve(styledDir, "IButton.ink.tsx"),
        `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <button />);\n`,
        "utf-8",
      );
      writeFileSync(
        resolve(headlessDir, "IButtonBase.ink.tsx"),
        `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <button />);\n`,
        "utf-8",
      );
      writeFileSync(
        resolve(storiesDir, "IButton.ink.stories.ts"),
        `export default { component: "IButton", title: "Components/Button" };\nexport const Default = {};\n`,
        "utf-8",
      );
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
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(styledDir, "IButton.ink.tsx"),
        resolve(headlessDir, "IButtonBase.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);

      const styled = readFileSync(resolve(reactDir, "index.ts"), "utf-8");
      expect(styled).toContain("export { IButton }");
      expect(styled).not.toContain("IButtonBase");

      const headless = readFileSync(resolve(reactDir, "headless.ts"), "utf-8");
      expect(headless).toContain("export { IButtonBase }");

      const stories = readFileSync(resolve(reactDir, "stories.ts"), "utf-8");
      expect(stories).toContain(
        "export * as IButtonStories from './components/button/stories/IButton.stories.ts';",
      );
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("preserves directory structure from source to output", () => {
    const configDir = resolve(TMP_OUT, "dir-structure-test");
    const reactDir = resolve(configDir, "react-out");
    const configPath = resolve(configDir, "inkline.config.mjs");
    const srcDir = resolve(configDir, "src");
    const badgeDir = resolve(srcDir, "components", "badge");
    const buttonDir = resolve(srcDir, "components", "button");
    try {
      mkdirSync(badgeDir, { recursive: true });
      mkdirSync(buttonDir, { recursive: true });
      writeFileSync(
        resolve(badgeDir, "IBadge.ink.tsx"),
        `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <div />);\n`,
        "utf-8",
      );
      writeFileSync(
        resolve(buttonDir, "IButton.ink.tsx"),
        `import { defineComponent } from "@inkline/core";\nexport default defineComponent(() => <button />);\n`,
        "utf-8",
      );
      writeFileSync(
        configPath,
        `export default {
          targets: ["react"],
          targetOutDir: { react: ${JSON.stringify(reactDir)} },
        };\n`,
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(srcDir, "components", "badge", "IBadge.ink.tsx"),
        resolve(srcDir, "components", "button", "IButton.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);
      expect(existsSync(resolve(reactDir, "badge", "IBadge.tsx"))).toBe(true);
      expect(existsSync(resolve(reactDir, "button", "IButton.tsx"))).toBe(true);

      const barrel = readFileSync(resolve(reactDir, "index.ts"), "utf-8");
      expect(barrel).toContain("badge/IBadge");
      expect(barrel).toContain("button/IButton");
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("falls back to outDir/target when targetOutDir not set for a target", () => {
    const configDir = resolve(TMP_OUT, "fallback-test");
    const outDir = resolve(configDir, "dist");
    const configPath = resolve(configDir, "inkline.config.mjs");
    try {
      mkdirSync(configDir, { recursive: true });
      writeFileSync(
        configPath,
        `export default {
          targets: ["react"],
          outDir: ${JSON.stringify(outDir)},
        };\n`,
        "utf-8",
      );
      const { status } = run(
        "compile",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);
      expect(existsSync(resolve(outDir, "react", "Counter.tsx"))).toBe(true);
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });
});

describe("check", () => {
  it("runs diagnostics without writing files", () => {
    const { status } = run("check", resolve(FIXTURES_DIR, "Counter.ink.tsx"), "--target", "react");
    expect(status).toBe(0);
  });
});

describe("init", () => {
  it("shows framework prompt", () => {
    const { stdout, status } = run("init");
    expect(status).toBe(0);
    expect(stdout).toContain("Select a framework");
  });
});

describe("add", () => {
  // `add` was a no-op that printed "not yet implemented" and exited 0, so no script could
  // detect it had done nothing. It is unregistered until the real feature lands.
  it("is rejected as an unknown command with a non-zero exit", () => {
    const { output, status } = run("add", "badge");
    expect(status).not.toBe(0);
    expect(output).toContain("Unknown command");
    expect(output).not.toContain("not yet implemented");
  });
});
