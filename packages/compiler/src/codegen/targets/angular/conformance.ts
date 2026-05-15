import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const angularConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "eslint", config: resolve(__dirname, "tsconfigs", "angular.eslint.config.js") },
  typecheck: {
    tsconfig: "",
    dtsImports: ["@angular/core"],
  },
  invariants: [requireFileExtension(".ts")],
};
