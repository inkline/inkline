"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postbuild = postbuild;
var _shelljs = _interopRequireDefault(require("shelljs"));
var _path = _interopRequireDefault(require("path"));
var _fastGlob = _interopRequireDefault(require("fast-glob"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function postbuild(baseDir) {
  const srcDir = _path.default.resolve(baseDir, "src");
  _shelljs.default.cd(baseDir);
  const scssFiles = await (0, _fastGlob.default)(_path.default.resolve(srcDir, "**/*.scss"));
  scssFiles.forEach(file => {
    const destFile = file.replace("src", "lib");
    const destDir = _path.default.dirname(destFile);
    if (!_shelljs.default.test("-d", destDir)) {
      _shelljs.default.mkdir("-p", destDir);
    }
    _shelljs.default.cp(file, destFile);
  });
}