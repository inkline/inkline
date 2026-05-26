import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { detectFrameworks } from "./detect-framework.ts";

describe("detectFrameworks", () => {
  let dir: string;

  beforeEach(() => {
    dir = join(tmpdir(), `inkline-test-fw-${Date.now()}`);
    mkdirSync(dir, { recursive: true });
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  function writePkg(deps: Record<string, string> = {}, devDeps: Record<string, string> = {}) {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ dependencies: deps, devDependencies: devDeps }),
    );
  }

  it("detects react from dependencies", () => {
    writePkg({ react: "^19" });
    expect(detectFrameworks(dir)).toEqual(["react"]);
  });

  it("detects vue from devDependencies", () => {
    writePkg({}, { vue: "^3" });
    expect(detectFrameworks(dir)).toEqual(["vue"]);
  });

  it("detects svelte", () => {
    writePkg({ svelte: "^5" });
    expect(detectFrameworks(dir)).toEqual(["svelte"]);
  });

  it("detects solid from solid-js", () => {
    writePkg({ "solid-js": "^1" });
    expect(detectFrameworks(dir)).toEqual(["solid"]);
  });

  it("detects angular from @angular/core", () => {
    writePkg({ "@angular/core": "^17" });
    expect(detectFrameworks(dir)).toEqual(["angular"]);
  });

  it("detects qwik from @builder.io/qwik", () => {
    writePkg({ "@builder.io/qwik": "^1" });
    expect(detectFrameworks(dir)).toEqual(["qwik"]);
  });

  it("detects astro", () => {
    writePkg({ astro: "^4" });
    expect(detectFrameworks(dir)).toEqual(["astro"]);
  });

  it("detects multiple frameworks", () => {
    writePkg({ react: "^19", vue: "^3" });
    expect(detectFrameworks(dir)).toEqual(["react", "vue"]);
  });

  it("returns empty array when no frameworks found", () => {
    writePkg({ lodash: "^4" });
    expect(detectFrameworks(dir)).toEqual([]);
  });

  it("returns empty array when no package.json exists", () => {
    expect(detectFrameworks(dir)).toEqual([]);
  });
});
