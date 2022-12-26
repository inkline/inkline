/* eslint-disable quotes */

import shell from "shelljs";
import glob from "fast-glob";
import path from "path";

(async () => {
    /**
     * Change directory to root
     */

    const rootDir = path.resolve(__dirname, "..", "..");
    const cjsDir = path.resolve(rootDir, "tmp", "cjs");
    shell.cd(rootDir);

    /**
     * Copy files from tmp/cjs to lib
     */

    const cjsFiles = await glob(path.resolve(cjsDir, "**/*.js"));
    cjsFiles.forEach((file) => shell.mv(file, file.replace("tmp/cjs", "lib")));
    shell.rm("-rf", cjsDir);

    /**
     * Resolve sourcemaps
     */

    shell.cp("-R", "./src", "./lib/src");
    shell.exec(
        `bash -c 'find lib -type f -name *.mjs.map -exec perl -i -pe"s/..\\/src/src/g" {} +'`
    );

    /**
     * Remove unnecessary files
     */

    shell.rm(["./lib/main.*"]);
    shell.exec("find lib -name index.stories.* -type f -delete");
    shell.exec("find lib -name __storybook__ -type d -exec rm -rf {} +");
    shell.exec("find lib -name __tests__ -type d -exec rm -rf {} +");

    /**
     * Copy dist files
     */

    shell.cp("./dist/inkline.umd.js", "./lib/inkline.js");
    shell.cp("./dist/style.css", "./lib/inkline.css");
    shell.cp("-R", "./src/assets", "./lib/assets");

    /**
     * Copy meta files
     */

    shell.cp("./README.md", "./lib/README.md");
    shell.cp("./LICENSE", "./lib/LICENSE");
})();
