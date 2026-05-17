/**
 * The identity inputs Storybook derives a story ID from: the sidebar `title`
 * and each story export name. If these are identical across frameworks then the
 * derived `iframe.html?id=…` is identical too — the invariant the future
 * cross-framework Playwright screenshot diffing relies on.
 */
export interface StoryKeys {
  readonly title: string;
  /** Story export names, sorted for order-independent comparison. */
  readonly stories: readonly string[];
}

const TITLE_LINE = /^\s*title: (.+),\s*$/m;
const STORY_EXPORT = /^export const ([A-Za-z_$][\w$]*): Story =/gm;

/**
 * Extracts the ID-determining keys from a rendered story file. The format is
 * emitted by this package's own templates, so extraction is exact.
 */
export function extractStoryKeys(source: string): StoryKeys {
  const titleMatch = TITLE_LINE.exec(source);
  if (!titleMatch) {
    throw new Error("Rendered story file has no title line.");
  }
  const title = JSON.parse(titleMatch[1]!) as string;

  const stories = [...source.matchAll(STORY_EXPORT)].map((m) => m[1]!).sort();
  if (stories.length === 0) {
    throw new Error("Rendered story file exports no stories.");
  }

  return { title, stories };
}

/**
 * Asserts every framework produced the same title and story export names for a
 * component, so the derived story IDs match across renderers.
 */
export function assertStableStoryKeys(
  component: string,
  perFramework: ReadonlyMap<string, StoryKeys>,
): void {
  const entries = [...perFramework];
  const [, reference] = entries[0]!;
  const referenceStories = reference.stories.join(",");

  for (const [target, keys] of entries.slice(1)) {
    if (keys.title !== reference.title || keys.stories.join(",") !== referenceStories) {
      throw new Error(
        `Unstable story IDs for "${component}": ${target} emitted ` +
          `${JSON.stringify(keys)} but expected ${JSON.stringify(reference)}.`,
      );
    }
  }
}
