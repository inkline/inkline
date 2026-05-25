import { describe, it, expect } from "vitest";
import { renderStory } from "./render.ts";
import { frameworkByTarget } from "./config.ts";
import type { LoadedStoryModule } from "./index.ts";

const mod: LoadedStoryModule = {
  meta: { component: "Button", title: "Components/Button" },
  stories: { Default: {} },
  sourcePath: "/fake/Button.stories.ts",
};

describe("renderStory", () => {
  it("dispatches csf3 frameworks to the CSF3 template", () => {
    expect(renderStory(mod, frameworkByTarget("react")!, [])).toContain(
      "} satisfies Meta<typeof Button>;",
    );
  });

  it("dispatches angular to the Angular template", () => {
    expect(renderStory(mod, frameworkByTarget("angular")!, [])).toContain(
      "const meta: Meta<Button> = {",
    );
  });

  it("dispatches astro via the CSF3 template (same structure)", () => {
    const out = renderStory(mod, frameworkByTarget("astro")!, []);
    expect(out).toContain('from "@storybook-astro/framework";');
    expect(out).toContain('from "@inkline/astro";');
  });
});
