import type { StoryDefinition } from "../../define.ts";
import type { FrameworkConfig } from "../config.ts";

/**
 * Astro's Storybook renderer (`@storybook-astro/framework`) does not expose a
 * runtime component object usable as `Meta<typeof Component>`; its authoring
 * model differs from CSF3 and needs a dedicated template plus a compatibility
 * spike. Astro is marked `deferred` in the framework config so the generator
 * never reaches this path. Implemented in the Qwik + Astro phase.
 */
export function renderAstro(
  _definition: StoryDefinition<unknown>,
  _framework: FrameworkConfig,
): string {
  throw new Error(
    "Astro story template is not implemented yet (deferred to the Qwik + Astro phase). " +
      "Astro is marked deferred in the framework config and should be skipped by the generator.",
  );
}
