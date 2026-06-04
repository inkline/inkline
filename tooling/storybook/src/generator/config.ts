export type TemplateKind = "csf3" | "angular";

export interface RenderStoryConfig {
  readonly frameworkImport: string;
  readonly expression: string;
}

export interface FrameworkConfig {
  readonly target: string;
  readonly componentPackage: string;
  readonly typeImport: string;
  readonly frameworkPackage: string;
  readonly port: number;
  readonly template: TemplateKind;
  readonly compiledExtension: string;
  readonly renderStory: RenderStoryConfig;
  readonly hasDefaultExport: boolean;
  readonly exportedNameSuffix?: string;
  readonly deferred?: boolean;
}

export const FRAMEWORKS: readonly FrameworkConfig[] = [
  {
    target: "react",
    componentPackage: "@inkline/react",
    typeImport: "@storybook/react-vite",
    frameworkPackage: "@storybook/react-vite",
    port: 6006,
    template: "csf3",
    compiledExtension: ".tsx",
    renderStory: {
      frameworkImport: 'import { createElement } from "react";',
      expression: "createElement({name})",
    },
    hasDefaultExport: false,
  },
  {
    target: "vue",
    componentPackage: "@inkline/vue",
    typeImport: "@storybook/vue3-vite",
    frameworkPackage: "@storybook/vue3-vite",
    port: 6007,
    template: "csf3",
    compiledExtension: ".vue",
    renderStory: {
      frameworkImport: 'import { h } from "vue";',
      expression: "h({name})",
    },
    hasDefaultExport: true,
  },
  {
    target: "svelte",
    componentPackage: "@inkline/svelte",
    typeImport: "@storybook/svelte-vite",
    frameworkPackage: "@storybook/svelte-vite",
    port: 6008,
    template: "csf3",
    compiledExtension: ".svelte",
    renderStory: {
      // Svelte has no `createElement`; the Storybook Svelte renderer mounts the
      // component returned as `{ Component }` from the story's `render`.
      frameworkImport: "",
      expression: "({ Component: {name} })",
    },
    hasDefaultExport: true,
  },
  {
    target: "solid",
    componentPackage: "@inkline/solid",
    typeImport: "storybook-solidjs-vite",
    frameworkPackage: "storybook-solidjs-vite",
    port: 6009,
    template: "csf3",
    compiledExtension: ".tsx",
    renderStory: {
      frameworkImport: 'import { createComponent } from "solid-js";',
      expression: "createComponent({name}, {})",
    },
    hasDefaultExport: true,
  },
  {
    target: "angular",
    componentPackage: "@inkline/angular",
    typeImport: "@storybook/angular",
    frameworkPackage: "@analogjs/storybook-angular",
    port: 6010,
    template: "angular",
    compiledExtension: ".component.ts",
    renderStory: {
      frameworkImport: "",
      // `@storybook/angular`'s renderer (`prepareMain`) only honors a story's `template` +
      // `context.component`; it ignores a `component` returned from `render()`. So a render
      // wrapper must be instantiated via its own selector in a `template`, with the standalone
      // wrapper supplied through `moduleMetadata.imports`.
      expression:
        "({ moduleMetadata: { imports: [{name}] }, template: `<{selector}></{selector}>` })",
    },
    hasDefaultExport: false,
    exportedNameSuffix: "Component",
  },
  {
    target: "qwik",
    componentPackage: "@inkline/qwik",
    typeImport: "storybook-framework-qwik",
    frameworkPackage: "storybook-framework-qwik",
    port: 6011,
    template: "csf3",
    compiledExtension: ".tsx",
    renderStory: {
      frameworkImport: 'import { jsx } from "@qwik.dev/core/jsx-runtime";',
      expression: "jsx({name}, {})",
    },
    hasDefaultExport: false,
  },
  {
    target: "astro",
    componentPackage: "@inkline/astro",
    typeImport: "@storybook-astro/framework",
    frameworkPackage: "@storybook-astro/framework",
    port: 6012,
    template: "csf3",
    compiledExtension: ".astro",
    renderStory: {
      // The Storybook Astro renderer expects the `.astro` component factory to be
      // returned (and routed to server-side rendering), not invoked client-side.
      frameworkImport: "",
      expression: "{name}",
    },
    hasDefaultExport: true,
  },
];

export function activeFrameworks(): readonly FrameworkConfig[] {
  return FRAMEWORKS.filter((framework) => !framework.deferred);
}

export function frameworkByTarget(target: string): FrameworkConfig | undefined {
  return FRAMEWORKS.find((framework) => framework.target === target);
}
