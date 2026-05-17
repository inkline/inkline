import type { StoryDefinition } from "../../define.ts";
import type { FrameworkConfig } from "../config.ts";
import { BANNER, assertIdentifier, serializeArgs } from "./shared.ts";

/**
 * Renders a CSF3 story file for renderers where a story is structurally
 * renderer-agnostic (React, Vue, Svelte, Solid, Qwik). Only the renderer type
 * import and the component package vary, both supplied by {@link FrameworkConfig}.
 */
export function renderCsf3(
  definition: StoryDefinition<unknown>,
  framework: FrameworkConfig,
): string {
  assertIdentifier(definition.component, "component");

  const lines: string[] = [
    BANNER,
    `import type { Meta, StoryObj } from "${framework.typeImport}";`,
    `import { ${definition.component} } from "${framework.componentPackage}";`,
    "",
    "const meta = {",
    `  component: ${definition.component},`,
    `  title: ${JSON.stringify(definition.title)},`,
  ];

  if (definition.args) lines.push(`  args: ${serializeArgs(definition.args)},`);
  if (definition.argTypes) lines.push(`  argTypes: ${serializeArgs(definition.argTypes)},`);

  lines.push(
    `} satisfies Meta<typeof ${definition.component}>;`,
    "export default meta;",
    "",
    "type Story = StoryObj<typeof meta>;",
    "",
  );

  for (const [name, variant] of Object.entries(definition.stories)) {
    assertIdentifier(name, "story name");
    const body = variant.args ? `{ args: ${serializeArgs(variant.args)} }` : "{}";
    lines.push(`export const ${name}: Story = ${body};`);
  }

  return lines.join("\n") + "\n";
}
