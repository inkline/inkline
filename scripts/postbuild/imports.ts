import { resolve, relative, dirname } from "pathe";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import glob from "fast-glob";

const rootDir = resolve(__dirname, "..", "..");
const libDir = resolve(rootDir, "lib");

const absoluteToRelativePaths = (file: string, contents: string) => {
    return contents.replace(
        /(from\s+|require\()["'](@inkline\/inkline.+)['"]/g,
        (match, p0, p1) => {
            const absolutePath = p1.replace(`@inkline/inkline`, libDir);
            const relativePath = relative(dirname(file), absolutePath);

            const relativeImportPath = relativePath.startsWith(".")
                ? relativePath
                : `./${relativePath}`;

            return `${p0}"${relativeImportPath}"`;
        }
    );
};

const replaceVueWithCompiled = (file: string, contents: string) => {
    return contents.replace(
        /(require\()["'](@inkline\/inkline.+)['"]/g,
        (match) => {
            return match.replace(".vue", "");
        }
    );
};

(async () => {
    const files = await glob(resolve(libDir, "**/*.{js,mjs,dts,vue}"), {
        ignore: [resolve(libDir, "**", "examples")],
    });

    files
        .filter((file) => file.endsWith(".js"))
        .map(async (file) => {
            const contents = await readFile(file, "utf8");
            const newContents = replaceVueWithCompiled(file, contents);

            // await writeFile(file, newContents, "utf8");
        });
})();
