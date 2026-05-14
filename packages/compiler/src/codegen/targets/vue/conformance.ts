import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

export const vueConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: {
    eslintConfig: "./tsconfigs/vue.eslintrc.json",
    requiredPlugins: ["vue"],
  },
  typecheck: {
    tsconfig: "./tsconfigs/vue.tsconfig.json",
    dtsImports: ["vue"],
  },
  invariants: [requireFileExtension(".vue")],
};
