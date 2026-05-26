import type { LoadedStoryModule, ResolvedRenderImport } from "./index.ts";
import type { FrameworkConfig } from "./config.ts";
import { renderCsf3 } from "./templates/csf3.ts";
import { renderAngular } from "./templates/angular.ts";

export function renderStory(
  storyModule: LoadedStoryModule,
  framework: FrameworkConfig,
  renderImports: readonly ResolvedRenderImport[],
): string {
  switch (framework.template) {
    case "csf3":
      return renderCsf3(storyModule, framework, renderImports);
    case "angular":
      return renderAngular(storyModule, framework, renderImports);
  }
}
