import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const reactConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: {
    eslintConfig: "./tsconfigs/react.eslintrc.json",
    requiredPlugins: ["react", "react-hooks"],
  },
  typecheck: {
    tsconfig: "./tsconfigs/react.tsconfig.json",
    dtsImports: ["@types/react", "react"],
  },
  invariants: [requireFileExtension(".tsx")],
};
