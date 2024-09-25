import { exec } from "../utils";
export function build() {
    exec("tsc");
    exec("vite build");
}
