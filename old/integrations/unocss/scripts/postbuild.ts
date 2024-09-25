import shell from "shelljs";
import { resolve } from "path";

const __dirname = new URL(".", import.meta.url).pathname;

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, ".."));

shell.rm("-r", "lib/**/__tests__");

shell.cp("./README.md", "lib");
shell.cp("./LICENSE", "lib");
