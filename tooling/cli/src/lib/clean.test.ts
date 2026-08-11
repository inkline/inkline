import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, mkdirSync, realpathSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, parse, resolve } from "node:path";
import { cleanRefusalReason, planClean } from "./clean.ts";

// Real directories, not synthetic strings: the guard follows symlinks, so a test that never touches
// the filesystem cannot tell a correct answer from a lucky one. `mkdtemp` + `realpathSync` because
// macOS `tmpdir()` is itself under the `/var` → `/private/var` symlink — the very confusion under
// test — and the fixture must start from the canonical side of it.
let SANDBOX: string;
let CWD: string;
let CWD_ALIAS: string;
let SANDBOX_ALIAS: string;

const ROOT = parse(resolve("/")).root;

beforeAll(() => {
  SANDBOX = realpathSync(mkdtempSync(join(tmpdir(), "inkline-clean-")));
  CWD = join(SANDBOX, "project");
  mkdirSync(CWD);
  CWD_ALIAS = join(SANDBOX, "project-alias");
  symlinkSync(CWD, CWD_ALIAS);
  SANDBOX_ALIAS = join(SANDBOX, "project", "up-alias");
  symlinkSync(SANDBOX, SANDBOX_ALIAS);
});

afterAll(() => {
  if (SANDBOX) rmSync(SANDBOX, { recursive: true, force: true });
});

describe("cleanRefusalReason", () => {
  it("allows a directory inside the resolved outDir", () => {
    expect(cleanRefusalReason(join(CWD, "dist/react"), "dist", false, CWD)).toBeUndefined();
  });

  it("refuses the filesystem root", () => {
    expect(cleanRefusalReason(ROOT, "dist", true, CWD)).toBe("it is the filesystem root");
  });

  it("refuses the working directory", () => {
    // `targetOutDir: { react: "" }` — the original repro: `resolve("")` is the working directory.
    expect(cleanRefusalReason(CWD, "dist", true, CWD)).toBe("it is the current working directory");
  });

  it("refuses an ancestor of the working directory", () => {
    expect(cleanRefusalReason(SANDBOX, "dist", true, CWD)).toBe(
      "it contains the current working directory",
    );
  });

  it("refuses a derived path that escapes the output directory", () => {
    // `outDir: ""` makes `${outDir}/${target}` the absolute `/react`, outside the output tree the
    // user believes they configured — which is the working directory in that config.
    expect(cleanRefusalReason(join(ROOT, "react"), "", false, CWD)).toBe(
      `it is outside the output directory (${CWD})`,
    );
  });

  it("allows an explicit targetOutDir override outside the output directory", () => {
    // The documented per-target override: outside `outDir` on purpose, and still cleanable. This
    // repo's own `ui/components/inkline.config.ts` depends on it.
    expect(
      cleanRefusalReason(join(SANDBOX, "react", ".inkline"), "dist", true, CWD),
    ).toBeUndefined();
  });

  it("still refuses an override that lands on the working directory or above it", () => {
    // The containment tier is what an override opts out of; the hard floor has no opt-out.
    expect(cleanRefusalReason(CWD, "dist", true, CWD)).toBeDefined();
    expect(cleanRefusalReason(ROOT, "dist", true, CWD)).toBeDefined();
  });

  it("refuses the output directory itself, not only paths outside it", () => {
    // `outDir/target` is what gets removed; `outDir` holding every target's output is not.
    expect(cleanRefusalReason(join(CWD, "dist"), "dist", false, CWD)).toBeDefined();
  });

  /**
   * The hard floor used to compare `resolve()`d strings, so it guarded a directory only under the
   * name `process.cwd()` reports. A second name for the same directory — which macOS hands out by
   * default via `/tmp` and `/var` — walked straight through it and `rm -rf`'d the project.
   */
  describe("symlinked spellings of a guarded path", () => {
    it("refuses the working directory reached through a symlink", () => {
      expect(cleanRefusalReason(CWD_ALIAS, "dist", true, CWD)).toBe(
        "it is the current working directory",
      );
    });

    it("refuses an ancestor of the working directory reached through a symlink", () => {
      expect(cleanRefusalReason(SANDBOX_ALIAS, "dist", true, CWD)).toBe(
        "it contains the current working directory",
      );
    });

    it("canonicalises a not-yet-existing path through its nearest existing ancestor", () => {
      // On a first build the target directory is not there and `realpathSync` throws `ENOENT`, so
      // the guard walks up to the nearest ancestor that does resolve — here the symlink — and
      // re-appends the remainder rather than throwing or falling back to the spelling it was given.
      // A missing path can never trip the hard floor (the root and the working directory both
      // exist), so what this pins down is that the walk-up happens and stays quiet.
      expect(
        cleanRefusalReason(
          join(SANDBOX_ALIAS, "dist", "react"),
          join(SANDBOX_ALIAS, "dist"),
          false,
          CWD,
        ),
      ).toBeUndefined();
    });

    it("still allows a genuinely separate directory reached through a symlink", () => {
      // Following symlinks must not make the guard refuse everything: the alias resolves to a real
      // sibling of the project, which is a perfectly good override target.
      expect(
        cleanRefusalReason(join(CWD_ALIAS, "..", "elsewhere", "react"), "dist", true, CWD),
      ).toBeUndefined();
    });
  });

  /**
   * Containment alone is self-validating for derived paths — `outDir/<target>` is inside `outDir` by
   * construction — so the output tree itself has to be judged, or `outDir: "/"` cleans `/react`
   * while `outDir: ""`, whose target resolves to the identical `/react`, is refused.
   */
  describe("the output directory a derived path came from", () => {
    it("refuses the filesystem root as outDir", () => {
      expect(cleanRefusalReason(join(ROOT, "react"), "/", false, CWD)).toBe(
        "the output directory is the filesystem root",
      );
    });

    it("refuses an outDir above the project", () => {
      expect(cleanRefusalReason(join(SANDBOX, "react"), "..", false, CWD)).toBe(
        "the output directory contains the current working directory",
      );
    });

    it("allows the working directory as outDir", () => {
      // `outDir: "."` builds into `./<target>`, which is normal and must keep working.
      expect(cleanRefusalReason(join(CWD, "react"), ".", false, CWD)).toBeUndefined();
    });
  });
});

describe("planClean", () => {
  it("returns every resolved target directory when all are safe", () => {
    const plan = planClean(["react", "vue"], join(CWD, "dist"), {}, CWD);
    expect(plan).toEqual({ dirs: [join(CWD, "dist/react"), join(CWD, "dist/vue")] });
  });

  it("returns no directories at all when one target is unsafe", () => {
    // All-or-nothing: `react` is listed first and is perfectly cleanable, but a plan that handed it
    // back would have `rmSync` delete it before the caller ever saw the `vue` refusal.
    const plan = planClean(["react", "vue"], join(CWD, "dist"), { vue: "" }, CWD);
    expect(plan).not.toHaveProperty("dirs");
  });

  it("names the target, the resolved path, the reason and the config key that produced it", () => {
    const plan = planClean(["react"], "dist", { react: "" }, CWD);
    expect("error" in plan && plan.error).toContain('target "react"');
    expect("error" in plan && plan.error).toContain(CWD);
    expect("error" in plan && plan.error).toContain("it is the current working directory");
    expect("error" in plan && plan.error).toContain('targetOutDir.react = ""');
    expect("error" in plan && plan.error).toContain("--no-clean");
  });

  it("points at outDir when the bad path was derived rather than overridden", () => {
    const plan = planClean(["react"], "", {}, CWD);
    expect("error" in plan && plan.error).toContain('outDir = ""');
    expect("error" in plan && plan.error).not.toContain("targetOutDir");
  });

  it("shows the real path when the configured one is a symlinked alias", () => {
    // Without this the message reads "…: /tmp/proj — it is the current working directory", which
    // looks wrong to anyone whose shell says they are somewhere else.
    const plan = planClean(["react"], "dist", { react: CWD_ALIAS }, CWD);
    expect("error" in plan && plan.error).toContain(`${CWD_ALIAS} (real path ${CWD})`);
  });
});
