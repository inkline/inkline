import type { StoryDefinition } from "../../define.ts";
import type { FrameworkConfig } from "../config.ts";
import {
  BANNER,
  assertIdentifier,
  buildSlotRender,
  getSlotImports,
  mergeSlots,
  serializeArgs,
} from "./shared.ts";

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

  const hasAnySlots =
    definition.slots != null || Object.values(definition.stories).some((v) => v.slots != null);

  const lines: string[] = [
    BANNER,
    `import type { Meta, StoryObj } from "${framework.typeImport}";`,
  ];

  if (hasAnySlots) {
    lines.push(...getSlotImports(framework.target));
  }

  lines.push(
    `import { ${definition.component} } from "${framework.componentPackage}";`,
    "",
    "const meta = {",
    `  component: ${definition.component},`,
    `  title: ${JSON.stringify(definition.title)},`,
  );

  if (definition.args) lines.push(`  args: ${serializeArgs(definition.args)},`);
  if (definition.argTypes) lines.push(`  argTypes: ${serializeArgs(definition.argTypes)},`);

  if (definition.slots) {
    const render = buildSlotRender(definition.component, definition.slots, framework.target);
    if (render) lines.push(`  render: ${render},`);
  }

  lines.push(
    `} satisfies Meta<typeof ${definition.component}>;`,
    "export default meta;",
    "",
    "type Story = StoryObj<typeof meta>;",
    "",
  );

  for (const [name, variant] of Object.entries(definition.stories)) {
    assertIdentifier(name, "story name");

    const parts: string[] = [];
    if (variant.args) parts.push(`args: ${serializeArgs(variant.args)}`);

    if (variant.slots) {
      const effective = mergeSlots(definition.slots, variant.slots);
      if (effective) {
        const render = buildSlotRender(definition.component, effective, framework.target);
        if (render) parts.push(`render: ${render}`);
      }
    }

    const body = parts.length > 0 ? `{ ${parts.join(", ")} }` : "{}";
    lines.push(`export const ${name}: Story = ${body};`);
  }

  return lines.join("\n") + "\n";
}
