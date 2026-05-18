import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const astroConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "eslint", config: resolve(__dirname, "tsconfigs", "astro.eslint.config.js") },
  typecheck: {
    tsconfig: "",
    dtsImports: ["astro"],
  },
  invariants: [requireFileExtension(".astro")],
};
