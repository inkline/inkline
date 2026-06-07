import { describe, it, expect, afterEach } from "vitest";
import { mkdirSync, rmSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { BarrelGroup, CompileResult } from "@inkline/compiler";
import { writeCompileOutput } from "./writer.ts";
import type { BarrelMap } from "./barrel.ts";

const TMP = resolve(import.meta.dirname!, "..", "..", ".tmp-writer-test");

/** Legacy single-barrel grouping: every non-story file lands in index.ts. */
const LEGACY_GROUPS: BarrelGroup[] = [{ file: "index.ts", match: "" }];

/** Per-category grouping used by ui/components. */
const CATEGORY_GROUPS: BarrelGroup[] = [
  { file: "index.ts", match: "styled" },
  { file: "headless.ts", match: "headless" },
];

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
    const barrelEntries: BarrelMap = new Map();

    writeCompileOutput(
      makeResult("react", [{ path: "Button.tsx", contents: "export function Button() {}" }]),
      "Button",
      TMP,
      {},
      "none",
      barrelEntries,
      LEGACY_GROUPS,
    );

    expect(readFileSync(resolve(targetDir, "Button.tsx"), "utf-8")).toBe(
      "export function Button() {}",
    );
  });

  it("writes external source maps as .map files", () => {
    mkdirSync(TMP, { recursive: true });
    const targetDir = resolve(TMP, "react");
    const barrelEntries: BarrelMap = new Map();

    writeCompileOutput(
      makeResult("react", [{ path: "Button.tsx", contents: "code", sourceMap: '{"mappings":""}' }]),
      "Button",
      TMP,
      {},
      "external",
      barrelEntries,
      LEGACY_GROUPS,
    );

    expect(existsSync(resolve(targetDir, "Button.tsx.map"))).toBe(true);
  });

  it("collects barrel entries for non-CSS files", () => {
    mkdirSync(TMP, { recursive: true });
    const barrelEntries: BarrelMap = new Map();

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
      LEGACY_GROUPS,
    );

    const targetDir = resolve(TMP, "react");
    const entries = barrelEntries.get(targetDir)!.get("index.ts")!;
    expect(entries).toHaveLength(1);
    expect(entries[0]!.componentName).toBe("Button");
  });

  it("routes styled and headless files to separate barrels in the same target dir", () => {
    mkdirSync(TMP, { recursive: true });
    const barrelEntries: BarrelMap = new Map();

    writeCompileOutput(
      makeResult("react", [{ path: "IButton.tsx", contents: "code" }]),
      "IButton",
      TMP,
      {},
      "none",
      barrelEntries,
      CATEGORY_GROUPS,
      "components/button/styled",
    );
    writeCompileOutput(
      makeResult("react", [{ path: "IButtonBase.tsx", contents: "code" }]),
      "IButtonBase",
      TMP,
      {},
      "none",
      barrelEntries,
      CATEGORY_GROUPS,
      "components/button/headless",
    );

    const byFile = barrelEntries.get(resolve(TMP, "react"))!;
    expect(byFile.get("index.ts")!.map((e) => e.componentName)).toEqual(["IButton"]);
    expect(byFile.get("headless.ts")!.map((e) => e.componentName)).toEqual(["IButtonBase"]);
    expect(byFile.get("index.ts")![0]!.fileName).toBe("components/button/styled/IButton.tsx");
  });

  it("writes story render files but excludes them from every barrel", () => {
    mkdirSync(TMP, { recursive: true });
    const barrelEntries: BarrelMap = new Map();

    writeCompileOutput(
      makeResult("react", [{ path: "colors.tsx", contents: "code" }]),
      "colors",
      TMP,
      {},
      "none",
      barrelEntries,
      CATEGORY_GROUPS,
      "components/input/stories",
    );

    const targetDir = resolve(TMP, "react");
    expect(existsSync(resolve(targetDir, "components/input/stories/colors.tsx"))).toBe(true);
    expect(barrelEntries.get(targetDir)).toBeUndefined();
  });

  it("uses targetOutDir when set", () => {
    const customDir = resolve(TMP, "custom-react");
    mkdirSync(TMP, { recursive: true });
    const barrelEntries: BarrelMap = new Map();

    writeCompileOutput(
      makeResult("react", [{ path: "Button.tsx", contents: "code" }]),
      "Button",
      TMP,
      { react: customDir },
      "none",
      barrelEntries,
      LEGACY_GROUPS,
    );

    expect(existsSync(resolve(customDir, "Button.tsx"))).toBe(true);
  });
});
