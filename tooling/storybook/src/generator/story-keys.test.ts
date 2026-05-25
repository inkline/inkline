import { describe, it, expect } from "vitest";
import { extractStoryKeys, assertStableStoryKeys, type StoryKeys } from "./story-keys.ts";
import { renderCsf3 } from "./templates/csf3.ts";
import { renderAngular } from "./templates/angular.ts";
import { frameworkByTarget } from "./config.ts";
import type { LoadedStoryModule } from "./index.ts";

const mod: LoadedStoryModule = {
  meta: { component: "Button", title: "Components/Button" },
  stories: { Default: {}, Disabled: { args: { disabled: true } } },
  sourcePath: "/fake/Button.stories.ts",
};

describe("extractStoryKeys", () => {
  it("reads the title and sorted story names from rendered output", () => {
    const keys = extractStoryKeys(renderCsf3(mod, frameworkByTarget("react")!, []));
    expect(keys).toEqual({ title: "Components/Button", stories: ["Default", "Disabled"] });
  });

  it("throws when no title line is present", () => {
    expect(() => extractStoryKeys("export const Default: Story = {};")).toThrow(/no title line/);
  });

  it("throws when no stories are exported", () => {
    expect(() => extractStoryKeys('  title: "X",\n')).toThrow(/exports no stories/);
  });
});

describe("assertStableStoryKeys", () => {
  it("passes when every framework yields the same title and story names", () => {
    const perFramework = new Map<string, StoryKeys>([
      ["react", extractStoryKeys(renderCsf3(mod, frameworkByTarget("react")!, []))],
      ["vue", extractStoryKeys(renderCsf3(mod, frameworkByTarget("vue")!, []))],
      ["angular", extractStoryKeys(renderAngular(mod, frameworkByTarget("angular")!, []))],
    ]);
    expect(() => assertStableStoryKeys("Button", perFramework)).not.toThrow();
  });

  it("throws when a framework diverges on title", () => {
    const perFramework = new Map<string, StoryKeys>([
      ["react", { title: "Components/Button", stories: ["Default"] }],
      ["vue", { title: "Button", stories: ["Default"] }],
    ]);
    expect(() => assertStableStoryKeys("Button", perFramework)).toThrow(
      /Unstable story IDs for "Button": vue/,
    );
  });

  it("throws when a framework diverges on story names", () => {
    const perFramework = new Map<string, StoryKeys>([
      ["react", { title: "Components/Button", stories: ["Default"] }],
      ["vue", { title: "Components/Button", stories: ["Primary"] }],
    ]);
    expect(() => assertStableStoryKeys("Button", perFramework)).toThrow(/Unstable story IDs/);
  });
});
