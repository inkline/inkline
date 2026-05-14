import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const angularConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: {
    eslintConfig: "",
    requiredPlugins: [],
  },
  typecheck: {
    tsconfig: "",
    dtsImports: ["@angular/core"],
  },
  invariants: [requireFileExtension(".ts")],
};
