import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import type { BarrelGroup } from "@inkline/compiler";
import {
  generateNamedBarrel,
  generateNamespaceBarrel,
  isStoryRelDir,
  matchBarrelGroup,
  resolveTargetDir,
  type BarrelEntry,
} from "./barrel.ts";

describe("isStoryRelDir", () => {
  it("matches a `stories` directory segment", () => {
    expect(isStoryRelDir("components/input/stories")).toBe(true);
    expect(isStoryRelDir("components/badge/stories")).toBe(true);
    expect(isStoryRelDir("stories")).toBe(true);
  });

  it("matches regardless of path separator", () => {
    expect(isStoryRelDir("components\\input\\stories")).toBe(true);
  });

  it("does not match non-story directories", () => {
    expect(isStoryRelDir("components/input/styled")).toBe(false);
    expect(isStoryRelDir("components/input/headless")).toBe(false);
    expect(isStoryRelDir("")).toBe(false);
  });

  it("does not match `stories` as a substring of another segment", () => {
    expect(isStoryRelDir("components/success-stories/styled")).toBe(false);
  });
});

describe("matchBarrelGroup", () => {
  const groups: BarrelGroup[] = [
    { file: "index.ts", match: "styled" },
    { file: "headless.ts", match: "headless" },
  ];

  it("routes a file to the group whose match is a path segment", () => {
    expect(matchBarrelGroup("components/button/styled", groups)?.file).toBe("index.ts");
    expect(matchBarrelGroup("components/button/headless", groups)?.file).toBe("headless.ts");
  });

  it("returns undefined when no group matches (e.g. a story dir)", () => {
    expect(matchBarrelGroup("components/button/stories", groups)).toBeUndefined();
  });

  it("matches regardless of path separator", () => {
    expect(matchBarrelGroup("components\\button\\headless", groups)?.file).toBe("headless.ts");
  });

  it("does not match a segment by substring", () => {
    expect(matchBarrelGroup("components/success-stories/styledish", groups)).toBeUndefined();
  });

  it("returns the first matching group when several could match", () => {
    const overlapping: BarrelGroup[] = [
      { file: "a.ts", match: "styled" },
      { file: "b.ts", match: "button" },
    ];
    expect(matchBarrelGroup("components/button/styled", overlapping)?.file).toBe("a.ts");
  });

  describe("empty-string sentinel", () => {
    const legacy: BarrelGroup[] = [{ file: "index.ts", match: "" }];

    it("matches any non-story directory", () => {
      expect(matchBarrelGroup("components/button/styled", legacy)?.file).toBe("index.ts");
      expect(matchBarrelGroup("components/button/headless", legacy)?.file).toBe("index.ts");
      expect(matchBarrelGroup("", legacy)?.file).toBe("index.ts");
    });

    it("excludes story directories", () => {
      expect(matchBarrelGroup("components/button/stories", legacy)).toBeUndefined();
    });
  });
});

describe("resolveTargetDir", () => {
  it("uses targetOutDir when set for the target", () => {
    expect(resolveTargetDir("react", "dist", { react: "/custom/react" })).toBe("/custom/react");
  });

  it("falls back to outDir/target", () => {
    const result = resolveTargetDir("react", "dist", {});
    expect(result).toBe(resolve("dist/react"));
  });
});

describe("generateNamedBarrel", () => {
  it("generates named exports for react", () => {
    const entries: BarrelEntry[] = [
      { componentName: "Button", fileName: "Button.tsx", target: "react" },
    ];
    expect(generateNamedBarrel(entries)).toBe("export { Button } from './Button.tsx';\n");
  });

  it("generates default exports for vue, svelte, solid, astro", () => {
    for (const target of ["vue", "svelte", "solid", "astro"] as const) {
      const entries: BarrelEntry[] = [{ componentName: "Button", fileName: "Button.vue", target }];
      expect(generateNamedBarrel(entries)).toContain("export { default as Button }");
    }
  });

  it("generates Component suffix exports for angular", () => {
    const entries: BarrelEntry[] = [
      { componentName: "Button", fileName: "Button.ts", target: "angular" },
    ];
    expect(generateNamedBarrel(entries)).toBe(
      "export { ButtonComponent as Button } from './Button.ts';\n",
    );
  });

  it("sorts entries alphabetically by component name", () => {
    const entries: BarrelEntry[] = [
      { componentName: "Zebra", fileName: "Zebra.tsx", target: "react" },
      { componentName: "Alpha", fileName: "Alpha.tsx", target: "react" },
    ];
    const lines = generateNamedBarrel(entries).trim().split("\n");
    expect(lines[0]).toContain("Alpha");
    expect(lines[1]).toContain("Zebra");
  });

  it("returns a lone newline for an empty group", () => {
    expect(generateNamedBarrel([])).toBe("\n");
  });
});

describe("generateNamespaceBarrel", () => {
  it("re-exports a module under a `<Name>Stories` namespace alias", () => {
    const entries: BarrelEntry[] = [
      {
        componentName: "IButton",
        fileName: "components/button/stories/IButton.stories.ts",
        target: "react",
      },
    ];
    expect(generateNamespaceBarrel(entries)).toBe(
      "export * as IButtonStories from './components/button/stories/IButton.stories.ts';\n",
    );
  });

  it("sorts entries alphabetically by component name", () => {
    const entries: BarrelEntry[] = [
      { componentName: "IButton", fileName: "button/IButton.stories.ts", target: "react" },
      { componentName: "IBadge", fileName: "badge/IBadge.stories.ts", target: "react" },
    ];
    const lines = generateNamespaceBarrel(entries).trim().split("\n");
    expect(lines[0]).toContain("IBadgeStories");
    expect(lines[1]).toContain("IButtonStories");
  });

  it("is target-agnostic (always namespace re-exports)", () => {
    const entries: BarrelEntry[] = [
      { componentName: "IBadge", fileName: "badge/IBadge.stories.ts", target: "vue" },
    ];
    expect(generateNamespaceBarrel(entries)).toBe(
      "export * as IBadgeStories from './badge/IBadge.stories.ts';\n",
    );
  });

  it("returns a lone newline for an empty group", () => {
    expect(generateNamespaceBarrel([])).toBe("\n");
  });
});
