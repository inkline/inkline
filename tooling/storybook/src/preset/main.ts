/**
 * Minimal structural shapes for the Storybook/Vite objects this factory
 * touches. The shared package stays dependency-free; each framework's
 * `.storybook/main.ts` casts the result to its own `StorybookConfig`.
 */
export interface ViteConfigLike {
  resolve?: { alias?: Record<string, string> } & Record<string, unknown>;
  plugins?: unknown[];
  [key: string]: unknown;
}

export interface ViteFinalContext {
  readonly configType?: "DEVELOPMENT" | "PRODUCTION";
}

export interface StorybookConfigOptions {
  /** Storybook framework package, e.g. `"@storybook/react-vite"`. */
  readonly framework: string;
  /** Component package the generated stories import, e.g. `"@inkline/react"`. */
  readonly componentPackage: string;
  /**
   * Absolute path to `ui/<target>/generated/index.ts`. Aliased over
   * `componentPackage` in dev so component edits hot-reload without a `dist`
   * build; the real published entry is used for production/static builds.
   */
  readonly sourceEntry: string;
  /** Story globs. Defaults to the generated `stories/` directory. */
  readonly stories?: readonly string[];
  /** Extra addons appended to the defaults. */
  readonly addons?: readonly string[];
  /** Framework Vite plugin(s), e.g. `@vitejs/plugin-react`. */
  readonly vitePlugins?: readonly unknown[];
}

export interface StorybookMainConfig {
  readonly framework: { readonly name: string; readonly options: Record<string, unknown> };
  readonly stories: readonly string[];
  readonly addons: readonly string[];
  readonly viteFinal: (
    config: ViteConfigLike,
    context: ViteFinalContext,
  ) => Promise<ViteConfigLike>;
}

/** Storybook 10: essentials are in core. Only the still-separate addons here. */
const DEFAULT_ADDONS = ["@storybook/addon-a11y", "@storybook/addon-docs"] as const;
const DEFAULT_STORIES = ["../stories/**/*.stories.ts"] as const;

/**
 * Builds a per-framework Storybook `main.ts` config from a single shared
 * factory, so each framework's config stays a few declarative lines.
 */
export function createStorybookConfig(options: StorybookConfigOptions): StorybookMainConfig {
  const { framework, componentPackage, sourceEntry } = options;
  const vitePlugins = options.vitePlugins ?? [];

  return {
    framework: { name: framework, options: {} },
    stories: options.stories ?? DEFAULT_STORIES,
    addons: [...DEFAULT_ADDONS, ...(options.addons ?? [])],
    async viteFinal(config, { configType }) {
      const next: ViteConfigLike = { ...config };

      if (configType !== "PRODUCTION") {
        next.resolve = {
          ...next.resolve,
          alias: { ...next.resolve?.alias, [componentPackage]: sourceEntry },
        };
        next.server = {
          ...((next.server ?? {}) as Record<string, unknown>),
          cors: { origin: true, credentials: true },
        };
      }

      if (vitePlugins.length > 0) {
        next.plugins = [...(next.plugins ?? []), ...vitePlugins];
      }

      return next;
    },
  };
}
