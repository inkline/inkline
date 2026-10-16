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
   * Absolute path to `ui/<target>/.inkline/index.ts`. Aliased over
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
  /** Options forwarded to `framework.options` (e.g. Angular's `tsconfig`). */
  readonly frameworkOptions?: Record<string, unknown>;
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
 * Cloudflare `_headers` for a static Storybook. The composed Storybook (`apps/storybook`) runs on
 * another Worker, so it fetches each framework's `index.json` (or the older `stories.json`) and
 * `metadata.json` across origins, and the browser blocks those reads without this header. `*` is
 * enough: the composer's build checks each ref's `iframe.html`, and then the ref is fetched with
 * `credentials: "omit"`. A ref that was down while the composer built is fetched with credentials,
 * which `*` doesn't allow, so rebuild the composer. `iframe.html` is framed, not fetched, so it
 * needs no CORS header, and nothing here may add `X-Frame-Options` or `frame-ancestors`.
 */
const CORS_HEADERS = ["/index.json", "/stories.json", "/metadata.json"]
  .map((path) => `${path}\n  Access-Control-Allow-Origin: *\n`)
  .join("");

/**
 * Emits `_headers` into the preview build's output, which is the Storybook output directory.
 * A Vite plugin, rather than a `staticDirs` entry, keeps it to production builds (dev already
 * sets `server.cors`) and needs no file copied into this package's `dist`.
 */
const corsHeadersPlugin = {
  name: "inkline:storybook-cors-headers",
  apply: "build",
  generateBundle(this: {
    emitFile(file: { type: "asset"; fileName: string; source: string }): void;
  }) {
    this.emitFile({ type: "asset", fileName: "_headers", source: CORS_HEADERS });
  },
};

/**
 * Builds a per-framework Storybook `main.ts` config from a single shared
 * factory, so each framework's config stays a few declarative lines.
 */
export function createStorybookConfig(options: StorybookConfigOptions): StorybookMainConfig {
  const { framework, componentPackage, sourceEntry } = options;
  const vitePlugins = options.vitePlugins ?? [];

  return {
    framework: { name: framework, options: options.frameworkOptions ?? {} },
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
        // `@styleframe/runtime` is reached only through the `virtual:styleframe` module, so Vite's
        // initial dependency scan never sees it. Without this, Vite discovers it on first story load,
        // re-optimizes, and forces a full reload mid-import — surfacing as a transient
        // "Importing a module script failed" that looks like the story failed to load. Pre-bundling
        // it keeps the first load stable.
        const optimizeDeps = (next.optimizeDeps ?? {}) as { include?: string[] } & Record<
          string,
          unknown
        >;
        next.optimizeDeps = {
          ...optimizeDeps,
          include: [...(optimizeDeps.include ?? []), "@styleframe/runtime"],
        };
      }

      if (vitePlugins.length > 0) {
        next.plugins = [...(next.plugins ?? []), ...vitePlugins];
      }

      if (configType === "PRODUCTION") {
        next.plugins = [...(next.plugins ?? []), corsHeadersPlugin];
      }

      return next;
    },
  };
}
