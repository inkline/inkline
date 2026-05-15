import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension, requirePropsNotDestructured } from "../../../testing/conformance.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const solidConformance: TargetConformanceSpec = {
  controlFlowImports: {
    if: { module: "solid-js", named: ["Show"] },
    for: { module: "solid-js", named: ["For"] },
    switch: { module: "solid-js", named: ["Switch", "Match"] },
  },
  lint: { tool: "oxlint", config: resolve(__dirname, "tsconfigs", "solid.oxlintrc.json") },
  typecheck: {
    tsconfig: "./tsconfigs/solid.tsconfig.json",
    dtsImports: ["solid-js"],
  },
  invariants: [requireFileExtension(".tsx"), requirePropsNotDestructured],
};
