import pluginInkline from "@inkline/eslint-config";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    // @TODO Add support for linting
    // ...pluginInkline(__dirname).configs['default']
];

