/**
 * Storybook embed source for the docs component pages (ADR-002 option (b):
 * embed each framework's deployed Storybook story per FrameworkSwitcher tab,
 * rather than committing per-framework code snippets).
 *
 * Single source of truth for where the deployed per-framework Storybooks live.
 * The default follows the convention documented in
 * `apps/storybook/AGENTS.md` → "Configuring production ref domains"
 * (`STORYBOOK_REF_BASE_URL="https://{framework}.storybook.inkline.io"`).
 *
 * NOTE: the Storybook *deploy target* is out of scope in-repo — CI builds and
 * uploads each framework's `storybook-static` as an artifact, but no hosting
 * domain is committed. So this base is the documented convention, not a
 * verified-live URL; the embeds resolve against it and light up once the deploy
 * lands. It is a local content-config value (trivially correctable here), not a
 * package concern.
 *
 * Override without a code change via env at build time:
 *   NUXT_PUBLIC_STORYBOOK_BASE_URL="https://{framework}.storybook.example.com"
 */
export const STORYBOOK_BASE_URL_TEMPLATE = "https://{framework}.storybook.inkline.io";

/** Build the per-framework Storybook base from the `{framework}` template. */
export function storybookBaseUrl(
  framework: string,
  template = STORYBOOK_BASE_URL_TEMPLATE,
): string {
  return template.replace(/\{framework\}/g, framework);
}

/**
 * Build a canvas (story-view) iframe embed URL for a given framework + story id.
 * Story ids follow Storybook's kebab-cased `title--story` scheme, e.g. the
 * Button's default story (`title: "Components/Actions/Button"`) is
 * `components-actions-button--default`.
 */
export function storybookEmbedUrl(
  framework: string,
  storyId: string,
  template = STORYBOOK_BASE_URL_TEMPLATE,
): string {
  return `${storybookBaseUrl(framework, template)}/iframe.html?id=${storyId}&viewMode=story`;
}
