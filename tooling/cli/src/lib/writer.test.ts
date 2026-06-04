import { describe, it, expect, afterEach } from "vitest";
import { mkdirSync, rmSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { CompileResult } from "@inkline/compiler";
import { writeCompileOutput } from "./writer.ts";
import type { BarrelEntry } from "./barrel.ts";

const TMP = resolve(import.meta.dirname!, "..", "..", ".tmp-writer-test");

afterEach(() => {
  try {
    rmSync(TMP, { recursive: true });
  } catch {}
});

function makeResult(
  target: string,
  files: Array<{ path: string; contents: string; sourceMap?: string }>,
): CompileResult {
  return {
    files: { [target]: files },
    diagnostics: [],
  };
}

describe("writeCompileOutput", () => {
  it("writes generated files to the target directory", () => {
    mkdirSync(TMP, { recursive: true });
    const targetDir = resolve(TMP, "react");
    const barrelEntries = new Map<string, BarrelEntry[]>();

    writeCompileOutput(
      makeResult("react", [{ path: "Button.tsx", contents: "export function Button() {}" }]),
      "Button",
      TMP,
      {},
      "none",
      barrelEntries,
    );

    expect(readFileSync(resolve(targetDir, "Button.tsx"), "utf-8")).toBe(
      "export function Button() {}",
    );
  });

  it("writes external source maps as .map files", () => {
    mkdirSync(TMP, { recursive: true });
    const targetDir = resolve(TMP, "react");
    const barrelEntries = new Map<string, BarrelEntry[]>();

    writeCompileOutput(
      makeResult("react", [{ path: "Button.tsx", contents: "code", sourceMap: '{"mappings":""}' }]),
      "Button",
      TMP,
      {},
      "external",
      barrelEntries,
    );

    expect(existsSync(resolve(targetDir, "Button.tsx.map"))).toBe(true);
  });

  it("collects barrel entries for non-CSS files", () => {
    mkdirSync(TMP, { recursive: true });
    const barrelEntries = new Map<string, BarrelEntry[]>();

    writeCompileOutput(
      makeResult("react", [
        { path: "Button.tsx", contents: "code" },
        { path: "Button.css", contents: ".btn {}" },
      ]),
      "Button",
      TMP,
      {},
      "none",
      barrelEntries,
    );

    const targetDir = resolve(TMP, "react");
    const entries = barrelEntries.get(targetDir)!;
    expect(entries).toHaveLength(1);
    expect(entries[0]!.componentName).toBe("Button");
  });

  it("writes story files but excludes them from barrel entries", () => {
    mkdirSync(TMP, { recursive: true });
    const barrelEntries = new Map<string, BarrelEntry[]>();

    writeCompileOutput(
      makeResult("react", [{ path: "colors.tsx", contents: "code" }]),
      "colors",
      TMP,
      {},
      "none",
      barrelEntries,
      "components/input/stories",
    );

    const targetDir = resolve(TMP, "react");
    expect(existsSync(resolve(targetDir, "components/input/stories/colors.tsx"))).toBe(true);
    expect(barrelEntries.get(targetDir)).toBeUndefined();
  });

  it("uses targetOutDir when set", () => {
    const customDir = resolve(TMP, "custom-react");
    mkdirSync(TMP, { recursive: true });
    const barrelEntries = new Map<string, BarrelEntry[]>();

    writeCompileOutput(
      makeResult("react", [{ path: "Button.tsx", contents: "code" }]),
      "Button",
      TMP,
      { react: customDir },
      "none",
      barrelEntries,
    );

    expect(existsSync(resolve(customDir, "Button.tsx"))).toBe(true);
  });
});
