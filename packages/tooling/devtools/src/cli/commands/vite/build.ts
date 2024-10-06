import { exec } from "../../utils";
import type { ViteBuildCommandOptions } from "../../types";

export function viteBuild(options: ViteBuildCommandOptions) {
    exec(options.vue ? "vue-tsc" : "tsc");
    exec("vite build");
}
