import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const svelteConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "eslint", config: resolve(__dirname, "tsconfigs", "svelte.eslint.config.js") },
  typecheck: {
    tsconfig: "./tsconfigs/svelte.tsconfig.json",
    dtsImports: ["svelte"],
  },
  invariants: [requireFileExtension(".svelte")],
};
