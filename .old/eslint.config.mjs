import pluginInkline from "./tooling/eslint-config/index.mjs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default pluginInkline(__dirname).configs["default"];
