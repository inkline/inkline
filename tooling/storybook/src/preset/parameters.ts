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
