import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const solidConformance: TargetConformanceSpec = {
  controlFlowImports: {
    if: { module: "solid-js", named: ["Show"] },
    for: { module: "solid-js", named: ["For"] },
    switch: { module: "solid-js", named: ["Switch", "Match"] },
  },
  lint: {
    eslintConfig: "./tsconfigs/solid.eslintrc.json",
    requiredPlugins: ["solid"],
  },
  typecheck: {
    tsconfig: "./tsconfigs/solid.tsconfig.json",
    dtsImports: ["solid-js"],
  },
  invariants: [requireFileExtension(".tsx")],
};
