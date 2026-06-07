import type { LoadedStoryModule, ResolvedRenderImport } from "../index.ts";
import type { FrameworkConfig } from "../config.ts";
import { BANNER, assertIdentifier, renderImportLines, serializeArgs } from "./shared.ts";

export function renderCsf3(
  storyModule: LoadedStoryModule,
  framework: FrameworkConfig,
  renderImports: readonly ResolvedRenderImport[],
): string {
  const { meta, stories } = storyModule;
  assertIdentifier(meta.component, "component");

  const renderByStory = new Map(renderImports.map((r) => [r.storyName, r]));

  const lines: string[] = [
    BANNER,
    `import type { Meta, StoryObj } from "${framework.typeImport}";`,
  ];

  if (renderImports.length > 0 && framework.renderStory.frameworkImport) {
    lines.push(framework.renderStory.frameworkImport);
  }

  lines.push(`import { ${meta.component} } from "${framework.componentPackage}";`);

  lines.push(...renderImportLines(renderImports, framework.hasDefaultExport));

  lines.push(
    "",
    "const meta = {",
    `  component: ${meta.component},`,
    `  title: ${JSON.stringify(meta.title)},`,
  );

  if (meta.args) lines.push(`  args: ${serializeArgs(meta.args)},`);
  if (meta.argTypes) lines.push(`  argTypes: ${serializeArgs(meta.argTypes)},`);

  lines.push(
    `} satisfies Meta<typeof ${meta.component}>;`,
    "export default meta;",
    "",
    "type Story = StoryObj<typeof meta>;",
    "",
  );

  for (const [name, variant] of Object.entries(stories)) {
    assertIdentifier(name, "story name");
    const ri = renderByStory.get(name);
    if (ri) {
      const expr = framework.renderStory.expression.replace("{name}", ri.localName);
      lines.push(`export const ${name}: Story = { render: () => ${expr} };`);
    } else {
      const body = variant.args ? `{ args: ${serializeArgs(variant.args)} }` : "{}";
      lines.push(`export const ${name}: Story = ${body};`);
    }
  }

  return lines.join("\n") + "\n";
}
