import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const astroConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: {
    eslintConfig: "",
    requiredPlugins: [],
  },
  typecheck: {
    tsconfig: "",
    dtsImports: ["astro"],
  },
  invariants: [requireFileExtension(".astro")],
};
