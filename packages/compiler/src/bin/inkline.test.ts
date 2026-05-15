import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, rmSync, writeFileSync, mkdirSync, readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_PATH = resolve(__dirname, "inkline.ts");
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");
const TMP_OUT = resolve(__dirname, "..", "..", ".tmp-cli-test");

function run(...args: string[]): { stdout: string; stderr: string; status: number } {
  const result = spawnSync("npx", ["tsx", CLI_PATH, ...args], {
    encoding: "utf-8",
    cwd: resolve(__dirname, "..", ".."),
    timeout: 30_000,
  });
  return {
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    status: result.status ?? 1,
  };
}

describe("inkline CLI", () => {
  it("version prints package version", () => {
    const { stdout, status } = run("version");
    expect(status).toBe(0);
    expect(stdout).toContain("inkline v");
  });

  it("help prints usage", () => {
    const { stdout, status } = run("help");
    expect(status).toBe(0);
    expect(stdout).toContain("build");
    expect(stdout).toContain("diagnose");
  });

  it("help build prints build options", () => {
    const { stdout, status } = run("help", "build");
    expect(status).toBe(0);
    expect(stdout).toContain("--target");
    expect(stdout).toContain("--out-dir");
  });

  it("build without --target exits 2", () => {
    const { status, stderr } = run("build", resolve(FIXTURES_DIR, "Counter.ink.tsx"));
    expect(status).toBe(2);
    expect(stderr).toContain("--target");
  });

  it("build with --target react exits 0", () => {
    try {
      const { status } = run(
        "build",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--target",
        "react",
        "--out-dir",
        TMP_OUT,
      );
      expect(status).toBe(0);
    } finally {
      if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true });
    }
  });

  it("unknown command exits 2", () => {
    const { status } = run("unknown-cmd");
    expect(status).toBe(2);
  });

  it("diagnose runs without writing files", () => {
    const { status } = run(
      "diagnose",
      resolve(FIXTURES_DIR, "Counter.ink.tsx"),
      "--target",
      "react",
    );
    expect(status).toBe(0);
  });

  it("help build mentions --config", () => {
    const { stdout } = run("help", "build");
    expect(stdout).toContain("--config");
  });

  it("build with --config loads targets from config file", () => {
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
        "build",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("build with nonexistent --config prints error and falls back to CLI flags", () => {
    const { status, stderr } = run(
      "build",
      resolve(FIXTURES_DIR, "Counter.ink.tsx"),
      "--config",
      "/nonexistent/inkline.config.ts",
      "--target",
      "react",
      "--out-dir",
      TMP_OUT,
    );
    try {
      expect(stderr).toContain("Config file not found");
      expect(status).toBe(0);
    } finally {
      if (existsSync(TMP_OUT)) rmSync(TMP_OUT, { recursive: true });
    }
  });

  it("build with targetOutDir routes output to per-target directories", () => {
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
        "build",
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

  it("build generates barrel index.ts per target directory", () => {
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
        "build",
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

  it("build barrel includes multiple components sorted alphabetically", () => {
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
        "build",
        resolve(FIXTURES_DIR, "Counter.ink.tsx"),
        resolve(FIXTURES_DIR, "Button.ink.tsx"),
        "--config",
        configPath,
      );
      expect(status).toBe(0);

      const barrel = readFileSync(resolve(reactDir, "index.ts"), "utf-8");
      const lines = barrel.trim().split("\n");
      expect(lines).toHaveLength(2);
      expect(lines[0]).toContain("Button");
      expect(lines[1]).toContain("Counter");
    } finally {
      if (existsSync(configDir)) rmSync(configDir, { recursive: true });
    }
  });

  it("build falls back to outDir/target when targetOutDir not set for a target", () => {
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
        "build",
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
