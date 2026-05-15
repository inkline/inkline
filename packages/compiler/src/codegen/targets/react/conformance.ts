import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const reactConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "oxlint", config: resolve(__dirname, "tsconfigs", "react.oxlintrc.json") },
  typecheck: {
    tsconfig: "./tsconfigs/react.tsconfig.json",
    dtsImports: ["@types/react", "react"],
  },
  invariants: [requireFileExtension(".tsx")],
};
