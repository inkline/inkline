import { describe, expect, expectTypeOf, it } from "vitest";

import {
  definePlugin,
  defineTarget,
  type GeneratedFile as GeneratedFileLocal,
  type Plugin,
  type Target,
} from "./plugin.ts";

describe("definePlugin", () => {
  it("returns its argument verbatim (identity helper)", () => {
    const plugin: Plugin = {
      name: "test",
      hooks: {},
    };
    expect(definePlugin(plugin)).toBe(plugin);
  });

  it("preserves all plugin fields including targets and hooks", () => {
    const plugin = definePlugin({
      name: "alpha",
      targets: ["react", "solid"],
      hooks: {
        "ir:post": () => undefined,
        "code:post": () => undefined,
      },
    });
    expect(plugin.name).toBe("alpha");
    expect(plugin.targets).toEqual(["react", "solid"]);
    expect(plugin.hooks["ir:post"]).toBeDefined();
    expect(plugin.hooks["code:post"]).toBeDefined();
  });
});

describe("defineTarget", () => {
  it("returns its argument verbatim (identity helper)", () => {
    const target: Target = {
      name: "react",
      defaultOptions: {},
      generate: () => [],
    };
    expect(defineTarget(target)).toBe(target);
  });

  it("preserves the optional generateModule hook", () => {
    const generateModule = (): GeneratedFileLocal[] => [{ path: "index.ts", contents: "" }];
    const target = defineTarget({
      name: "vue",
      defaultOptions: { mode: "vapor" },
      generate: () => [],
      generateModule,
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- identity check, not invocation
    expect(target.generateModule).toBe(generateModule);
    expect(generateModule()).toHaveLength(1);
  });
});

describe("Target / Plugin types", () => {
  it("Target.generate is a function returning GeneratedFile[]", () => {
    expectTypeOf<Target["generate"]>().toBeFunction();
  });

  it("Plugin.hooks is required", () => {
    expectTypeOf<Plugin>().toHaveProperty("hooks");
  });
});
