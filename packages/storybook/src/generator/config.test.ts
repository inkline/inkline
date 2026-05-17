import { describe, it, expect } from "vitest";
import { FRAMEWORKS, activeFrameworks, frameworkByTarget } from "./config.ts";

describe("FRAMEWORKS", () => {
  it("covers the seven Inkline targets", () => {
    expect(FRAMEWORKS.map((f) => f.target)).toEqual([
      "react",
      "vue",
      "svelte",
      "solid",
      "angular",
      "qwik",
      "astro",
    ]);
  });

  it("assigns a unique port to every framework", () => {
    const ports = FRAMEWORKS.map((f) => f.port);
    expect(new Set(ports).size).toBe(ports.length);
  });

  it("scopes each component package to its target", () => {
    for (const framework of FRAMEWORKS) {
      expect(framework.componentPackage).toBe(`@inkline/${framework.target}`);
    }
  });

  it("defers only Astro", () => {
    const deferred = FRAMEWORKS.filter((f) => f.deferred).map((f) => f.target);
    expect(deferred).toEqual(["astro"]);
  });
});

describe("activeFrameworks", () => {
  it("excludes deferred frameworks", () => {
    const targets = activeFrameworks().map((f) => f.target);
    expect(targets).toEqual(["react", "vue", "svelte", "solid", "angular", "qwik"]);
  });
});

describe("frameworkByTarget", () => {
  it("returns the matching framework", () => {
    expect(frameworkByTarget("react")?.componentPackage).toBe("@inkline/react");
  });

  it("returns undefined for an unknown target", () => {
    expect(frameworkByTarget("preact")).toBeUndefined();
  });
});
