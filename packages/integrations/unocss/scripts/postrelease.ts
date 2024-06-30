import shell from "shelljs";
import { resolve } from "path";

const __dirname = new URL(".", import.meta.url).pathname;

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, ".."));

/**
 * Remove build files
 */

shell.rm("-R", ["./lib"]);
