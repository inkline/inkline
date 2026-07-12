import type { APIRequestContext, Page, TestInfo } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { scenarioFor } from "./scenarios";

const ROOT_SELECTOR = "#storybook-root";

/** Per-pixel sensitivity (0 strict … 1 loose); anti-aliased pixels are ignored by default. */
const PIXELMATCH_THRESHOLD = 0.2;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** A single rendered capture: a decoded PNG, or a marker that nothing usable rendered. */
export type Capture =
  | { readonly kind: "png"; readonly png: PNG; readonly width: number; readonly height: number }
  | { readonly kind: "empty"; readonly reason: string };

// --- story enumeration ---------------------------------------------------------------------------

type StoryIndex = {
  readonly entries: Record<string, { readonly id: string; readonly type: string }>;
};

/**
 * Read the sorted list of story ids from a Storybook dev server's `/index.json` (React = the
 * reference). The index is built lazily and debounced on cold start, so retry briefly.
 */
export async function fetchStoryIds(request: APIRequestContext, port: number): Promise<string[]> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await request.get(`http://localhost:${port}/index.json`, {
        timeout: 10_000,
      });
      if (response.ok()) {
        const index = (await response.json()) as StoryIndex;
        const ids = Object.values(index.entries)
          .filter((entry) => entry.type === "story")
          .map((entry) => entry.id)
          .sort();
        if (ids.length > 0) return ids;
      }
    } catch (error) {
      lastError = error;
    }
    await wait(1_000);
  }
  throw new Error(
    `Could not read a non-empty story index from :${port}/index.json (${String(lastError)})`,
  );
}

// --- sharding ------------------------------------------------------------------------------------

export type Shard = { readonly index: number; readonly total: number } | null;

/** Parse `STORY_SHARD="i/n"`. Unset/empty → null (all stories). */
export function parseShard(value = process.env.STORY_SHARD): Shard {
  if (!value) return null;
  const [index, total] = value.split("/").map(Number);
  if (
    !Number.isInteger(index) ||
    !Number.isInteger(total) ||
    index < 1 ||
    total < 1 ||
    index > total
  ) {
    throw new Error(`Invalid STORY_SHARD="${value}" (expected "i/n", e.g. "1/2")`);
  }
  return { index, total };
}

/** Slice the sorted story list into `total` contiguous chunks and return chunk `index`. */
export function shardStories(ids: readonly string[], shard: Shard): string[] {
  if (!shard) return [...ids];
  const size = Math.ceil(ids.length / shard.total);
  return ids.slice((shard.index - 1) * size, shard.index * size);
}

// --- rendering & capture -------------------------------------------------------------------------

/** Kills the usual screenshot nondeterminism: transitions, animations, caret blink, scrollbars. */
const FREEZE_CSS = `
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
    caret-color: transparent !important;
  }
  html { scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }
`;

function iframeUrl(port: number, id: string): string {
  return `http://localhost:${port}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`;
}

async function waitForStoryReady(page: Page): Promise<void> {
  // Storybook 10 marks each render "finished" (or "errored") when it settles. Bounded so a framework
  // that never finishes rendering fails fast instead of hanging — screenshotRoot then records it empty.
  try {
    await page.waitForFunction(
      () => {
        const renders = (
          window as unknown as {
            __STORYBOOK_PREVIEW__?: { storyRenders?: Array<{ phase?: string }> };
          }
        ).__STORYBOOK_PREVIEW__?.storyRenders;
        return (
          Array.isArray(renders) &&
          renders.some((r) => r.phase === "finished" || r.phase === "errored")
        );
      },
      { timeout: 15_000 },
    );
  } catch {
    // Capture whatever rendered (e.g. an empty container) rather than hanging.
  }
  // Qwik renders in two phases: the SSR container mounts "paused" (collapsed), then resumes and
  // hydrates asynchronously. Storybook's render phase settles at mount — before resume — so a capture
  // taken then intermittently catches the pre-resume container (a tiny placeholder) and reports a
  // spurious dimension mismatch against the already-painted React reference. Wait for the container to
  // reach `q:container="resumed"` when one is present; a no-op for every other framework. Bounded and
  // non-fatal so a genuinely stuck resume still fails fast via screenshotRoot rather than hanging.
  try {
    await page.waitForFunction(
      () => {
        const container = document.querySelector("#storybook-root [q\\:container]");
        return !container || container.getAttribute("q:container") === "resumed";
      },
      { timeout: 8_000 },
    );
  } catch {
    // Resume never completed — capture whatever is there and let the diff surface it.
  }
  await page.evaluate(() => document.fonts.ready).catch(() => undefined);
  await page.waitForTimeout(120);
}

async function screenshotRoot(page: Page): Promise<Capture> {
  const root = page.locator(ROOT_SELECTOR);
  try {
    const box = await root.boundingBox();
    if (!box || box.width < 1 || box.height < 1) {
      return { kind: "empty", reason: "story root has zero size (nothing rendered)" };
    }
    const png = PNG.sync.read(await root.screenshot({ animations: "disabled" }));
    return { kind: "png", png, width: png.width, height: png.height };
  } catch (error) {
    return { kind: "empty", reason: `screenshot failed: ${String(error)}` };
  }
}

/**
 * Navigate to a story's standalone iframe and run its scenario, returning a screenshot per step.
 * Steps run sequentially on the same page; a failed interaction (e.g. a missing element) records an
 * empty capture for that step and continues. Any held pointer is released after each screenshot.
 */
export async function runScenario(
  page: Page,
  port: number,
  id: string,
): Promise<Map<string, Capture>> {
  const captures = new Map<string, Capture>();
  await page.goto(iframeUrl(port, id), { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: FREEZE_CSS }).catch(() => undefined);
  await waitForStoryReady(page);

  const root = page.locator(ROOT_SELECTOR);
  for (const step of scenarioFor(id)) {
    if (step.run) {
      try {
        await step.run(root, page);
      } catch (error) {
        captures.set(step.name, {
          kind: "empty",
          reason: `step "${step.name}" action failed: ${String(error)}`,
        });
        await page.mouse.up().catch(() => undefined);
        continue;
      }
    }
    await page.evaluate(() => document.fonts.ready).catch(() => undefined);
    await page.waitForTimeout(80);
    captures.set(step.name, await screenshotRoot(page));
    await page.mouse.up().catch(() => undefined);
  }
  return captures;
}

// --- comparison ----------------------------------------------------------------------------------

export type DiffResult = {
  readonly diffRatio: number;
  readonly diffPng: Buffer | null;
  /** Non-null when the captures can't be pixel-compared (empty render or differing dimensions). */
  readonly mismatch: string | null;
};

export function compare(reference: Capture, candidate: Capture): DiffResult {
  if (reference.kind === "empty" || candidate.kind === "empty") {
    const parts: string[] = [];
    if (reference.kind === "empty") parts.push(`reference empty (${reference.reason})`);
    if (candidate.kind === "empty") parts.push(`candidate empty (${candidate.reason})`);
    return { diffRatio: 1, diffPng: null, mismatch: parts.join("; ") };
  }
  if (reference.width !== candidate.width || reference.height !== candidate.height) {
    return {
      diffRatio: 1,
      diffPng: null,
      mismatch: `dimension mismatch: reference ${reference.width}x${reference.height} vs candidate ${candidate.width}x${candidate.height}`,
    };
  }
  const diff = new PNG({ width: reference.width, height: reference.height });
  const differing = pixelmatch(
    reference.png.data,
    candidate.png.data,
    diff.data,
    reference.width,
    reference.height,
    {
      threshold: PIXELMATCH_THRESHOLD,
    },
  );
  return {
    diffRatio: differing / (reference.width * reference.height),
    diffPng: PNG.sync.write(diff),
    mismatch: null,
  };
}

/** Attach the reference, candidate, and diff PNGs to the test report for a mismatching step. */
export async function attachDiff(
  testInfo: TestInfo,
  framework: string,
  id: string,
  step: string,
  reference: Capture,
  candidate: Capture,
  diffPng: Buffer | null,
): Promise<void> {
  const base = `${id}__${step}`;
  if (reference.kind === "png") {
    await testInfo.attach(`${base}__react.png`, {
      body: PNG.sync.write(reference.png),
      contentType: "image/png",
    });
  }
  if (candidate.kind === "png") {
    await testInfo.attach(`${base}__${framework}.png`, {
      body: PNG.sync.write(candidate.png),
      contentType: "image/png",
    });
  }
  if (diffPng) {
    await testInfo.attach(`${base}__diff.png`, { body: diffPng, contentType: "image/png" });
  }
}
