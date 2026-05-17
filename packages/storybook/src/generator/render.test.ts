import { describe, it, expect } from "vitest";
import { renderStory } from "./render.ts";
import { frameworkByTarget } from "./config.ts";
import type { StoryDefinition } from "../define.ts";

const def: StoryDefinition<unknown> = {
  component: "Button",
  title: "Components/Button",
  stories: { Default: {} },
};

describe("renderStory", () => {
  it("dispatches csf3 frameworks to the CSF3 template", () => {
    expect(renderStory(def, frameworkByTarget("react")!)).toContain(
      "} satisfies Meta<typeof Button>;",
    );
  });

  it("dispatches angular to the Angular template", () => {
    expect(renderStory(def, frameworkByTarget("angular")!)).toContain(
      "const meta: Meta<Button> = {",
    );
  });

  it("dispatches astro to the deferred Astro template (throws)", () => {
    expect(() => renderStory(def, frameworkByTarget("astro")!)).toThrow(/not implemented yet/);
  });
});
