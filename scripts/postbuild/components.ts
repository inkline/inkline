/**
 * Build each component individually to provide CJS exports that do not require
 * compilation for .vue files.
 */

import { resolve, basename, dirname } from "pathe";
import { copyFile } from "fs/promises";
import glob from "fast-glob";
import { build } from "vite";

const rootDir = resolve(__dirname, "..", "..");
const srcDir = resolve(rootDir, "src");
const libDir = resolve(rootDir, "lib");

(async () => {
    const files = await glob(resolve(srcDir, "components", "**", "*.vue"), {
        ignore: [resolve(srcDir, "**", "examples")],
    });

    files.map(async (componentFile) => {
        const componentDir = dirname(componentFile);
        const componentName = basename(componentFile, ".vue");
        const componentIndexFile = componentFile.replace(
            `${componentName}.vue`,
            "index.ts"
        );
        const outDir = resolve(rootDir, "tmp", componentName);
        const outFile = `${componentName}.js`;

        await build({
            configFile: resolve(rootDir, "vite.config.ts"),
            build: {
                outDir,
                lib: {
                    entry: componentIndexFile,
                    name: componentName,
                    formats: ["cjs"],
                    fileName: () => outFile,
                },
            },
        });

        await copyFile(
            resolve(outDir, outFile),
            resolve(componentDir.replace(srcDir, libDir), outFile)
        );
    });
})();
