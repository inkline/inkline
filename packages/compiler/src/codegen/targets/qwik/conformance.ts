import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const qwikConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: {
    eslintConfig: "",
    requiredPlugins: [],
  },
  typecheck: {
    tsconfig: "",
    dtsImports: ["@builder.io/qwik"],
  },
  invariants: [requireFileExtension(".tsx")],
};
