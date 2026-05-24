import { globSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { StoryDefinition } from "../define.ts";
import { type FrameworkConfig, activeFrameworks } from "./config.ts";
import { renderStory } from "./render.ts";
import { type StoryKeys, assertStableStoryKeys, extractStoryKeys } from "./story-keys.ts";

export interface GenerateOptions {
  /** Directory holding the single-source `*.stories.ts` definitions. */
  readonly srcDir: string;
  /** Root of the per-framework `ui/<target>` packages. */
  readonly rootDir: string;
  /** Frameworks to emit. Defaults to {@link activeFrameworks}. */
  readonly frameworks?: readonly FrameworkConfig[];
}

export interface GeneratedFile {
  readonly target: string;
  readonly path: string;
}

export interface GenerateResult {
  readonly components: readonly string[];
  readonly files: readonly GeneratedFile[];
}

/** Absolute, sorted paths of every single-source story definition file. */
export function discoverDefinitionFiles(coreStoriesDir: string): string[] {
  return globSync(join(coreStoriesDir, "*.stories.{ts,tsx}"))
    .map((file) => resolve(file))
    .sort();
}

function validateDefinition(
  value: unknown,
  sourceLabel: string,
): asserts value is StoryDefinition<unknown> {
  const fail = (reason: string): never => {
    throw new Error(`Invalid story definition in ${sourceLabel}: ${reason}.`);
  };
  if (!value || typeof value !== "object") fail("default export must be an object");
  const def = value as Partial<StoryDefinition<unknown>>;
  if (typeof def.component !== "string" || def.component.length === 0) {
    fail("`component` must be a non-empty string");
  }
  if (typeof def.title !== "string" || def.title.length === 0) {
    fail("`title` must be a non-empty string");
  }
  if (!def.stories || typeof def.stories !== "object" || Object.keys(def.stories).length === 0) {
    fail("`stories` must contain at least one story");
  }
}

/** Imports a single-source definition file and validates its default export. */
export async function loadDefinition(absPath: string): Promise<StoryDefinition<unknown>> {
  const url = pathToFileURL(absPath);
  url.searchParams.set("t", Date.now().toString());
  const mod = (await import(url.href)) as { default?: unknown };
  validateDefinition(mod.default, absPath);
  return mod.default;
}

/**
 * Generates per-framework CSF story files from every single-source definition,
 * asserting the derived story IDs are identical across frameworks.
 */
export async function generate(options: GenerateOptions): Promise<GenerateResult> {
  const frameworks = options.frameworks ?? activeFrameworks();
  const definitionFiles = discoverDefinitionFiles(options.srcDir);

  const components: string[] = [];
  const files: GeneratedFile[] = [];

  for (const definitionFile of definitionFiles) {
    const definition = await loadDefinition(definitionFile);
    components.push(definition.component);

    const keysByTarget = new Map<string, StoryKeys>();

    for (const framework of frameworks) {
      const source = renderStory(definition, framework);
      keysByTarget.set(framework.target, extractStoryKeys(source));

      const outDir = join(options.rootDir, framework.target, "stories");
      const outPath = join(outDir, `${definition.component}.stories.ts`);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(outPath, source, "utf-8");
      files.push({ target: framework.target, path: outPath });
    }

    assertStableStoryKeys(definition.component, keysByTarget);
  }

  return { components, files };
}
