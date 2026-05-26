import type { Framework } from "./detect-framework.ts";

export function generateInklineConfig(targets: Framework[]): string {
  const targetsStr = targets.map((t) => `"${t}"`).join(", ");
  return `import { defineConfig } from "inkline/compiler";

export default defineConfig({
  targets: [${targetsStr}],
});
`;
}

export const exampleComponentTemplate = `import { defineComponent } from "inkline";

export interface HelloWorldProps {
  name?: string;
}

export default defineComponent(
  { slots: { default: {} } },
  (props: HelloWorldProps) => (
    <div class="hello-world">
      <slot>{\`Hello, \${props.name ?? "World"}!\`}</slot>
    </div>
  ),
);
`;
