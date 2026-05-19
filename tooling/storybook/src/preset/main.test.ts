import { describe, it, expect } from "vitest";
import { createStorybookConfig } from "./main.ts";

const base = {
  framework: "@storybook/react-vite",
  componentPackage: "@inkline/react",
  sourceEntry: "/repo/ui/react/generated/index.ts",
};

describe("createStorybookConfig", () => {
  it("sets the framework, default stories glob and default addons", () => {
    const config = createStorybookConfig(base);
    expect(config.framework).toEqual({ name: "@storybook/react-vite", options: {} });
    expect(config.stories).toEqual(["../stories/**/*.stories.ts"]);
    expect(config.addons).toEqual(["@storybook/addon-a11y", "@storybook/addon-docs"]);
  });

  it("appends extra addons and overrides the stories glob", () => {
    const config = createStorybookConfig({
      ...base,
      stories: ["../custom/**/*.stories.ts"],
      addons: ["@storybook/addon-vitest"],
    });
    expect(config.stories).toEqual(["../custom/**/*.stories.ts"]);
    expect(config.addons).toEqual([
      "@storybook/addon-a11y",
      "@storybook/addon-docs",
      "@storybook/addon-vitest",
    ]);
  });

  it("aliases the component package to source in dev, preserving existing aliases", async () => {
    const config = createStorybookConfig(base);
    const out = await config.viteFinal(
      { resolve: { alias: { foo: "bar" } } },
      { configType: "DEVELOPMENT" },
    );
    expect(out.resolve?.alias).toEqual({
      foo: "bar",
      "@inkline/react": "/repo/ui/react/generated/index.ts",
    });
  });

  it("adds the alias and enables CORS when no resolve/server config exists", async () => {
    const config = createStorybookConfig(base);
    const out = await config.viteFinal({}, { configType: "DEVELOPMENT" });
    expect(out.resolve?.alias).toEqual({
      "@inkline/react": "/repo/ui/react/generated/index.ts",
    });
    expect(out.server).toEqual({ cors: { origin: true, credentials: true } });
  });

  it("does NOT alias to source or set CORS in production builds", async () => {
    const config = createStorybookConfig(base);
    const out = await config.viteFinal({}, { configType: "PRODUCTION" });
    expect(out.resolve).toBeUndefined();
    expect(out.server).toBeUndefined();
  });

  it("appends vite plugins, preserving existing ones", async () => {
    const config = createStorybookConfig({ ...base, vitePlugins: ["react-plugin"] });
    const out = await config.viteFinal({ plugins: ["existing"] }, { configType: "DEVELOPMENT" });
    expect(out.plugins).toEqual(["existing", "react-plugin"]);
  });

  it("forwards frameworkOptions to framework.options", () => {
    const config = createStorybookConfig({
      ...base,
      frameworkOptions: { tsConfig: "./tsconfig.storybook.json" },
    });
    expect(config.framework.options).toEqual({ tsConfig: "./tsconfig.storybook.json" });
  });

  it("adds vite plugins when none exist and leaves plugins untouched when none given", async () => {
    const withPlugin = await createStorybookConfig({
      ...base,
      vitePlugins: ["p"],
    }).viteFinal({}, { configType: "PRODUCTION" });
    expect(withPlugin.plugins).toEqual(["p"]);

    const withoutPlugin = await createStorybookConfig(base).viteFinal(
      {},
      { configType: "PRODUCTION" },
    );
    expect(withoutPlugin.plugins).toBeUndefined();
  });
});
