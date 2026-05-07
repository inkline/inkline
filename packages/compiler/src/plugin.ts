import type { IRComponent } from "./ir/nodes.ts";
import type { IRModule } from "./ir/module.ts";
import type { Diagnostic, TargetName } from "./ir/types.ts";

/**
 * One file produced by a target generator. Path is relative to the
 * per-target output root (e.g. `Button/index.tsx`). When the generator
 * produces a sourcemap, it ships pre-stringified.
 */
export interface GeneratedFile {
  path: string;
  contents: string;
  /** Optional v3 source map (already JSON-stringified). */
  sourceMap?: string;
}

export interface GenerateContext {
  /** Per-target generator options merged from inkline.config.ts. */
  options: Record<string, unknown>;
  /** The full module so generators can see siblings, imports, and diagnostics. */
  module: IRModule;
  /** Push additional diagnostics from the generator. */
  emitDiagnostic: (diag: Diagnostic) => void;
}

/**
 * Code generators for each target framework implement this interface.
 * The generator is "correct but mechanical" — it does not try to produce
 * hand-crafted output; it produces deterministic output from the IR.
 */
export interface Target {
  readonly name: TargetName;
  /** Default option set merged with user config before generate(). */
  readonly defaultOptions: Record<string, unknown>;
  /**
   * Produce the per-target package files for a single component.
   * Returns one or more files (e.g. component + style + types).
   */
  generate(component: IRComponent, ctx: GenerateContext): GeneratedFile[];
  /**
   * Produce module-level files (index.ts, package.json, etc.) for the
   * compiled module. Called once per IRModule.
   */
  generateModule?(module: IRModule, ctx: GenerateContext): GeneratedFile[];
}

export interface PluginHooks {
  /** Run after the IR is built, before per-target generators see it. */
  "ir:post"?: (module: IRModule) => void | Promise<void>;
  /** Run after a target's code is emitted; receives generated files. */
  "code:post"?: (
    target: TargetName,
    files: GeneratedFile[],
  ) => void | GeneratedFile[] | Promise<void | GeneratedFile[]>;
}

export interface Plugin {
  name: string;
  /** Targets this plugin applies to; undefined means all. */
  targets?: TargetName[];
  hooks: PluginHooks;
}

/**
 * Identity helper that exists only for type inference / authoring ergonomics.
 * Equivalent to writing the literal object directly with `satisfies Plugin`.
 */
export function definePlugin(plugin: Plugin): Plugin {
  return plugin;
}

/**
 * Identity helper that exists only for type inference / authoring ergonomics.
 * Equivalent to writing the literal object directly with `satisfies Target`.
 */
export function defineTarget(target: Target): Target {
  return target;
}
