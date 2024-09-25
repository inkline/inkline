import shell from "shelljs";
import { resolve } from "path";

const __dirname = new URL(".", import.meta.url).pathname;

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, ".."));

/**
 * Copy package.json to lib
 */

shell.cp("./package.json", "./lib/package.json");
