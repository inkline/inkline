import glob from "fast-glob";
import { basename, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const baseDir = resolve(__dirname, "..", "..");
const packageJSONPath = resolve(baseDir, "package.json");
const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf-8"));
const components = glob.sync(resolve(baseDir, "src", "components", "*"), {
    onlyDirectories: true,
});

packageJSON.exports = Object.keys(packageJSON.exports).reduce<
    Record<string, any>
>((acc, key) => {
    if (!key.startsWith("./components/")) {
        acc[key] = packageJSON.exports[key];
    }

    return acc;
}, {});

components.forEach((componentDir) => {
    const componentName = basename(componentDir);

    packageJSON.exports[`./components/${componentName}`] = {
        require: `./components/${componentName}/index.js`,
        import: `./components/${componentName}/index.mjs`,
        types: `./components/${componentName}/index.d.ts`,
    };
});

writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 4));
