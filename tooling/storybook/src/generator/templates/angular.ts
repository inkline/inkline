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
 * Renders a CSF3 story file for Angular. Angular components are classes, so the
 * generics take the component type directly (`Meta<Button>`) rather than
 * `typeof`. `@inkline/angular` re-exports `<Name>Component as <Name>`, so the
 * import binding is still the bare component name.
 */
export function renderAngular(
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
    `const meta: Meta<${definition.component}> = {`,
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
    "};",
    "export default meta;",
    "",
    `type Story = StoryObj<${definition.component}>;`,
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
