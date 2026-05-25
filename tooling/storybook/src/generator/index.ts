import { globSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { StoryMeta, StoryVariant } from "../define.ts";
import { type FrameworkConfig, activeFrameworks } from "./config.ts";
import { renderStory } from "./render.ts";
import { type StoryKeys, assertStableStoryKeys, extractStoryKeys } from "./story-keys.ts";

export interface GenerateOptions {
  readonly srcDir: string;
  readonly rootDir: string;
  readonly frameworks?: readonly FrameworkConfig[];
  readonly generatedDir?: string;
  readonly storiesDir?: string;
}

export interface GeneratedFile {
  readonly target: string;
  readonly path: string;
}

export interface GenerateResult {
  readonly components: readonly string[];
  readonly files: readonly GeneratedFile[];
}

export interface LoadedStoryModule {
  readonly meta: StoryMeta<unknown>;
  readonly stories: Readonly<Record<string, StoryVariant<unknown>>>;
  readonly sourcePath: string;
}

export interface ResolvedRenderImport {
  readonly storyName: string;
  readonly localName: string;
  readonly importPath: string;
}

export function discoverDefinitionFiles(rootDir: string): string[] {
  return globSync(join(rootDir, "**/*.stories.{ts,tsx}"))
    .map((file) => resolve(file))
    .sort();
}

function validateMeta(value: unknown, sourceLabel: string): asserts value is StoryMeta<unknown> {
  const fail = (reason: string): never => {
    throw new Error(`Invalid story definition in ${sourceLabel}: ${reason}.`);
  };
  if (!value || typeof value !== "object") fail("default export must be an object");
  const meta = value as Partial<StoryMeta<unknown>>;
  if (typeof meta.component !== "string" || meta.component.length === 0) {
    fail("`component` must be a non-empty string");
  }
  if (typeof meta.title !== "string" || meta.title.length === 0) {
    fail("`title` must be a non-empty string");
  }
}

function collectStories(
  mod: Record<string, unknown>,
  sourceLabel: string,
): Record<string, StoryVariant<unknown>> {
  const stories: Record<string, StoryVariant<unknown>> = {};
  for (const [key, value] of Object.entries(mod)) {
    if (key === "default") continue;
    if (!value || typeof value !== "object") {
      throw new Error(
        `Invalid story definition in ${sourceLabel}: export "${key}" must be an object.`,
      );
    }
    stories[key] = value as StoryVariant<unknown>;
  }
  if (Object.keys(stories).length === 0) {
    throw new Error(
      `Invalid story definition in ${sourceLabel}: must export at least one named story.`,
    );
  }
  return stories;
}

export async function loadStoryModule(absPath: string): Promise<LoadedStoryModule> {
  const url = pathToFileURL(absPath);
  url.searchParams.set("t", Date.now().toString());
  const mod = (await import(url.href)) as Record<string, unknown>;
  validateMeta(mod.default, absPath);
  const stories = collectStories(mod, absPath);
  return { meta: mod.default, stories, sourcePath: absPath };
}

export function commonPrefix(dirs: string[]): string {
  if (dirs.length === 0) return "";
  const parts = dirs[0]!.split("/");
  let prefix = "";
  for (let i = 0; i < parts.length; i++) {
    const candidate = parts.slice(0, i + 1).join("/") + "/";
    if (dirs.every((d) => (d + "/").startsWith(candidate))) prefix = candidate;
    else break;
  }
  return prefix;
}

export function computeCompilerRoot(srcDir: string): string {
  const inkFiles = globSync(join(srcDir, "**/*.ink.tsx")).map((f) => resolve(f));
  if (inkFiles.length === 0) return resolve(srcDir);
  return commonPrefix(inkFiles.map((f) => dirname(f)));
}

export function resolveRenderImports(
  storyModule: LoadedStoryModule,
  srcDir: string,
  framework: FrameworkConfig,
): ResolvedRenderImport[] {
  const imports: ResolvedRenderImport[] = [];
  const storyDir = dirname(storyModule.sourcePath);
  const compilerRoot = computeCompilerRoot(srcDir);

  for (const [name, variant] of Object.entries(storyModule.stories)) {
    if (typeof variant.render !== "string") continue;

    const absRenderPath = resolve(storyDir, variant.render);
    const relToCompilerRoot = relative(compilerRoot, absRenderPath);
    const withoutInkExt = relToCompilerRoot.replace(/\.ink\.tsx$/, "");
    const compiledRel = withoutInkExt + framework.compiledExtension;
    const importPath = "../generated/" + compiledRel.split("/").join("/");

    const baseName = withoutInkExt.split("/").pop()!;
    const localName = baseName.charAt(0).toUpperCase() + baseName.slice(1) + "Story";

    imports.push({ storyName: name, localName, importPath });
  }

  return imports;
}

export async function generate(options: GenerateOptions): Promise<GenerateResult> {
  const frameworks = options.frameworks ?? activeFrameworks();
  const definitionFiles = discoverDefinitionFiles(options.srcDir);

  const components: string[] = [];
  const files: GeneratedFile[] = [];
  const storiesDir = options.storiesDir ?? "stories";

  for (const definitionFile of definitionFiles) {
    const storyModule = await loadStoryModule(definitionFile);
    components.push(storyModule.meta.component);

    const keysByTarget = new Map<string, StoryKeys>();

    for (const framework of frameworks) {
      const renderImports = resolveRenderImports(storyModule, options.srcDir, framework);
      const source = renderStory(storyModule, framework, renderImports);
      keysByTarget.set(framework.target, extractStoryKeys(source));

      const outDir = join(options.rootDir, framework.target, storiesDir);
      const outPath = join(outDir, `${storyModule.meta.component}.stories.ts`);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(outPath, source, "utf-8");
      files.push({ target: framework.target, path: outPath });
    }

    assertStableStoryKeys(storyModule.meta.component, keysByTarget);
  }

  return { components, files };
}
