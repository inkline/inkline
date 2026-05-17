import type { StoryDefinition } from "../define.ts";
import type { FrameworkConfig } from "./config.ts";
import { renderCsf3 } from "./templates/csf3.ts";
import { renderAngular } from "./templates/angular.ts";
import { renderAstro } from "./templates/astro.ts";

/** Renders a story file for a framework by dispatching on its template kind. */
export function renderStory(
  definition: StoryDefinition<unknown>,
  framework: FrameworkConfig,
): string {
  switch (framework.template) {
    case "csf3":
      return renderCsf3(definition, framework);
    case "angular":
      return renderAngular(definition, framework);
    case "astro":
      return renderAstro(definition, framework);
  }
}
