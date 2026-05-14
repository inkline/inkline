import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const svelteConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: {
    eslintConfig: "./tsconfigs/svelte.eslintrc.json",
    requiredPlugins: ["svelte"],
  },
  typecheck: {
    tsconfig: "./tsconfigs/svelte.tsconfig.json",
    dtsImports: ["svelte"],
  },
  invariants: [requireFileExtension(".svelte")],
};
