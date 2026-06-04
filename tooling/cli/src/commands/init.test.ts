import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("node:child_process", () => ({
  execSync: vi.fn(),
}));

const promptMock = vi.hoisted(() => vi.fn());

vi.mock("consola", () => {
  const consola = {
    prompt: promptMock,
    info: vi.fn(),
    start: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    box: vi.fn(),
  };
  return { default: consola };
});

import { execSync } from "node:child_process";
import consola from "consola";
import initCommand from "./init.ts";

function mockPrompt(value: unknown) {
  promptMock.mockResolvedValue(value);
}

function runInit(args: Record<string, unknown> = {}) {
  return initCommand.run!({
    args: { _: [], ...args } as any,
    rawArgs: [],
    cmd: initCommand,
  });
}

describe("inkline init", () => {
  let dir: string;
  let originalCwd: string;

  beforeEach(() => {
    dir = join(tmpdir(), `inkline-test-init-${Date.now()}`);
    mkdirSync(dir, { recursive: true });
    originalCwd = process.cwd();
    process.chdir(dir);
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.chdir(originalCwd);
    rmSync(dir, { recursive: true, force: true });
  });

  function writePkg(deps: Record<string, string> = {}) {
    writeFileSync(join(dir, "package.json"), JSON.stringify({ dependencies: deps }));
  }

  function writeViteConfig(content: string) {
    writeFileSync(join(dir, "vite.config.ts"), content);
  }

  function createLockfile(name: string) {
    writeFileSync(join(dir, name), "");
  }

  it("uses --framework flag to skip prompt", async () => {
    writePkg({ react: "^19" });
    createLockfile("pnpm-lock.yaml");
    writeViteConfig(`import { defineConfig } from "vite";
export default defineConfig({ plugins: [] });
`);

    await runInit({ framework: "react" });

    expect(promptMock).not.toHaveBeenCalled();
    expect(execSync).toHaveBeenCalledWith("pnpx styleframe init", expect.anything());
    expect(execSync).toHaveBeenCalledWith(
      "pnpm add inkline @styleframe/runtime",
      expect.anything(),
    );
  });

  it("prompts for framework selection when no flag provided", async () => {
    writePkg({ react: "^19" });
    createLockfile("pnpm-lock.yaml");
    writeViteConfig(`import { defineConfig } from "vite";
export default defineConfig({ plugins: [] });
`);

    mockPrompt("react");

    await runInit();

    expect(promptMock).toHaveBeenCalledWith(
      "Select a framework:",
      expect.objectContaining({ type: "select" }),
    );
  });

  it("passes detected framework as initial value in prompt", async () => {
    writePkg({ vue: "^3" });
    writeViteConfig(`import { defineConfig } from "vite";
export default defineConfig({ plugins: [] });
`);

    mockPrompt("vue");

    await runInit();

    expect(promptMock).toHaveBeenCalledWith(
      "Select a framework:",
      expect.objectContaining({ initial: "vue" }),
    );
  });

  it("writes styleframe.config.ts with Inkline presets", async () => {
    writePkg({ react: "^19" });
    writeViteConfig(`import { defineConfig } from "vite";
export default defineConfig({ plugins: [] });
`);

    await runInit({ framework: "react" });

    const config = readFileSync(join(dir, "styleframe.config.ts"), "utf-8");
    expect(config).toContain("useDesignTokensPreset");
    expect(config).toContain("useSanitizePreset");
    expect(config).toContain("useGlobalPreset");
    expect(config).toContain("useUtilitiesPreset");
    expect(config).toContain("useModifiersPreset");
  });

  it("adds inkline plugin to vite.config.ts", async () => {
    writePkg({ react: "^19" });
    writeViteConfig(`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`);

    await runInit({ framework: "react" });

    const config = readFileSync(join(dir, "vite.config.ts"), "utf-8");
    expect(config).toContain('import inkline from "inkline/plugin/vite"');
    expect(config).toContain("inkline()");
  });

  it("detects yarn from lockfile", async () => {
    writePkg({ react: "^19" });
    createLockfile("yarn.lock");

    await runInit({ framework: "react" });

    expect(execSync).toHaveBeenCalledWith("yarn dlx styleframe init", expect.anything());
    expect(execSync).toHaveBeenCalledWith(
      "yarn add inkline @styleframe/runtime",
      expect.anything(),
    );
  });

  it("detects bun from lockfile", async () => {
    writePkg({ react: "^19" });
    createLockfile("bun.lockb");

    await runInit({ framework: "react" });

    expect(execSync).toHaveBeenCalledWith("bunx styleframe init", expect.anything());
    expect(execSync).toHaveBeenCalledWith("bun add inkline @styleframe/runtime", expect.anything());
  });

  it("warns when no bundler config is found", async () => {
    writePkg({ react: "^19" });

    await runInit({ framework: "react" });

    expect(consola.warn).toHaveBeenCalledWith(expect.stringContaining("No bundler config found"));
  });

  it("exits gracefully on cancelled prompt", async () => {
    writePkg({ react: "^19" });
    mockPrompt(Symbol.for("cancel"));

    await runInit();

    expect(consola.info).toHaveBeenCalledWith("Cancelled.");
    expect(execSync).not.toHaveBeenCalled();
  });

  it("rejects invalid --framework value", async () => {
    writePkg({});
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit");
    });

    await expect(runInit({ framework: "invalid" })).rejects.toThrow("process.exit");

    expect(consola.error).toHaveBeenCalledWith(expect.stringContaining("Invalid framework"));
    exitSpy.mockRestore();
  });

  it("handles styleframe init failure gracefully", async () => {
    writePkg({ react: "^19" });
    vi.mocked(execSync).mockImplementationOnce(() => {
      throw new Error("command failed");
    });

    await runInit({ framework: "react" });

    expect(consola.warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed to run styleframe init"),
    );
    expect(existsSync(join(dir, "styleframe.config.ts"))).toBe(true);
  });

  it("handles dependency installation failure gracefully", async () => {
    writePkg({ react: "^19" });
    vi.mocked(execSync)
      .mockImplementationOnce(() => Buffer.from(""))
      .mockImplementationOnce(() => {
        throw new Error("install failed");
      });

    await runInit({ framework: "react" });

    expect(consola.warn).toHaveBeenCalledWith(
      expect.stringContaining("Failed to install dependencies"),
    );
  });
});
