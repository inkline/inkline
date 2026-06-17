import type { Locator, Page } from "@playwright/test";

/**
 * One screenshot step of a story's interaction scenario. `run` performs an action (relative to the
 * story's `#storybook-root`) before the screenshot is taken; omit it to capture the rendered state
 * as-is. Steps run sequentially on the same page — an authored flow ("hover, then press").
 */
export type Step = {
  readonly name: string;
  readonly run?: (root: Locator, page: Page) => Promise<void>;
};

/** Stories without an explicit scenario get a single `initial` render. */
const DEFAULT_SCENARIO: readonly Step[] = [{ name: "initial" }];

/**
 * Hand-maintained per-story interaction scenarios, keyed by Storybook story id
 * (e.g. `components-button--default`). Stories not listed here use {@link DEFAULT_SCENARIO}.
 *
 * To capture interaction states for a story, add an entry with ordered steps. Each `run` acts on the
 * story root via role-based locators — the DOM is identical across frameworks, so one scenario drives
 * all seven. Every step's screenshot is compared against React per step.
 *
 * A `pressed` step may leave the pointer held down (`page.mouse.down()`); the runner releases it after
 * the screenshot, so the held `:active` state is what gets captured.
 */
export const SCENARIOS: Readonly<Record<string, readonly Step[]>> = {
  // Worked example (the "clicking a button or hovering" case): exercises the :hover and :active
  // recipes across every framework. Copy this shape to add interaction coverage to other stories.
  "components-button--default": [
    { name: "initial" },
    { name: "hover", run: (root) => root.getByRole("button").first().hover() },
    {
      name: "pressed",
      run: async (root, page) => {
        await root.getByRole("button").first().hover();
        await page.mouse.down();
      },
    },
  ],

  // Template — focus + type into a text input (uncomment and adapt):
  // "components-input--default": [
  //   { name: "initial" },
  //   { name: "focus", run: (root) => root.getByRole("textbox").first().focus() },
  //   { name: "typed", run: (root) => root.getByRole("textbox").first().fill("Hello") },
  // ],
};

export function scenarioFor(id: string): readonly Step[] {
  return SCENARIOS[id] ?? DEFAULT_SCENARIO;
}
