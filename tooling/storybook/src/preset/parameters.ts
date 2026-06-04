/**
 * Storybook `parameters` shared by every framework's `.storybook/preview.ts`.
 *
 * Only parameters are shared: they are plain data and renderer-agnostic.
 * Decorators are NOT shared — a decorator is a renderer-specific render
 * function (React JSX, a Vue component, …) and cannot be portable. Each
 * framework adds its own decorators locally if it needs them.
 */
export const sharedParameters = {
  layout: "centered",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
} as const;

/**
 * Tags the preview document with `data-framework="<framework>"` so the shared preview CSS (and any
 * future framework-specific styling) can target the framework currently being viewed — each
 * Storybook renderer nests the rendered story differently, so layout rules sometimes need to be
 * scoped per framework.
 *
 * Called for its side effect from each framework's `.storybook/preview.ts`; the file's
 * `export default` must stay an object literal (Storybook statically parses it), so this returns
 * nothing rather than the preview config.
 */
export function setFramework(framework: string): void {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.framework = framework;
  }
}
