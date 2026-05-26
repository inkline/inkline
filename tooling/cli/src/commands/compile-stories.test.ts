import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resolve } from "node:path";

const { mockWatch } = vi.hoisted(() => ({ mockWatch: vi.fn() }));

vi.mock("@inkline/storybook/generator", () => ({
  generate: vi.fn(),
}));

vi.mock("node:fs", async (importOriginal) => {
  const original = await importOriginal<typeof import("node:fs")>();
  return { ...original, watch: mockWatch };
});

import command from "./compile-stories.ts";
import { generate } from "@inkline/storybook/generator";

const mockedGenerate = vi.mocked(generate);

const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

function runCommand(overrides: Record<string, unknown> = {}) {
  const args = { "src-dir": "", "root-dir": "", watch: false, ...overrides } as Parameters<
    NonNullable<typeof command.run>
  >[0]["args"];
  return command.run!({ args, rawArgs: [], cmd: command });
}

describe("compile-stories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.exitCode = undefined;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("generates stories and logs the count", async () => {
    mockedGenerate.mockResolvedValue({
      files: [{ target: "react", path: "a.ts" }],
      components: ["Button"],
    });

    await runCommand();

    expect(mockedGenerate).toHaveBeenCalledWith({
      srcDir: expect.any(String),
      rootDir: expect.any(String),
    });
    expect(logSpy).toHaveBeenCalledWith("Generated 1 story file(s) for 1 component(s).");
  });

  it("logs error message and sets exitCode on failure", async () => {
    mockedGenerate.mockRejectedValue(new Error("broken"));

    await runCommand();

    expect(errSpy).toHaveBeenCalledWith("broken");
    expect(process.exitCode).toBe(1);
  });

  it("logs stringified error when thrown value is not an Error", async () => {
    mockedGenerate.mockRejectedValue("string-error");

    await runCommand();

    expect(errSpy).toHaveBeenCalledWith("string-error");
    expect(process.exitCode).toBe(1);
  });

  it("resolves custom src-dir and root-dir", async () => {
    mockedGenerate.mockResolvedValue({ files: [], components: [] });

    await runCommand({ "src-dir": "/custom/src", "root-dir": "/custom/root" });

    expect(mockedGenerate).toHaveBeenCalledWith({
      srcDir: resolve("/custom/src"),
      rootDir: resolve("/custom/root"),
    });
  });

  it("enters watch mode and sets up debounced watcher", async () => {
    await runCommand({ watch: true });

    expect(mockWatch).toHaveBeenCalledWith(
      expect.any(String),
      { recursive: true },
      expect.any(Function),
    );
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Watching"));
  });

  it("watch callback debounces and calls generate", async () => {
    vi.useFakeTimers();
    mockedGenerate.mockResolvedValue({
      files: [{ target: "react", path: "a.ts" }],
      components: ["Button"],
    });

    await runCommand({ watch: true });

    const callback = mockWatch.mock.calls[0][2] as () => void;

    callback();
    callback();

    await vi.advanceTimersByTimeAsync(150);

    expect(mockedGenerate).toHaveBeenCalledTimes(1);
  });

  it("watch callback logs error on generate failure", async () => {
    vi.useFakeTimers();
    mockedGenerate.mockRejectedValue(new Error("watch-fail"));

    await runCommand({ watch: true });

    const callback = mockWatch.mock.calls[0][2] as () => void;
    callback();
    await vi.advanceTimersByTimeAsync(150);

    expect(errSpy).toHaveBeenCalledWith("watch-fail");
  });
});
