import { describe, it, expect } from "vitest";
import { parse, resolve } from "node:path";
import { cleanRefusalReason, planClean } from "./clean.ts";

// A fixed working directory, so every case reads as "what would `--clean` do from here" without
// depending on where vitest was started.
const CWD = resolve("/home/dev/project");
const ROOT = parse(CWD).root;

describe("cleanRefusalReason", () => {
  it("allows a directory inside the resolved outDir", () => {
    expect(cleanRefusalReason(resolve(CWD, "dist/react"), "dist", false, CWD)).toBeUndefined();
  });

  it("refuses the filesystem root", () => {
    expect(cleanRefusalReason(ROOT, "dist", true, CWD)).toBe("it is the filesystem root");
  });

  it("refuses the working directory", () => {
    // `targetOutDir: { react: "" }` — the original repro: `resolve("")` is the working directory.
    expect(cleanRefusalReason(CWD, "dist", true, CWD)).toBe("it is the current working directory");
  });

  it("refuses an ancestor of the working directory", () => {
    expect(cleanRefusalReason(resolve(CWD, ".."), "dist", true, CWD)).toBe(
      "it contains the current working directory",
    );
  });

  it("refuses a derived path that escapes the output directory", () => {
    // `outDir: ""` makes `${outDir}/${target}` the absolute `/react`, outside the output tree the
    // user believes they configured — which is the working directory in that config.
    expect(cleanRefusalReason(resolve(ROOT, "react"), "", false, CWD)).toBe(
      `it is outside the output directory (${CWD})`,
    );
  });

  it("allows an explicit targetOutDir override outside the output directory", () => {
    // The documented per-target override: outside `outDir` on purpose, and still cleanable. This
    // repo's own `ui/components/inkline.config.ts` depends on it.
    expect(
      cleanRefusalReason(resolve(CWD, "..", "react", ".inkline"), "dist", true, CWD),
    ).toBeUndefined();
  });

  it("still refuses an override that lands on the working directory or above it", () => {
    // The containment tier is what an override opts out of; the hard floor has no opt-out.
    expect(cleanRefusalReason(CWD, "dist", true, CWD)).toBeDefined();
    expect(cleanRefusalReason(ROOT, "dist", true, CWD)).toBeDefined();
  });

  it("refuses the output directory itself, not only paths outside it", () => {
    // `outDir/target` is what gets removed; `outDir` holding every target's output is not.
    expect(cleanRefusalReason(resolve(CWD, "dist"), "dist", false, CWD)).toBeDefined();
  });
});

describe("planClean", () => {
  it("returns every resolved target directory when all are safe", () => {
    const plan = planClean(["react", "vue"], resolve(CWD, "dist"), {}, CWD);
    expect(plan).toEqual({
      dirs: [resolve(CWD, "dist/react"), resolve(CWD, "dist/vue")],
    });
  });

  it("returns no directories at all when one target is unsafe", () => {
    // All-or-nothing: `react` is listed first and is perfectly cleanable, but a plan that handed it
    // back would have `rmSync` delete it before the caller ever saw the `vue` refusal.
    const plan = planClean(["react", "vue"], resolve(CWD, "dist"), { vue: "" }, CWD);
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
});
