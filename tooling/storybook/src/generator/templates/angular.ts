import type { AngularRegistry } from "@inkline/compiler";
import type { LoadedStoryModule, ResolvedRenderImport } from "../index.ts";
import type { FrameworkConfig } from "../config.ts";
import { BANNER, assertIdentifier, renderImportLines, serializeArgs } from "./shared.ts";

export function renderAngular(
  storyModule: LoadedStoryModule,
  framework: FrameworkConfig,
  renderImports: readonly ResolvedRenderImport[],
  angularRegistry?: AngularRegistry,
): string {
  const { meta, stories } = storyModule;
  assertIdentifier(meta.component, "component");

  const renderByStory = new Map(renderImports.map((r) => [r.storyName, r]));

  // A styling directive (`[inkButton]`) has no standalone element for Storybook to render from
  // `meta.component`, so its bare stories mount it on its native host with the stacked chain
  // (`<button inkButtonBase inkButton [args]>`). Element/structural/wrapper components render fine
  // via `meta.component` (an element host tag), so they keep the bare-story form.
  const entry = angularRegistry?.get(meta.component);
  const directive = entry && entry.kind === "directive" ? entry : undefined;

  const lines: string[] = [
    BANNER,
    `import type { Meta, StoryObj } from "${framework.typeImport}";`,
    `import { ${meta.component} } from "${framework.componentPackage}";`,
  ];

  // The chain's headless base(s) live in the framework package's `/headless` entry; the styled self
  // (`meta.component`) is already imported above. Both are needed in `moduleMetadata.imports`.
  if (directive) {
    for (const base of directive.chainComponents) {
      if (base === meta.component) continue;
      assertIdentifier(base, "chain component");
      lines.push(`import { ${base} } from "${framework.componentPackage}/headless";`);
    }
  }

  lines.push(...renderImportLines(renderImports, framework.hasDefaultExport));

  lines.push(
    "",
    `const meta: Meta<${meta.component}> = {`,
    `  component: ${meta.component},`,
    `  title: ${JSON.stringify(meta.title)},`,
  );

  if (meta.args) lines.push(`  args: ${serializeArgs(meta.args)},`);
  if (meta.argTypes) lines.push(`  argTypes: ${serializeArgs(meta.argTypes)},`);

  lines.push("};", "export default meta;", "", `type Story = StoryObj<${meta.component}>;`, "");

  // The host-element template + arg bindings are component-level (shared by every bare story).
  let directiveRender = "";
  if (directive) {
    const argKeys = meta.argTypes ? Object.keys(meta.argTypes) : Object.keys(meta.args ?? {});
    const bindings = argKeys.map((k) => `[${k}]="${k}"`).join(" ");
    const open = `${directive.hostTag} ${directive.attrChain.join(" ")}${bindings ? " " + bindings : ""}`;
    directiveRender = `({ props: args, moduleMetadata: { imports: [${directive.chainComponents.join(", ")}] }, template: \`<${open}></${directive.hostTag}>\` })`;
  }

  for (const [name, variant] of Object.entries(stories)) {
    assertIdentifier(name, "story name");
    const ri = renderByStory.get(name);
    if (ri) {
      const expr = framework.renderStory.expression
        .replaceAll("{name}", ri.localName)
        .replaceAll("{selector}", ri.selector);
      lines.push(`export const ${name}: Story = { render: () => ${expr} };`);
    } else if (directive) {
      const argsPart = variant.args ? `args: ${serializeArgs(variant.args)}, ` : "";
      lines.push(
        `export const ${name}: Story = { ${argsPart}render: (args) => ${directiveRender} };`,
      );
    } else {
      const body = variant.args ? `{ args: ${serializeArgs(variant.args)} }` : "{}";
      lines.push(`export const ${name}: Story = ${body};`);
    }
  }

  return lines.join("\n") + "\n";
}
