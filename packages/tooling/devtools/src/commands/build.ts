import { exec } from "../utils";

export function build() {
    exec("tsc --noEmit");
    exec("vite build");
}
