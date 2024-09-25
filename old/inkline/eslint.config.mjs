import pluginInkline from "@inkline/eslint-config";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    ...pluginInkline(__dirname).configs['vue'],
    {
        files: ['src/stories/**/*.vue', 'src/**/examples/*.vue'],
        rules: {
            'vue/multi-word-component-names': 'off',
        }
    }
];
