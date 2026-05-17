import { describe, it, expect, vi } from "vitest";
import { watch as nodeWatch } from "node:fs";
import { parseArgs, resolveOptions, startWatch, runCli, USAGE, type CliDeps } from "./cli.ts";
import type { GenerateResult } from "../generator/index.ts";

const result: GenerateResult = {
  components: ["Button"],
  files: [{ target: "react", path: "/x/Button.stories.ts" }],
};

function makeDeps(overrides: Partial<CliDeps> = {}): {
  deps: CliDeps;
  log: ReturnType<typeof vi.fn>;
  error: ReturnType<typeof vi.fn>;
} {
  const log = vi.fn();
  const error = vi.fn();
  return {
    log,
    error,
    deps: {
      generate: vi.fn(async () => result),
      watch: vi.fn() as unknown as typeof nodeWatch,
      io: { log, error },
      cwd: "/repo/tooling/storybook",
      ...overrides,
    },
  };
}

describe("parseArgs", () => {
  it("defaults the command to help when argv is empty", () => {
    expect(parseArgs([])).toEqual({ command: "help", flags: { watch: false } });
  });

  it("parses the command, --watch, --core-dir and --ui-dir", () => {
    expect(
      parseArgs(["generate", "--watch", "--core-dir", "a", "--ui-dir", "b", "--unknown"]),
    ).toEqual({
      command: "generate",
      flags: { watch: true, coreDir: "a", uiDir: "b" },
    });
  });

  it("tolerates a trailing flag with no value", () => {
    expect(parseArgs(["generate", "--core-dir"]).flags.coreDir).toBeUndefined();
  });
});

describe("resolveOptions", () => {
  it("falls back to the conventional monorepo paths", () => {
    expect(resolveOptions({ watch: false }, "/repo/tooling/storybook")).toEqual({
      coreStoriesDir: "/repo/ui/core/stories",
      uiDir: "/repo/ui",
    });
  });

  it("resolves provided dirs relative to cwd", () => {
    const opts = resolveOptions({ watch: false, coreDir: "defs", uiDir: "/abs/ui" }, "/repo");
    expect(opts.coreStoriesDir).toBe("/repo/defs");
    expect(opts.uiDir).toBe("/abs/ui");
  });
});

describe("startWatch", () => {
  it("regenerates on a filesystem event", async () => {
    const regenerate = vi.fn(async () => {});
    let listener!: () => void;
    const watch = ((_dir: string, l: () => void) => {
      listener = l;
      return {};
    }) as unknown as typeof nodeWatch;

    startWatch("/defs", regenerate, { watch, io: { log: vi.fn(), error: vi.fn() } });
    listener();
    await vi.waitFor(() => expect(regenerate).toHaveBeenCalledOnce());
  });

  it("reports a regeneration failure (Error and non-Error)", async () => {
    const error = vi.fn();
    const io = { log: vi.fn(), error };
    const listeners: Array<() => void> = [];
    const watch = ((_d: string, l: () => void) => {
      listeners.push(l);
      return {};
    }) as unknown as typeof nodeWatch;

    startWatch(
      "/d",
      async () => {
        throw new Error("boom");
      },
      { watch, io },
    );
    startWatch("/d", () => Promise.reject("plain"), { watch, io });
    listeners[0]!();
    listeners[1]!();

    await vi.waitFor(() => {
      expect(error).toHaveBeenCalledWith("boom");
      expect(error).toHaveBeenCalledWith("plain");
    });
  });
});

describe("runCli", () => {
  it("prints usage for help and exits 0", async () => {
    const { deps, log } = makeDeps();
    expect(await runCli(["help"], deps)).toBe(0);
    expect(log).toHaveBeenCalledWith(USAGE);
  });

  it("rejects an unknown command with exit 2 and usage", async () => {
    const { deps, log, error } = makeDeps();
    expect(await runCli(["frobnicate"], deps)).toBe(2);
    expect(error).toHaveBeenCalledWith("Unknown command: frobnicate");
    expect(log).toHaveBeenCalledWith(USAGE);
  });

  it("generates once and logs a summary", async () => {
    const { deps, log } = makeDeps();
    expect(await runCli(["generate", "--core-dir", "d", "--ui-dir", "u"], deps)).toBe(0);
    expect(deps.generate).toHaveBeenCalledWith({
      coreStoriesDir: "/repo/tooling/storybook/d",
      uiDir: "/repo/tooling/storybook/u",
    });
    expect(log).toHaveBeenCalledWith("Generated 1 story file(s) for 1 component(s).");
  });

  it("starts watching when --watch is set", async () => {
    const watch = vi.fn() as unknown as typeof nodeWatch;
    const { deps, log } = makeDeps({ watch });
    expect(await runCli(["generate", "--watch"], deps)).toBe(0);
    expect(watch).toHaveBeenCalledOnce();
    expect(log).toHaveBeenCalledWith("Watching /repo/ui/core/stories for changes...");
  });

  it("returns 1 and reports the message when generation fails", async () => {
    const { deps, error } = makeDeps({
      generate: vi.fn(async () => {
        throw new Error("bad definition");
      }),
    });
    expect(await runCli(["generate"], deps)).toBe(1);
    expect(error).toHaveBeenCalledWith("bad definition");
  });

  it("stringifies a non-Error failure", async () => {
    const { deps, error } = makeDeps({
      generate: vi.fn(() => Promise.reject("nope")),
    });
    expect(await runCli(["generate"], deps)).toBe(1);
    expect(error).toHaveBeenCalledWith("nope");
  });
});
