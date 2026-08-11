#!/usr/bin/env node

/**
 * Repo-root `tsc`. It does not type-check — it fails, on purpose.
 *
 * Without this bin there is no `tsc` in the root `node_modules/.bin`, so `npx tsc` reaches past the
 * repo and resolves the `tsc` package on npm — a decoy that prints "This is not the tsc command you
 * are looking for" and does no type-checking. That has already been read as a clean run by both a
 * human and an agent wrapper, on both branches of a comparison, while deciding whether a fix worked.
 *
 * A command that fails loudly costs a confused minute. A command that succeeds falsely costs a wrong
 * merge decision. So: non-zero, every time, naming the command that actually gates the merge.
 */

const GATE = "pnpm run typecheck";

process.stderr.write(
  [
    "",
    "  tsc is not the type-check gate in this repo, and this is not tsc.",
    "",
    "  Run the gate instead:",
    "",
    `    ${GATE}`,
    "",
    "  That builds the workspace, then runs `vp check --no-fmt --no-lint` — byte for byte the",
    "  command CI's Type Check job runs. The build is not optional: package types resolve through",
    "  each package's published `exports` into `dist/`, so checking without building type-checks the",
    "  code you had before your change and reports success.",
    "",
    "  To run the real compiler on purpose (rarely what you want — it is not the gate):",
    "",
    "    cd <package> && node_modules/.bin/tsc --noEmit -p tsconfig.json",
    "",
    "  Background: docs/contributing.md → \u201cType-checking on its own\u201d.",
    "",
  ].join("\n"),
);

process.exit(1);
