/** Which story template renders a given framework. */
export type TemplateKind = "csf3" | "angular";

export interface FrameworkConfig {
  /** Inkline target name; also the `ui/<target>` package directory. */
  readonly target: string;
  /** Package the generated story imports the component from. */
  readonly componentPackage: string;
  /** Specifier providing `Meta`/`StoryObj` types for this renderer. */
  readonly typeImport: string;
  /** Storybook framework package for `.storybook/main.ts`. */
  readonly frameworkPackage: string;
  /** Dev-server port; unique per framework so composition can aggregate them. */
  readonly port: number;
  /** Story template used for this framework. */
  readonly template: TemplateKind;
  /** When true the generator skips this framework. */
  readonly deferred?: boolean;
}

/**
 * The seven Inkline targets and their Storybook bindings. The CSF3 template
 * covers React, Vue, Svelte, Solid and Qwik unchanged — across these renderers
 * a CSF3 story differs only by the renderer type import and the component
 * package, which is exactly what this table parameterises. Angular needs a
 * class-component template; Astro is deferred.
 */
export const FRAMEWORKS: readonly FrameworkConfig[] = [
  {
    target: "react",
    componentPackage: "@inkline/react",
    typeImport: "@storybook/react-vite",
    frameworkPackage: "@storybook/react-vite",
    port: 6006,
    template: "csf3",
  },
  {
    target: "vue",
    componentPackage: "@inkline/vue",
    typeImport: "@storybook/vue3-vite",
    frameworkPackage: "@storybook/vue3-vite",
    port: 6007,
    template: "csf3",
  },
  {
    target: "svelte",
    componentPackage: "@inkline/svelte",
    typeImport: "@storybook/svelte-vite",
    frameworkPackage: "@storybook/svelte-vite",
    port: 6008,
    template: "csf3",
  },
  {
    target: "solid",
    componentPackage: "@inkline/solid",
    typeImport: "storybook-solidjs-vite",
    frameworkPackage: "storybook-solidjs-vite",
    port: 6009,
    template: "csf3",
  },
  {
    target: "angular",
    componentPackage: "@inkline/angular",
    typeImport: "@storybook/angular",
    frameworkPackage: "@storybook/angular",
    port: 6010,
    template: "angular",
  },
  {
    target: "qwik",
    componentPackage: "@inkline/qwik",
    typeImport: "storybook-framework-qwik",
    frameworkPackage: "storybook-framework-qwik",
    port: 6011,
    template: "csf3",
  },
  {
    target: "astro",
    componentPackage: "@inkline/astro",
    typeImport: "@storybook-astro/framework",
    frameworkPackage: "@storybook-astro/framework",
    port: 6012,
    template: "csf3",
  },
];

/** Frameworks the generator emits stories for in the current phase. */
export function activeFrameworks(): readonly FrameworkConfig[] {
  return FRAMEWORKS.filter((framework) => !framework.deferred);
}

/** Look up a framework by its Inkline target name. */
export function frameworkByTarget(target: string): FrameworkConfig | undefined {
  return FRAMEWORKS.find((framework) => framework.target === target);
}
