import type { GeneratedFile, TargetName } from "../codegen/context.ts";

export interface MountResult {
  readonly html: string;
  readonly warnings: readonly string[];
}

export async function mountForTarget(
  target: TargetName,
  file: GeneratedFile,
  props?: Record<string, unknown>,
): Promise<MountResult> {
  const warnings: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

  try {
    switch (target) {
      case "react":
        return { html: await mountReact(file, props), warnings };
      case "vue":
        return { html: await mountVue(file, props), warnings };
      case "solid":
        return { html: await mountSolid(file, props), warnings };
      case "svelte":
        return { html: await mountSvelte(file, props), warnings };
      default:
        throw new Error(`mountForTarget: unsupported target "${target}"`);
    }
  } finally {
    console.warn = origWarn;
  }
}

async function mountReact(file: GeneratedFile, props?: Record<string, unknown>): Promise<string> {
  const React = await import("react");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { renderToStaticMarkup } = require("react-dom/server") as {
    renderToStaticMarkup: (el: unknown) => string;
  };
  const mod = await loadModule(file);
  const Component = mod.default ?? Object.values(mod)[0];
  const element = React.createElement(Component as React.FC, props);
  return renderToStaticMarkup(element);
}

async function mountVue(file: GeneratedFile, props?: Record<string, unknown>): Promise<string> {
  const { createSSRApp } = await import("vue");
  const { renderToString } = await import("@vue/server-renderer");
  const mod = await loadModule(file);
  const Component = mod.default ?? Object.values(mod)[0];
  const app = createSSRApp(Component as Parameters<typeof createSSRApp>[0], props);
  return renderToString(app);
}

async function mountSolid(file: GeneratedFile, props?: Record<string, unknown>): Promise<string> {
  const { renderToString } = await import("solid-js/web");
  const mod = await loadModule(file);
  const Component = mod.default ?? Object.values(mod)[0];
  return renderToString(() => (Component as (p: Record<string, unknown>) => unknown)(props ?? {}));
}

async function mountSvelte(file: GeneratedFile, _props?: Record<string, unknown>): Promise<string> {
  const { render } = (await import("svelte/server")) as {
    render: (comp: unknown, opts?: unknown) => { body: string };
  };
  const mod = await loadModule(file);
  const Component = mod.default ?? Object.values(mod)[0];
  const result = render(Component);
  return result.body;
}

async function loadModule(file: GeneratedFile): Promise<Record<string, unknown>> {
  const blob = new Blob([file.contents], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  try {
    return (await import(/* @vite-ignore */ url)) as Record<string, unknown>;
  } finally {
    URL.revokeObjectURL(url);
  }
}
