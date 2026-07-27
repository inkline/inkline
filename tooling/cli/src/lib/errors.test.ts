import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { InklineConfigError, type Diagnostic } from "@inkline/compiler";
import { EXIT_USAGE_ERROR, reportConfigError } from "./errors.ts";

const diagnostic: Diagnostic = {
  code: "INK0082",
  severity: "error",
  title: 'Unknown target "reakt"',
  help: 'Did you mean "react"? Available targets: react, vue.',
  url: "https://docs.inkline.dev/diagnostics/INK0082",
  loc: { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 },
};

let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  process.exitCode = undefined;
});

afterEach(() => {
  errorSpy.mockRestore();
  process.exitCode = undefined;
});

describe("reportConfigError", () => {
  it("formats the diagnostic and sets the usage exit code", () => {
    const handled = reportConfigError(new InklineConfigError(diagnostic), false);

    expect(handled).toBe(true);
    expect(process.exitCode).toBe(EXIT_USAGE_ERROR);
    expect(errorSpy).toHaveBeenCalledTimes(1);

    const output = errorSpy.mock.calls[0]![0] as string;
    expect(output).toContain("INK0082");
    expect(output).toContain('Unknown target "reakt"');
    expect(output).toContain('Did you mean "react"?');
    expect(output).not.toContain("<unknown>");
  });

  it("omits the stack unless verbose", () => {
    reportConfigError(new InklineConfigError(diagnostic), false);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("prints the stack under verbose", () => {
    reportConfigError(new InklineConfigError(diagnostic), true);

    expect(errorSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy.mock.calls[1]![0]).toContain("InklineConfigError");
  });

  it("leaves other errors to the caller", () => {
    const handled = reportConfigError(new Error("disk on fire"), false);

    expect(handled).toBe(false);
    expect(process.exitCode).toBeUndefined();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
