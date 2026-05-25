import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { discoverDefinitionFiles, loadDefinition, generate } from "./index.ts";
import { frameworkByTarget } from "./config.ts";

const FIXTURES = join(import.meta.dirname, "__fixtures__");
const STORIES_DIR = join(FIXTURES, "stories");

describe("discoverDefinitionFiles", () => {
  it("returns absolute, sorted definition paths", () => {
    const files = discoverDefinitionFiles(STORIES_DIR);
    expect(files.map((f) => f.replace(STORIES_DIR + "/", ""))).toEqual([
      "Button.stories.ts",
      "Card.stories.ts",
    ]);
    expect(files.every((f) => f.startsWith("/"))).toBe(true);
  });

  it("returns an empty array when no definitions are present", () => {
    expect(discoverDefinitionFiles(FIXTURES)).toEqual([]);
  });
});

describe("loadDefinition", () => {
  it("loads a definition authored with defineStories", async () => {
    const def = await loadDefinition(join(STORIES_DIR, "Button.stories.ts"));
    expect(def.component).toBe("Button");
    expect(def.title).toBe("Components/Button");
    expect(Object.keys(def.stories)).toEqual(["Default", "Disabled"]);
  });

  it("loads a definition authored as a plain object", async () => {
    const def = await loadDefinition(join(STORIES_DIR, "Card.stories.ts"));
    expect(def.component).toBe("Card");
  });

  it.each([
    ["noDefault.stories.ts", /default export must be an object/],
    ["notObject.stories.ts", /default export must be an object/],
    ["missingComponent.stories.ts", /`component` must be a non-empty string/],
    ["missingTitle.stories.ts", /`title` must be a non-empty string/],
    ["emptyStories.stories.ts", /`stories` must contain at least one story/],
  ])("rejects %s with a descriptive, sourced error", async (file, message) => {
    const path = join(FIXTURES, "bad", file);
    await expect(loadDefinition(path)).rejects.toThrow(message);
    await expect(loadDefinition(path)).rejects.toThrow(path);
  });
});

describe("generate", () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(join(tmpdir(), "inkline-sb-"));
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it("emits one story file per component per requested framework", async () => {
    const frameworks = [
      frameworkByTarget("react")!,
      frameworkByTarget("vue")!,
      frameworkByTarget("angular")!,
    ];
    const result = await generate({ srcDir: STORIES_DIR, rootDir: outDir, frameworks });

    expect(result.components).toEqual(["Button", "Card"]);
    expect(result.files).toHaveLength(2 * 3);

    const reactButton = readFileSync(
      join(outDir, "react", "stories", "Button.stories.ts"),
      "utf-8",
    );
    expect(reactButton).toContain('import { Button } from "@inkline/react";');
    expect(reactButton).toContain("} satisfies Meta<typeof Button>;");

    const angularButton = readFileSync(
      join(outDir, "angular", "stories", "Button.stories.ts"),
      "utf-8",
    );
    expect(angularButton).toContain("const meta: Meta<Button> = {");
  });

  it("defaults to all seven active frameworks", async () => {
    const result = await generate({ srcDir: STORIES_DIR, rootDir: outDir });
    expect(result.files).toHaveLength(7 * 2);
    expect(result.files.some((f) => f.target === "astro")).toBe(true);
  });
});
