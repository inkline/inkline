import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

vi.mock("@inkline/compiler", () => ({
  createIncrementalState: vi.fn(),
  compileIncremental: vi.fn(),
}));

import type { UnpluginContextMeta } from "unplugin";
import { compileIncremental, createIncrementalState } from "@inkline/compiler";
import type {
  Diagnostic,
  DiagnosticSeverity,
  GeneratedFile,
  IncrementalCompileResult,
  IncrementalState,
} from "@inkline/compiler";
import { type InklinePluginOptions, unplugin, unpluginFactory } from ".";
import vitePlugin from "./vite";
import webpackPlugin from "./webpack";
import rollupPlugin from "./rollup";
import esbuildPlugin from "./esbuild";
import rspackPlugin from "./rspack";
import farmPlugin from "./farm";

const compileIncrementalMock = vi.mocked(compileIncremental);
const createIncrementalStateMock = vi.mocked(createIncrementalState);

/** Minimal view of the plugin surface this suite drives directly. */
interface TransformContext {
  error: (message: string) => void;
  warn: (message: string) => void;
}
interface PluginShape {
  name: string;
  enforce?: string;
  transform: {
    filter: { id: RegExp };
    handler: (
      this: TransformContext,
      code: string,
      id: string,
    ) => Promise<{ code: string; map: unknown } | null>;
  };
  vite: {
    configResolved: (config: { plugins: readonly { name: string }[] }) => void;
    handleHotUpdate: (ctx: { file: string }) => Promise<void>;
  };
}

const META = { framework: "vite" } as UnpluginContextMeta;

function build(options?: InklinePluginOptions): PluginShape {
  return unpluginFactory(options, META) as unknown as PluginShape;
}

function makeCtx(): TransformContext {
  return { error: vi.fn(), warn: vi.fn() };
}

function makeState(tag: string): IncrementalState {
  return { sourceHashes: new Map([[tag, tag]]), results: new Map() };
}

function makeFile(path: string, contents = "CODE", sourceMap?: string): GeneratedFile {
  return { path, contents, sourceMap };
}

function makeDiagnostic(severity: DiagnosticSeverity, title: string): Diagnostic {
  return {
    code: "INK0001",
    severity,
    title,
    url: "https://inkline.dev",
    loc: { file: "x.ink.tsx", line: 1, column: 1, offset: 0, length: 0 },
  };
}

function makeResult(over: Partial<IncrementalCompileResult> = {}): IncrementalCompileResult {
  return {
    files: {},
    diagnostics: [],
    nextState: makeState("next"),
    changed: [],
    skipped: [],
    ...over,
  };
}

const ID = "/project/Button.ink.tsx";

let tmpDir: string;
let inkFile: string;
const INK_SOURCE = "export const x = 1;\n";

beforeAll(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "inkline-plugin-"));
  inkFile = join(tmpDir, "Hot.ink.tsx");
  writeFileSync(inkFile, INK_SOURCE, "utf-8");
});

afterAll(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

beforeEach(() => {
  vi.clearAllMocks();
  createIncrementalStateMock.mockImplementation(() => makeState("init"));
  compileIncrementalMock.mockResolvedValue(makeResult());
});

describe("transform handler", () => {
  it("errors and emits nothing when no target is set", async () => {
    const ctx = makeCtx();
    const out = await build().transform.handler.call(ctx, "SRC", ID);

    expect(ctx.error).toHaveBeenCalledWith(
      'No target specified. Set the "target" option or use the Vite plugin for auto-detection.',
    );
    expect(out).toBeNull();
    expect(compileIncrementalMock).not.toHaveBeenCalled();
  });

  it("compiles the file and returns the main file with a null map by default", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({ files: { react: [makeFile("Button.tsx", "OUTPUT")] } }),
    );

    const out = await build({ target: "react" }).transform.handler.call(makeCtx(), "SRC", ID);

    expect(out).toEqual({ code: "OUTPUT", map: null });
    expect(compileIncrementalMock).toHaveBeenCalledTimes(1);
    expect(compileIncrementalMock.mock.calls[0]![0]).toBe(
      createIncrementalStateMock.mock.results[0]!.value,
    );
    expect(compileIncrementalMock.mock.calls[0]![1]).toEqual([{ fileName: ID, source: "SRC" }]);
    expect(compileIncrementalMock.mock.calls[0]![2]).toMatchObject({
      targets: ["react"],
      sourceMap: "inline",
    });
  });

  it("parses an inline source map when the main file carries one", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({
        files: {
          react: [makeFile("Button.tsx", "OUTPUT", JSON.stringify({ version: 3, sources: [] }))],
        },
      }),
    );

    const out = await build({ target: "react" }).transform.handler.call(makeCtx(), "SRC", ID);

    expect(out).toEqual({ code: "OUTPUT", map: { version: 3, sources: [] } });
  });

  it("selects the main file, ignoring emitted .css and .map siblings", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({
        files: {
          react: [
            makeFile("Button.css", "CSS"),
            makeFile("Button.js.map", "MAP"),
            makeFile("Button.tsx", "REAL"),
          ],
        },
      }),
    );

    const out = await build({ target: "react" }).transform.handler.call(makeCtx(), "SRC", ID);

    expect(out).toEqual({ code: "REAL", map: null });
  });

  it("returns null when the target produced no files", async () => {
    compileIncrementalMock.mockResolvedValue(makeResult({ files: {} }));
    const out = await build({ target: "react" }).transform.handler.call(makeCtx(), "SRC", ID);
    expect(out).toBeNull();
  });

  it("returns null when the target produced an empty file list", async () => {
    compileIncrementalMock.mockResolvedValue(makeResult({ files: { react: [] } }));
    const out = await build({ target: "react" }).transform.handler.call(makeCtx(), "SRC", ID);
    expect(out).toBeNull();
  });

  it("returns null when only non-main (.css/.map) files were produced", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({ files: { react: [makeFile("Button.css"), makeFile("Button.js.map")] } }),
    );
    const out = await build({ target: "react" }).transform.handler.call(makeCtx(), "SRC", ID);
    expect(out).toBeNull();
  });

  it('maps sourceMap:false to the compiler\'s "none" mode', async () => {
    await build({ target: "react", sourceMap: false }).transform.handler.call(makeCtx(), "SRC", ID);
    expect(compileIncrementalMock.mock.calls[0]![2]).toMatchObject({ sourceMap: "none" });
  });

  it('maps sourceMap:true to "inline"', async () => {
    await build({ target: "react", sourceMap: true }).transform.handler.call(makeCtx(), "SRC", ID);
    expect(compileIncrementalMock.mock.calls[0]![2]).toMatchObject({ sourceMap: "inline" });
  });

  it("merges inline config but forces the plugin's own target and sourceMap", async () => {
    await build({
      target: "react",
      config: { verbose: true, targets: ["vue"] },
    }).transform.handler.call(makeCtx(), "SRC", ID);

    expect(compileIncrementalMock.mock.calls[0]![2]).toMatchObject({
      verbose: true,
      targets: ["react"],
      sourceMap: "inline",
    });
  });

  it("forwards error diagnostics to this.error", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({ diagnostics: [makeDiagnostic("error", "boom")] }),
    );
    const ctx = makeCtx();
    await build({ target: "react" }).transform.handler.call(ctx, "SRC", ID);
    expect(ctx.error).toHaveBeenCalledWith("INK0001: boom");
    expect(ctx.warn).not.toHaveBeenCalled();
  });

  it("forwards warning diagnostics to this.warn", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({ diagnostics: [makeDiagnostic("warning", "heads up")] }),
    );
    const ctx = makeCtx();
    await build({ target: "react" }).transform.handler.call(ctx, "SRC", ID);
    expect(ctx.warn).toHaveBeenCalledWith("INK0001: heads up");
    expect(ctx.error).not.toHaveBeenCalled();
  });

  it("ignores info diagnostics", async () => {
    compileIncrementalMock.mockResolvedValue(
      makeResult({ diagnostics: [makeDiagnostic("info", "fyi")] }),
    );
    const ctx = makeCtx();
    await build({ target: "react" }).transform.handler.call(ctx, "SRC", ID);
    expect(ctx.error).not.toHaveBeenCalled();
    expect(ctx.warn).not.toHaveBeenCalled();
  });

  it("threads nextState into the following compile call", async () => {
    const plugin = build({ target: "react" });
    const first = makeState("after-first");
    compileIncrementalMock.mockResolvedValueOnce(
      makeResult({ files: { react: [makeFile("A.tsx")] }, nextState: first }),
    );
    await plugin.transform.handler.call(makeCtx(), "A", ID);

    compileIncrementalMock.mockResolvedValueOnce(
      makeResult({ files: { react: [makeFile("B.tsx")] } }),
    );
    await plugin.transform.handler.call(makeCtx(), "B", ID);

    expect(compileIncrementalMock.mock.calls[1]![0]).toBe(first);
  });
});

describe("vite.configResolved target auto-detection", () => {
  async function detectedTargetFor(pluginNames: string[]): Promise<unknown> {
    const plugin = build();
    plugin.vite.configResolved({ plugins: pluginNames.map((name) => ({ name })) });
    await plugin.transform.handler.call(makeCtx(), "SRC", ID);
    return (compileIncrementalMock.mock.calls[0]![2] as { targets: unknown[] }).targets[0];
  }

  it("detects react", async () => {
    expect(await detectedTargetFor(["vite:react-babel"])).toBe("react");
  });

  it("detects solid", async () => {
    expect(await detectedTargetFor(["vite-plugin-solid"])).toBe("solid");
  });

  it("detects vue", async () => {
    expect(await detectedTargetFor(["vite:vue"])).toBe("vue");
  });

  it("detects svelte", async () => {
    expect(await detectedTargetFor(["vite-plugin-svelte"])).toBe("svelte");
  });

  it("falls back to react when no framework plugin is present", async () => {
    expect(await detectedTargetFor(["vite:define", "vite:esbuild"])).toBe("react");
  });

  it("keeps an explicitly configured target over detection", async () => {
    const plugin = build({ target: "vue" });
    plugin.vite.configResolved({ plugins: [{ name: "vite:react-babel" }] });
    await plugin.transform.handler.call(makeCtx(), "SRC", ID);
    expect(compileIncrementalMock.mock.calls[0]![2]).toMatchObject({ targets: ["vue"] });
  });
});

describe("vite.handleHotUpdate", () => {
  it("ignores non-.ink.tsx files", async () => {
    await build({ target: "react" }).vite.handleHotUpdate({ file: "/project/app.tsx" });
    expect(compileIncrementalMock).not.toHaveBeenCalled();
  });

  it("does nothing for an .ink.tsx file when no target is set", async () => {
    await build().vite.handleHotUpdate({ file: inkFile });
    expect(compileIncrementalMock).not.toHaveBeenCalled();
  });

  it("recompiles the changed file and threads state into later compiles", async () => {
    const plugin = build({ target: "react" });
    const afterHmr = makeState("after-hmr");
    compileIncrementalMock.mockResolvedValueOnce(makeResult({ nextState: afterHmr }));

    await plugin.vite.handleHotUpdate({ file: inkFile });

    expect(compileIncrementalMock).toHaveBeenCalledTimes(1);
    expect(compileIncrementalMock.mock.calls[0]![1]).toEqual([
      { fileName: inkFile, source: INK_SOURCE },
    ]);
    expect(compileIncrementalMock.mock.calls[0]![2]).toMatchObject({
      targets: ["react"],
      sourceMap: "inline",
    });

    await plugin.transform.handler.call(makeCtx(), "SRC", ID);
    expect(compileIncrementalMock.mock.calls[1]![0]).toBe(afterHmr);
  });
});

describe("plugin contract", () => {
  it('enforces "pre" so .ink.tsx compiles before framework transforms', () => {
    const plugin = build({ target: "react" });
    expect(plugin.name).toBe("@inkline/plugin");
    expect(plugin.enforce).toBe("pre");
  });

  it("filters transform to .ink.tsx files only", () => {
    const { id } = build({ target: "react" }).transform.filter;
    expect(id.test("/project/Button.ink.tsx")).toBe(true);
    expect(id.test("/project/Button.tsx")).toBe(false);
    expect(id.test("/project/app.ts")).toBe(false);
    expect(id.test("/project/ink.tsx")).toBe(false);
  });
});

describe("bundler adapters", () => {
  it("each subpath default-exports a plugin factory", () => {
    for (const plugin of [
      vitePlugin,
      webpackPlugin,
      rollupPlugin,
      esbuildPlugin,
      rspackPlugin,
      farmPlugin,
    ]) {
      expect(typeof plugin).toBe("function");
    }
  });

  it("the raw unplugin instance exposes every per-bundler factory", () => {
    expect(typeof unplugin.vite).toBe("function");
    expect(typeof unplugin.rollup).toBe("function");
    expect(typeof unplugin.webpack).toBe("function");
    expect(typeof unplugin.esbuild).toBe("function");
    expect(typeof unplugin.rspack).toBe("function");
    expect(typeof unplugin.farm).toBe("function");
  });
});
