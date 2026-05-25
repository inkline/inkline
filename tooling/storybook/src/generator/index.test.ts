import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  commonPrefix,
  computeCompilerRoot,
  discoverDefinitionFiles,
  loadStoryModule,
  resolveRenderImports,
  generate,
} from "./index.ts";
import { frameworkByTarget } from "./config.ts";

const FIXTURES = join(import.meta.dirname, "__fixtures__");
const STORIES_DIR = join(FIXTURES, "stories");

describe("commonPrefix", () => {
  it("returns the shared prefix of multiple directories", () => {
    expect(commonPrefix(["/a/b/c", "/a/b/d", "/a/b/e"])).toBe("/a/b/");
  });

  it("returns the full path when all directories are identical", () => {
    expect(commonPrefix(["/a/b", "/a/b"])).toBe("/a/b/");
  });

  it("returns empty string for an empty array", () => {
    expect(commonPrefix([])).toBe("");
  });

  it("stops at the first divergence", () => {
    expect(commonPrefix(["/a/b/c", "/a/x/y"])).toBe("/a/");
  });
});

describe("computeCompilerRoot", () => {
  it("returns the common prefix of .ink.tsx file directories", () => {
    const root = computeCompilerRoot(STORIES_DIR);
    expect(root).toBe(STORIES_DIR + "/");
  });

  it("falls back to srcDir when no .ink.tsx files exist", () => {
    const root = computeCompilerRoot(join(FIXTURES, "bad", "empty"));
    expect(root).toBe(join(FIXTURES, "bad", "empty"));
  });
});

describe("discoverDefinitionFiles", () => {
  it("returns absolute, sorted definition paths (recursive)", () => {
    const files = discoverDefinitionFiles(STORIES_DIR);
    expect(files.map((f) => f.replace(STORIES_DIR + "/", ""))).toEqual([
      "Badge.stories.ts",
      "Button.stories.ts",
      "Card.stories.ts",
    ]);
    expect(files.every((f) => f.startsWith("/"))).toBe(true);
  });

  it("returns an empty array when no definitions are present", () => {
    expect(discoverDefinitionFiles(join(FIXTURES, "bad", "empty"))).toEqual([]);
  });
});

describe("loadStoryModule", () => {
  it("loads a module authored with defineStories", async () => {
    const mod = await loadStoryModule(join(STORIES_DIR, "Button.stories.ts"));
    expect(mod.meta.component).toBe("Button");
    expect(mod.meta.title).toBe("Components/Button");
    expect(Object.keys(mod.stories)).toEqual(["Default", "Disabled"]);
  });

  it("loads a module authored as a plain object", async () => {
    const mod = await loadStoryModule(join(STORIES_DIR, "Card.stories.ts"));
    expect(mod.meta.component).toBe("Card");
    expect(Object.keys(mod.stories)).toEqual(["Default"]);
  });

  it("loads render story references as string paths", async () => {
    const mod = await loadStoryModule(join(STORIES_DIR, "Badge.stories.ts"));
    expect(mod.stories.Colors).toEqual({ render: "./colors.ink.tsx" });
    expect(mod.stories.Sizes).toEqual({ render: "./sizes.ink.tsx" });
  });

  it.each([
    ["noDefault.stories.ts", /default export must be an object/],
    ["notObject.stories.ts", /default export must be an object/],
    ["missingComponent.stories.ts", /`component` must be a non-empty string/],
    ["missingTitle.stories.ts", /`title` must be a non-empty string/],
    ["noStoryExports.stories.ts", /must export at least one named story/],
    ["badExport.stories.ts", /export "Bad" must be an object/],
  ])("rejects %s with a descriptive, sourced error", async (file, message) => {
    const path = join(FIXTURES, "bad", file);
    await expect(loadStoryModule(path)).rejects.toThrow(message);
    await expect(loadStoryModule(path)).rejects.toThrow(path);
  });
});

describe("resolveRenderImports", () => {
  it("resolves render paths to framework-specific compiled imports", async () => {
    const mod = await loadStoryModule(join(STORIES_DIR, "Badge.stories.ts"));
    const react = frameworkByTarget("react")!;
    const imports = resolveRenderImports(mod, STORIES_DIR, react);

    expect(imports).toHaveLength(2);
    expect(imports[0]!.storyName).toBe("Colors");
    expect(imports[0]!.localName).toBe("ColorsStory");
    expect(imports[0]!.importPath).toContain("../generated/");
    expect(imports[0]!.importPath).toContain("colors.tsx");

    expect(imports[1]!.storyName).toBe("Sizes");
    expect(imports[1]!.localName).toBe("SizesStory");
    expect(imports[1]!.importPath).toContain("sizes.tsx");
  });

  it("uses framework-specific compiled extensions", async () => {
    const mod = await loadStoryModule(join(STORIES_DIR, "Badge.stories.ts"));
    const vue = frameworkByTarget("vue")!;
    const imports = resolveRenderImports(mod, STORIES_DIR, vue);

    expect(imports[0]!.importPath).toContain("colors.vue");
  });

  it("returns empty array when no render stories exist", async () => {
    const mod = await loadStoryModule(join(STORIES_DIR, "Button.stories.ts"));
    const react = frameworkByTarget("react")!;
    const imports = resolveRenderImports(mod, STORIES_DIR, react);

    expect(imports).toEqual([]);
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
    const result = await generate({
      srcDir: STORIES_DIR,
      rootDir: outDir,
      frameworks,
    });

    expect(result.components).toEqual(["IBadge", "Button", "Card"]);
    expect(result.files).toHaveLength(3 * 3);

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

  it("generates render story imports and expressions", async () => {
    const frameworks = [frameworkByTarget("react")!];
    await generate({ srcDir: STORIES_DIR, rootDir: outDir, frameworks });

    const reactBadge = readFileSync(join(outDir, "react", "stories", "IBadge.stories.ts"), "utf-8");
    expect(reactBadge).toContain('import { createElement } from "react";');
    expect(reactBadge).toContain("import ColorsStory from");
    expect(reactBadge).toContain(
      "export const Colors: Story = { render: () => createElement(ColorsStory) };",
    );
  });

  it("defaults to all seven active frameworks", async () => {
    const result = await generate({ srcDir: STORIES_DIR, rootDir: outDir });
    expect(result.files).toHaveLength(7 * 3);
    expect(result.files.some((f) => f.target === "astro")).toBe(true);
  });
});
