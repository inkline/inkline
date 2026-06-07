import { describe, it, expect } from "vitest";
import { renderAngular } from "./angular.ts";
import { frameworkByTarget } from "../config.ts";
import type { LoadedStoryModule, ResolvedRenderImport } from "../index.ts";

const angular = frameworkByTarget("angular")!;

const buttonModule: LoadedStoryModule = {
  meta: {
    component: "Button",
    title: "Components/Button",
    args: { label: "Click me" },
    argTypes: { label: { control: "text" } },
  },
  stories: { Default: {}, Disabled: { args: { disabled: true } } },
  sourcePath: "/fake/Button.stories.ts",
};

describe("renderAngular", () => {
  it("imports the class-based component and Storybook Angular types", () => {
    const out = renderAngular(buttonModule, angular, []);
    expect(out).toContain('import type { Meta, StoryObj } from "@storybook/angular";');
    expect(out).toContain('import { Button } from "@inkline/angular";');
  });

  it("uses the component type directly (not typeof) for Angular generics", () => {
    const out = renderAngular(buttonModule, angular, []);
    expect(out).toContain("const meta: Meta<Button> = {");
    expect(out).toContain("type Story = StoryObj<Button>;");
    expect(out).not.toContain("typeof");
  });

  it("emits title, args, argTypes and one export per story", () => {
    const out = renderAngular(buttonModule, angular, []);
    expect(out).toContain('title: "Components/Button",');
    expect(out).toContain('args: {"label":"Click me"},');
    expect(out).toContain('argTypes: {"label":{"control":"text"}},');
    expect(out).toContain("export const Default: Story = {};");
    expect(out).toContain('export const Disabled: Story = { args: {"disabled":true} };');
  });

  it("omits args/argTypes lines when absent", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "Box", title: "Components/Box" },
      stories: { Default: {} },
      sourcePath: "/fake/Box.stories.ts",
    };
    const out = renderAngular(mod, angular, []);
    expect(out).not.toContain("args:");
    expect(out).not.toContain("argTypes:");
  });

  it("emits render story imports and expressions for Angular", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "IBadge", title: "Components/Badge" },
      stories: { Colors: { render: "./colors.ink.tsx" } },
      sourcePath: "/fake/IBadge.stories.ts",
    };
    const renderImports: ResolvedRenderImport[] = [
      {
        storyName: "Colors",
        localName: "ColorsStory",
        exportedName: "colorsComponent",
        importPath: "../generated/badge/stories/colors.component.ts",
        selector: "colors",
      },
    ];
    const out = renderAngular(mod, angular, renderImports);
    expect(out).toContain(
      'import { colorsComponent as ColorsStory } from "../generated/badge/stories/colors.component.ts";',
    );
    // `@storybook/angular` ignores a `component` returned from `render()`, so the wrapper is
    // instantiated via its selector in a `template`, with the standalone wrapper in moduleMetadata.
    expect(out).toContain(
      "export const Colors: Story = { render: () => ({ moduleMetadata: { imports: [ColorsStory] }, template: `<colors></colors>` }) };",
    );
  });

  it("emits default imports when framework.hasDefaultExport is true", () => {
    const frameworkWithDefault: typeof angular = { ...angular, hasDefaultExport: true };
    const mod: LoadedStoryModule = {
      meta: { component: "IBadge", title: "Components/Badge" },
      stories: { Colors: { render: "./colors.ink.tsx" } },
      sourcePath: "/fake/IBadge.stories.ts",
    };
    const renderImports: ResolvedRenderImport[] = [
      {
        storyName: "Colors",
        localName: "ColorsStory",
        exportedName: "colorsComponent",
        importPath: "../generated/badge/stories/colors.component.ts",
        selector: "colors",
      },
    ];
    const out = renderAngular(mod, frameworkWithDefault, renderImports);
    expect(out).toContain(
      'import ColorsStory from "../generated/badge/stories/colors.component.ts";',
    );
  });

  it("deduplicates the import when two stories share one render source", () => {
    const mod: LoadedStoryModule = {
      meta: { component: "IInput", title: "Components/Input" },
      stories: {
        Default: { render: "./prefixSuffix.ink.tsx" },
        PrefixSuffix: { render: "./prefixSuffix.ink.tsx" },
      },
      sourcePath: "/fake/IInput.stories.ts",
    };
    const shared: ResolvedRenderImport = {
      localName: "PrefixSuffixStory",
      exportedName: "prefixSuffixComponent",
      importPath: "../generated/input/stories/prefixSuffix.component.ts",
      selector: "prefixSuffix",
      storyName: "Default",
    };
    const renderImports: ResolvedRenderImport[] = [
      shared,
      { ...shared, storyName: "PrefixSuffix" },
    ];
    const out = renderAngular(mod, angular, renderImports);
    expect(out.match(/import { prefixSuffixComponent as PrefixSuffixStory }/g)).toHaveLength(1);
    expect(out).toContain("export const Default: Story = { render: () =>");
    expect(out).toContain("export const PrefixSuffix: Story = { render: () =>");
  });

  it("validates component and story identifiers", () => {
    const badComponent: LoadedStoryModule = {
      meta: { component: "x-y", title: "X" },
      stories: { Default: {} },
      sourcePath: "/fake/X.stories.ts",
    };
    expect(() => renderAngular(badComponent, angular, [])).toThrow(/Invalid component/);

    const badStory: LoadedStoryModule = {
      meta: { component: "Button", title: "X" },
      stories: { "9": {} },
      sourcePath: "/fake/X.stories.ts",
    };
    expect(() => renderAngular(badStory, angular, [])).toThrow(/Invalid story name/);
  });
});
