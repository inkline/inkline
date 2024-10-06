import { exec } from "../utils";

export function eslint() {
    exec("eslint -c eslint.config.mjs src");
}
