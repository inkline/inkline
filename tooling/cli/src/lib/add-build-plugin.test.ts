import { mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { addBuildPlugin, getManualPluginInstructions } from "./add-build-plugin.ts";

describe("addBuildPlugin", () => {
  let dir: string;

  beforeEach(() => {
    dir = join(tmpdir(), `inkline-test-plugin-${Date.now()}`);
    mkdirSync(dir, { recursive: true });
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  function readConfig(name: string): string {
    return readFileSync(join(dir, name), "utf-8");
  }

  it("adds inkline plugin to a vite config with existing plugins", async () => {
    const configPath = join(dir, "vite.config.ts");
    writeFileSync(
      configPath,
      `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`,
    );

    await addBuildPlugin(configPath, "vite", "react");
    const result = readConfig("vite.config.ts");

    expect(result).toContain('import inkline from "inkline/plugin/vite"');
    expect(result).toContain("inkline()");
  });

  it("adds inkline plugin to a vite config with no plugins array", async () => {
    const configPath = join(dir, "vite.config.ts");
    writeFileSync(
      configPath,
      `import { defineConfig } from "vite";

export default defineConfig({});
`,
    );

    await addBuildPlugin(configPath, "vite", "react");
    const result = readConfig("vite.config.ts");

    expect(result).toContain('import inkline from "inkline/plugin/vite"');
    expect(result).toContain("inkline()");
  });

  it("does not pass target option for vite (auto-detects)", async () => {
    const configPath = join(dir, "vite.config.ts");
    writeFileSync(
      configPath,
      `import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
});
`,
    );

    await addBuildPlugin(configPath, "vite", "react");
    const result = readConfig("vite.config.ts");

    expect(result).not.toContain("target");
  });

  it("adds inkline plugin with target to webpack config", async () => {
    const configPath = join(dir, "webpack.config.js");
    writeFileSync(
      configPath,
      `export default {
  plugins: [],
};
`,
    );

    await addBuildPlugin(configPath, "webpack", "vue");
    const result = readConfig("webpack.config.js");

    expect(result).toContain('import inkline from "inkline/plugin/webpack"');
    expect(result).toContain("inkline(");
    expect(result).toContain('"vue"');
  });

  it("adds inkline plugin with target to rollup config", async () => {
    const configPath = join(dir, "rollup.config.js");
    writeFileSync(
      configPath,
      `export default {
  plugins: [],
};
`,
    );

    await addBuildPlugin(configPath, "rollup", "svelte");
    const result = readConfig("rollup.config.js");

    expect(result).toContain('import inkline from "inkline/plugin/rollup"');
    expect(result).toContain("inkline(");
    expect(result).toContain('"svelte"');
  });
});

describe("getManualPluginInstructions", () => {
  it("returns vite instructions without target", () => {
    const result = getManualPluginInstructions("vite", "react");
    expect(result).toContain("inkline/plugin/vite");
    expect(result).toContain("inkline()");
    expect(result).not.toContain("target");
  });

  it("returns webpack instructions with target", () => {
    const result = getManualPluginInstructions("webpack", "vue");
    expect(result).toContain("inkline/plugin/webpack");
    expect(result).toContain('target: "vue"');
  });

  it("returns rollup instructions with target", () => {
    const result = getManualPluginInstructions("rollup", "angular");
    expect(result).toContain("inkline/plugin/rollup");
    expect(result).toContain('target: "angular"');
  });
});
