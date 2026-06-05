import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, rmSync, writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { renderUsage, defineCommand } from "citty";

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

function run(...args: string[]): {
  stdout: string;
  stderr: string;
  output: string;
  status: number;
} {
  const result = spawnSync(process.execPath, ["--import", "tsx", CLI_PATH, ...args], {
    encoding: "utf-8",
    cwd: resolve(__dirname, "..", ".."),
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
  it("root help shows all commands", async () => {
    const { default: root } = await import("../commands/compile.ts");
    const main = defineCommand({
      meta: { name: "inkline" },
      subCommands: {
        compile: () => Promise.resolve(root),
        check: () => import("../commands/check.ts").then((m) => m.default),
        init: () => import("../commands/init.ts").then((m) => m.default),
        add: () => import("../commands/add.ts").then((m) => m.default),
      },
    });
    const usage = await renderUsage(main);
    expect(usage).toContain("compile");
    expect(usage).toContain("check");
    expect(usage).toContain("init");
    expect(usage).toContain("add");
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
  it("exits non-zero without --target", () => {
    const { status } = run("compile", resolve(FIXTURES_DIR, "Counter.ink.tsx"));
    expect(status).not.toBe(0);
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
  it("prints not yet implemented", () => {
    const { stdout, status } = run("add", "badge");
    expect(status).toBe(0);
    expect(stdout).toContain("not yet implemented");
  });
});
