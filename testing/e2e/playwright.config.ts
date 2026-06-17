import { resolve } from "node:path";
import { defineConfig } from "@playwright/test";

const CI = !!process.env.CI;

/**
 * Cross-framework visual-parity suite. See `visual-parity.spec.ts` and this package's `AGENTS.md`.
 *
 * The `webServer` boots the composition Storybook from the repo root (`pnpm run storybook:test`,
 * which culminates in the aggregator on :6100 after every per-framework dev server is up). The
 * specs then screenshot each framework's standalone `iframe.html` on its own port (6006–6012).
 * Locally, an already-running `pnpm run storybook` is reused.
 */
export default defineConfig({
  testDir: ".",
  // Sequential by design: one framework's dev server exercised at a time (workers: 1). Sharding is
  // on the story axis via the STORY_SHARD env, not Playwright's test-level `--shard`.
  fullyParallel: false,
  workers: 1,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  // The suite loops every story × step for a framework inside one test; give it room.
  timeout: 8 * 60_000,
  reporter: CI ? [["list"], ["html", { open: "never" }]] : "html",
  use: {
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    // A framework missing the target element (Qwik's empty render) should fail an interaction step
    // fast, not hang for the default 30s.
    actionTimeout: 5_000,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    // `storybook:test` boots the per-framework dev servers + the :6100 aggregator WITHOUT the
    // `@inkline/components` compile watcher. The watcher and each framework's `prestorybook` compile
    // both write `ui/<fw>/.inkline`, and on a cold boot they race (`rmSync` → ENOTEMPTY). Tests don't
    // need live-reload, so dropping the watcher makes the boot deterministic.
    command: "pnpm run storybook:test",
    cwd: resolve(import.meta.dirname, "..", ".."),
    url: "http://localhost:6100",
    reuseExistingServer: !CI,
    timeout: 5 * 60_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
