# @inkline/storybook

Single-source story definitions and shared Storybook configuration for
Inkline's per-framework component packages.

A component is authored once as `.ink.tsx` and compiled to seven framework
targets. Stories follow the same model: write one framework-agnostic
definition, generate per-framework CSF.

## Authoring a story

Add a definition under `ui/components/stories/`, next to the single source:

```ts
import { defineStories } from "@inkline/storybook";
import type { ButtonProps } from "../src/IButton.ink.tsx";

export default defineStories<ButtonProps>({
  component: "IButton",
  title: "Components/Button",
  args: { label: "Click me", disabled: false },
  argTypes: { label: { control: "text" } },
  stories: {
    Default: {},
    Disabled: { args: { disabled: true } },
  },
});
```

`defineStories` is a typed identity helper — `args` are checked against the
component's prop type.

## Generating

```bash
inkline-storybook generate            # one-shot
inkline-storybook generate --watch    # regenerate on change
```

Emits `ui/<target>/stories/<Component>.stories.ts` for every active framework
(React, Vue, Svelte, Solid, Angular, Qwik; Astro is deferred). Generated files
are gitignored. The generator asserts the derived story IDs are identical
across frameworks — the invariant cross-framework screenshot diffing relies on.

## Shared Storybook config

Each framework's `.storybook/main.ts` stays declarative:

```ts
import { createStorybookConfig } from "@inkline/storybook/preset/main";

export default createStorybookConfig({
  framework: "@storybook/react-vite",
  componentPackage: "@inkline/react",
  sourceEntry: new URL("../generated/index.ts", import.meta.url).pathname,
  vitePlugins: [
    /* framework vite plugin */
  ],
});
```

`./preset/parameters` exports the shared, renderer-agnostic Storybook
`parameters`. Decorators are intentionally not shared — they are
renderer-specific and stay local to each framework's `preview.ts`.
