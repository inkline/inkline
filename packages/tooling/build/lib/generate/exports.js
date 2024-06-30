"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateExports = generateExports;
var _fastGlob = _interopRequireDefault(require("fast-glob"));
var _path = require("path");
var _promises = require("fs/promises");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function generateExports(baseDir, options = {}) {
  const srcDir = (0, _path.resolve)(baseDir, "src");
  const packageJSONPath = (0, _path.resolve)(baseDir, "package.json");
  const packageExports = new Map(options.exports ?? []);
  const defaultIgnore = [(0, _path.resolve)(srcDir, "__storybook__", "**"), (0, _path.resolve)(srcDir, "__mocks__", "**"), (0, _path.resolve)(srcDir, "__tests__", "**"), (0, _path.resolve)(srcDir, "playground", "**"), (0, _path.resolve)(srcDir, "**", "*.{d,spec,stories}.ts")];
  packageExports.set("./*", "./*");
  const packageJSON = JSON.parse(await (0, _promises.readFile)(packageJSONPath, "utf-8"));
  const tsFiles = await (0, _fastGlob.default)((0, _path.resolve)(srcDir, "**", "*.ts"), {
    cwd: __dirname,
    ignore: [...(options.ignore ?? []), ...defaultIgnore]
  });
  tsFiles.forEach(file => {
    const fileName = (0, _path.basename)(file, ".ts");
    const exportDir = (0, _path.dirname)(file).replace(srcDir, "");
    const importDir = (0, _path.dirname)(file).replace(srcDir, "/lib");
    const importPath = `.${importDir}/${fileName}`;
    const exportPath = `.${exportDir}/${fileName}`.replace(/\/index$/, "");
    packageExports.set(exportPath, {
      require: `${importPath}.js`,
      import: `${importPath}.mjs`,
      types: `${importPath}.d.ts`
    });
  });
  const scssFiles = await (0, _fastGlob.default)((0, _path.resolve)(srcDir, "**", "*.scss"), {
    cwd: __dirname
  });
  scssFiles.forEach(file => {
    const fileName = (0, _path.basename)(file);
    const exportDir = (0, _path.dirname)(file).replace(srcDir, "");
    const importDir = (0, _path.dirname)(file).replace(srcDir, "/lib");
    const importPath = `.${importDir}/${fileName}`;
    const exportPath = `.${exportDir}/${fileName}`.replace(/\/index$/, "");
    packageExports.set(exportPath, {
      require: importPath,
      import: importPath
    });
    if (!fileName.startsWith("_")) {
      packageExports.set(exportPath.replace("scss", "css"), {
        require: importPath.replace("scss", "css"),
        import: importPath.replace("scss", "css")
      });
    }
  });
  packageJSON.exports = packageExports;
  await (0, _promises.writeFile)(packageJSONPath, JSON.stringify(packageJSON, (key, value) => {
    if (value instanceof Map) {
      return Object.fromEntries(new Map([...value].sort()));
    } else {
      return value;
    }
  }, 4) + "\n");
}