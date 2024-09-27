import { exec } from "../../utils";

export function viteBuild() {
    exec("tsc");
    exec("vite build");
}
