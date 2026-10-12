/**
 * The helpers behind `StorybookEmbed` (components/content/StorybookEmbed.vue),
 * ported from `@uxfront/layer-docs` 0.4.1, which shipped them in
 * `app/utils/storybookEmbed.ts` and `storybook/index.ts`. Only the docs page's
 * half of the embed contract is here: what it posts and what it reads.
 */

/** Docs page → Storybook: the colour mode the embedding page is displaying. */
export const DOCS_EMBED_THEME_MESSAGE = "uxfront:docs-embed:theme";

/** Storybook → docs page: the height the embedding iframe should be given. */
export const DOCS_EMBED_HEIGHT_MESSAGE = "uxfront:docs-embed:height";

/**
 * URL flag added when the page embeds `iframe.html` directly. It tells the
 * Storybook preview that no manager sits between it and the docs page, so it
 * must post the final height itself.
 */
export const DOCS_EMBED_PARAM = "docsEmbed";

/**
 * Which Storybook surface a `StorybookEmbed` addresses. Each is a different URL
 * against a different Storybook surface.
 *
 * - `preview` — `iframe.html`, the story on its own with no Storybook UI.
 * - `full` — the manager in full-canvas mode: story plus toolbar, no panel.
 * - `panel` — the manager with its addon panel, for stories documented through
 *   controls or actions.
 */
export type StorybookEmbedMode = "preview" | "full" | "panel";

/**
 * Height an embed occupies before Storybook reports its own, and the height it
 * keeps if Storybook reports none. Reserving the space up front keeps the embed
 * from shifting the page when the real height arrives.
 */
export const STORYBOOK_EMBED_DEFAULT_HEIGHTS: Record<StorybookEmbedMode, number> = {
  preview: 320,
  full: 320,
  panel: 600,
};

/**
 * Resolve a Storybook base URL from a template. A `{framework}` placeholder
 * addresses a per-framework Storybook (`https://{framework}.storybook.example.com`);
 * a template without one is used as-is.
 */
export function resolveStorybookBaseUrl(template: string, framework?: string): string {
  return template.replaceAll("{framework}", framework ?? "").replace(/\/+$/, "");
}

export interface StorybookEmbedUrlOptions {
  /** Base URL template, optionally containing `{framework}`. */
  template: string;
  /** Storybook story id, e.g. `components-actions-button--default`. */
  story: string;
  /** Framework substituted into the template's `{framework}` placeholder. */
  framework?: string;
  /** Storybook surface to address. Defaults to `preview`. */
  mode?: StorybookEmbedMode;
}

/**
 * Build the `src` for an embedded story. An empty template yields a
 * root-relative URL rather than a broken absolute one: a same-origin 404 that
 * can be seen, not a silent request to nowhere.
 */
export function buildStorybookEmbedUrl(options: StorybookEmbedUrlOptions): string {
  const { template, story, framework, mode = "preview" } = options;

  const base = resolveStorybookBaseUrl(template, framework);
  const id = encodeURIComponent(story);

  if (mode === "preview") {
    return `${base}/iframe.html?id=${id}&viewMode=story&${DOCS_EMBED_PARAM}=1`;
  }

  // `singleStory` hides the sidebar, `shortcuts` stops the embed from
  // swallowing keystrokes meant for the page around it, and `full` drops the
  // addon panel.
  const full = mode === "full" ? "&full=1" : "";

  return `${base}/?path=/story/${id}${full}&shortcuts=false&singleStory=true`;
}

/**
 * Coerce an author-supplied height to a CSS length. A bare number, in either
 * type since markdown attributes arrive as strings, means pixels; anything else
 * is already a CSS length and is passed through.
 */
export function storybookEmbedCssHeight(height: number | string): string {
  if (typeof height === "number") return `${height}px`;

  const trimmed = height.trim();

  return /^\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed;
}

/**
 * Read a height message, or `null` when the payload is not one or carries no
 * usable height. Heights that are not finite positive numbers are rejected
 * rather than written to a style attribute.
 */
export function readDocsEmbedHeight(data: unknown): number | null {
  if (typeof data !== "object" || data === null) return null;

  const { type, height } = data as { type?: unknown; height?: unknown };
  if (type !== DOCS_EMBED_HEIGHT_MESSAGE) return null;
  if (typeof height !== "number" || !Number.isFinite(height) || height <= 0) return null;

  return height;
}
