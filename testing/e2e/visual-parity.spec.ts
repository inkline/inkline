import { expect, test } from "@playwright/test";
import {
  type Capture,
  attachDiff,
  compare,
  fetchStoryIds,
  parseShard,
  runScenario,
  shardStories,
} from "./storybook";

/**
 * Cross-framework visual parity: every story is rendered in each framework's Storybook and compared,
 * step by step, against the React reference. Story ids are identical across frameworks (enforced by
 * the story generator), so one id drives all seven. See `apps/storybook/AGENTS.md`.
 */

// Storybook dev ports — the composition refs in `.storybook/main.ts`.
const REACT_PORT = 6006;
const COMPARED: ReadonlyArray<readonly [framework: string, port: number]> = [
  ["vue", 6007],
  ["svelte", 6008],
  ["solid", 6009],
  ["angular", 6010],
  // Qwik is compared like the others. (Its Storybook has had an empty-container resume issue upstream;
  // the suite waits for the container to resume — see waitForStoryReady — so it does capture output.)
  ["qwik", 6011],
  ["astro", 6012],
];

// Max fraction of differing pixels tolerated per step. Calibrate from the first run.
const MAX_DIFF_RATIO = 0.01;

let storyIds: string[] = [];
// `${id}::${step}` → React capture. Persists across the sequential per-framework tests (workers: 1).
const reference = new Map<string, Capture>();

test.beforeAll(async ({ browser }) => {
  test.setTimeout(10 * 60_000);
  const page = await browser.newPage();
  try {
    const all = await fetchStoryIds(page.request, REACT_PORT);
    storyIds = shardStories(all, parseShard());
    process.stdout.write(
      `[visual-parity] STORY_SHARD=${process.env.STORY_SHARD ?? "(none)"} → ${storyIds.length} of ${all.length} stories\n`,
    );
    for (const id of storyIds) {
      for (const [step, capture] of await runScenario(page, REACT_PORT, id)) {
        reference.set(`${id}::${step}`, capture);
      }
    }
  } finally {
    await page.close();
  }
});

for (const [framework, port] of COMPARED) {
  test(`${framework} matches react`, async ({ page }, testInfo) => {
    test.skip(storyIds.length === 0, "no stories assigned to this shard");
    for (const id of storyIds) {
      for (const [step, candidate] of await runScenario(page, port, id)) {
        const ref = reference.get(`${id}::${step}`);
        if (!ref) {
          expect.soft(ref, `${framework} ${id} @${step}: missing React reference`).toBeTruthy();
          continue;
        }
        const { diffRatio, diffPng, mismatch } = compare(ref, candidate);
        if (mismatch || diffRatio > MAX_DIFF_RATIO) {
          await attachDiff(testInfo, framework, id, step, ref, candidate, diffPng);
        }
        expect.soft(mismatch, `${framework} ${id} @${step}: ${mismatch ?? ""}`).toBeNull();
        if (!mismatch) {
          expect
            .soft(
              diffRatio,
              `${framework} ${id} @${step}: ${(diffRatio * 100).toFixed(3)}% of pixels differ`,
            )
            .toBeLessThanOrEqual(MAX_DIFF_RATIO);
        }
      }
    }
  });
}
