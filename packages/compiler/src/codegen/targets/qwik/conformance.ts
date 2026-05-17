import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TargetConformanceSpec } from "../../context.ts";
import { requireFileExtension } from "../../../testing/conformance.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const qwikConformance: TargetConformanceSpec = {
  controlFlowImports: {},
  lint: { tool: "oxlint", config: resolve(__dirname, "tsconfigs", "qwik.oxlintrc.json") },
  typecheck: {
    tsconfig: "",
    dtsImports: ["@qwik.dev/core"],
  },
  invariants: [requireFileExtension(".tsx")],
};
