// #! /usr/bin/env node
"use strict";

var _chalk = _interopRequireDefault(require("chalk"));
var _commander = require("commander");
var _watch = require("./watch");
var _generate = require("./generate");
var _resolve = require("./resolve");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_commander.program.name(_chalk.default.blue("@inkline/build"));
_commander.program.command("watch").option("-s, --script <script>", 'The script to run when changes are detected. Defaults to "build"').description("Watch for changes in the configuration file and generate files accordingly.").action(async options => {
  await (0, _watch.watch)(process.cwd(), options.script);
});
_commander.program.command("generate:exports").description("Generate exports for the package.").action(async () => {
  await (0, _generate.generateExports)(process.cwd());
});
_commander.program.command("resolve:imports").description("Resolve imports for the package.").action(async () => {
  const baseDir = process.cwd();
  const tsconfig = (0, _resolve.loadTsconfig)(baseDir, "tsconfig.json");
  await (0, _resolve.resolveImports)(baseDir, tsconfig);
});
_commander.program.parse();