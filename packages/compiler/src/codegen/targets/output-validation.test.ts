import { describe, it, expect } from "vitest";
import { compileFixture, type CompiledFixture } from "../../testing/harness.ts";
import type { TargetName } from "../context.ts";

const cache = new Map<string, CompiledFixture>();

async function getOutput(fixture: string, target: TargetName): Promise<string> {
  const key = `${fixture}:${target}`;
  if (!cache.has(key)) {
    cache.set(key, await compileFixture(fixture, [target]));
  }
  const result = cache.get(key)!;
  const files = result.files[target];
  expect(files, `${fixture} should produce files for ${target}`).toBeDefined();
  expect(files!.length).toBeGreaterThan(0);
  return files![0]!.contents;
}

async function getAllOutputs(fixture: string, target: TargetName): Promise<string> {
  const key = `${fixture}:${target}`;
  if (!cache.has(key)) {
    cache.set(key, await compileFixture(fixture, [target]));
  }
  const result = cache.get(key)!;
  const files = result.files[target];
  expect(files).toBeDefined();
  return files!.map((f) => f.contents).join("\n");
}

const TARGETS: TargetName[] = ["react", "solid", "vue", "svelte"];
const CORE_FIXTURES = [
  "Counter",
  "Button",
  "Conditional",
  "ForLoop",
  "Lifecycle",
  "ElementRef",
  "FormField",
  "SwitchTabs",
  "Composite",
  "PropDefaults",
  "MultipleComponentsPerFile",
];
const NEW_FIXTURES = [
  "ControlledSelect",
  "ConditionalClass",
  "MemoChain",
  "MixedControlFlow",
  "BatchUpdates",
  "MultiRefs",
  "ControlledTextarea",
  "DynamicList",
  "EffectCleanup",
  "SlotWithDefault",
];

describe("full output snapshots", () => {
  for (const fixture of [...CORE_FIXTURES, ...NEW_FIXTURES]) {
    describe(fixture, () => {
      for (const target of TARGETS) {
        it(`${target}`, async () => {
          const code = await getOutput(fixture, target);
          expect(code).toMatchSnapshot();
        });
      }
    });
  }
});

describe("multi-component files", () => {
  for (const target of TARGETS) {
    it(`ComponentRef → ${target} (all files)`, async () => {
      const code = await getAllOutputs("ComponentRef", target);
      expect(code).toMatchSnapshot();
    });
  }
});

describe("cross-target structural invariants", () => {
  it("React output never imports from wrong frameworks", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await getOutput(fixture, "react");
      expect(code).not.toContain('from "vue"');
      expect(code).not.toContain('from "solid-js"');
      expect(code).not.toContain("$state");
      expect(code).not.toContain("$derived");
    }
  });

  it("Solid output never imports from wrong frameworks", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await getOutput(fixture, "solid");
      expect(code).not.toContain('from "react"');
      expect(code).not.toContain('from "vue"');
      expect(code).not.toContain("useState");
      expect(code).not.toContain("$state");
    }
  });

  it("Vue output is a valid SFC structure", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await getOutput(fixture, "vue");
      expect(code).toContain("<script setup");
      expect(code).toContain("</script>");
      expect(code).toContain("<template>");
      expect(code).toContain("</template>");
    }
  });

  it("Svelte output has <script> tag", async () => {
    for (const fixture of CORE_FIXTURES) {
      const code = await getOutput(fixture, "svelte");
      expect(code).toContain("<script");
      expect(code).toContain("</script>");
    }
  });

  it("React uses className for class attribute", async () => {
    const code = await getOutput("ConditionalClass", "react");
    expect(code).toContain("className");
    expect(code).not.toMatch(/\bclass=/);
  });

  it("Solid/Vue/Svelte use class (not className) for class attribute", async () => {
    for (const target of ["solid", "vue", "svelte"] as const) {
      const code = await getOutput("ConditionalClass", target);
      expect(code).not.toContain("className");
    }
  });

  it("React uses camelCase events (onClick)", async () => {
    const code = await getOutput("Counter", "react");
    expect(code).toContain("onClick");
  });

  it("Solid uses lowercase events (onclick)", async () => {
    const code = await getOutput("Counter", "solid");
    expect(code).toContain("onclick");
  });

  it("Vue uses kebab events (@click)", async () => {
    const code = await getOutput("Composite", "vue");
    expect(code).toContain("@click");
  });

  it("Svelte uses lowercase events (onclick)", async () => {
    const code = await getOutput("Counter", "svelte");
    expect(code).toContain("onclick");
  });
});
