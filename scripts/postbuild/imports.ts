import { resolve, relative, dirname } from "pathe";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import glob from "fast-glob";

const rootDir = resolve(__dirname, "..", "..");
const libDir = resolve(rootDir, "lib");

(async () => {
    const files = await glob(resolve(libDir, "**/*.{js,mjs,dts,vue}"), {
        ignore: [resolve(libDir, "**", "examples")],
    });

    files.map(async (file) => {
        const contents = await readFile(file, "utf8");

        const newContents = contents.replace(
            /(from\s+|require\()["'](@inkline\/inkline.+)['"]/g,
            (match, p0, p1) => {
                const absolutePath = p1.replace(`@inkline/inkline`, libDir);
                const relativePath = relative(dirname(file), absolutePath);

                let relativeImportPath = relativePath.startsWith(".")
                    ? relativePath
                    : `./${relativePath}`;

                // Use compiled files in CJS imports
                if (file.endsWith(".js")) {
                    relativeImportPath = relativeImportPath.replace(
                        /\.vue$/,
                        ""
                    );
                }

                return `${p0}"${relativeImportPath}"`;
            }
        );

        await writeFile(file, newContents, "utf8");
    });
})();
