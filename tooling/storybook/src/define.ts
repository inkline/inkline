/**
 * Subset of Storybook's `ArgType` that the generator emits. Kept structural
 * (not imported from any renderer package) so this module stays
 * framework-agnostic and dependency-free.
 */
export interface ArgType {
  readonly control?: string | { readonly type: string; readonly [key: string]: unknown };
  readonly description?: string;
  readonly options?: readonly unknown[];
  readonly table?: Readonly<Record<string, unknown>>;
}

export interface ScopedSlotContent {
  readonly params: readonly string[];
  readonly content: string;
}

export type SlotValue = string | ScopedSlotContent;

/** A single named story: argument overrides layered on the meta-level args. */
export interface StoryVariant<TProps> {
  readonly args?: Partial<TProps>;
  readonly slots?: Readonly<Record<string, SlotValue>>;
}

export interface StoryDefinition<TProps> {
  /**
   * Exported component name in each `@inkline/<framework>` package, e.g.
   * `"Button"`. Used verbatim as the CSF import binding and `Meta.component`.
   */
  readonly component: string;
  /**
   * Storybook sidebar title, e.g. `"Components/Button"`. Emitted identically
   * for every framework so the derived story IDs match across renderers —
   * required for cross-framework screenshot diffing.
   */
  readonly title: string;
  /** Default args applied to every story. */
  readonly args?: Partial<TProps>;
  /** Controls/docs metadata, keyed by prop name. */
  readonly argTypes?: Partial<Record<keyof TProps & string, ArgType>>;
  /** Default slot content applied to every story's render function. */
  readonly slots?: Readonly<Record<string, SlotValue>>;
  /** Named story variants. Export names become part of each story ID. */
  readonly stories: Readonly<Record<string, StoryVariant<TProps>>>;
}

/**
 * Types a framework-agnostic story definition against the component's prop
 * type, then returns it unchanged. Zero runtime: the generator reads the
 * returned object at build time and emits per-framework CSF.
 *
 * @example
 * ```ts
 * import { defineStories } from "@inkline/storybook";
 * import type { ButtonProps } from "../src/IButton.ink.tsx";
 *
 * export default defineStories<ButtonProps>({
 *   component: "IButton",
 *   title: "Components/Button",
 *   args: { label: "Click me", disabled: false },
 *   stories: { Default: {}, Disabled: { args: { disabled: true } } },
 * });
 * ```
 */
export function defineStories<TProps>(
  definition: StoryDefinition<TProps>,
): StoryDefinition<TProps> {
  return definition;
}
