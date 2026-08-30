import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_OUTPUT,
  DEFAULT_SOURCE,
  check,
  extractAriaAttributes,
} from "../../scripts/gen-aria-attributes.ts";
import { ARIA_ATTRIBUTES } from "./aria-attributes.generated.ts";

/**
 * `aria-attributes.generated.ts` is derived from `@inkline/core`'s vendored JSX element types. This
 * is the gate that keeps the derivation honest: a `generate:jsx` re-sync that adds or drops an ARIA
 * attribute without re-running `generate:aria` fails here rather than leaving INK0072 checking
 * against a stale spec.
 */

const scratchDirs: string[] = [];

afterEach(() => {
  for (const dir of scratchDirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

/** A throwaway copy of the generated module, corrupted the way a hand-edit or a stale copy would. */
function tamperedOutput(corrupt: (contents: string) => string): string {
  const dir = mkdtempSync(join(tmpdir(), "inkline-aria-"));
  scratchDirs.push(dir);
  const path = join(dir, "aria-attributes.generated.ts");
  writeFileSync(path, corrupt(readFileSync(DEFAULT_OUTPUT, "utf8")));
  return path;
}

describe("ARIA attribute set", () => {
  it("matches the vendored JSX types it is generated from", () => {
    expect(check()).toEqual([]);
  });

  // A passing checker proves nothing on its own; these are the ways it must bite.
  it("fails the check when an attribute is added by hand", () => {
    const path = tamperedOutput((contents) =>
      contents.replace('"aria-hidden",', '"aria-hidden",\n  "aria-invented",'),
    );
    expect(check(DEFAULT_SOURCE, path)).toHaveLength(1);
  });

  it("fails the check when an attribute is removed by hand", () => {
    const path = tamperedOutput((contents) => contents.replace('  "aria-hidden",\n', ""));
    expect(check(DEFAULT_SOURCE, path)).toHaveLength(1);
  });

  it("re-derives from a source with a new attribute, so a vendor re-sync propagates", () => {
    const derived = extractAriaAttributes(
      `declare interface AriaAttributes { "aria-hidden"?: boolean; "aria-brandnew"?: string }`,
    );
    expect(derived).toEqual(["aria-brandnew", "aria-hidden"]);
  });

  it("reads property names off the AST, not every `aria-` string in the file", () => {
    const derived = extractAriaAttributes(
      `/** mentions "aria-fictional" in prose */\n` +
        `declare interface A { "aria-hidden"?: boolean; label?: "aria-alsofictional" }`,
    );
    expect(derived).toEqual(["aria-hidden"]);
  });

  it("is the full ARIA surface, not a subset someone typed out", () => {
    expect(ARIA_ATTRIBUTES.length).toBeGreaterThan(40);
    expect(ARIA_ATTRIBUTES).toContain("aria-hidden");
    expect(ARIA_ATTRIBUTES).toContain("aria-labelledby");
    expect(ARIA_ATTRIBUTES.every((name) => name.startsWith("aria-"))).toBe(true);
  });
});
