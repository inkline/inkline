import { getIndent } from './getIndent';
import { DevEnv, InitEnv } from '../types';

export function getPluginCjsPreamble(lines: string[], devEnv: DevEnv, env: InitEnv) {
    const indent = getIndent(lines);
    const outputDir = `${env.hasSrcDir ? 'src/' : ''}css/variables`;
    const hasPathRequire = lines.some((line) => /require\(['"]path['"]\)/.test(line));

    return `${hasPathRequire ? '' : `const path = require('path');\n`}

const inklineConfig = {
${indent}outputDir: path.resolve(__dirname, '${outputDir}')
};
`.split('\n');
}

export function getPluginTsPreamble(lines: string[], devEnv: DevEnv, env: InitEnv) {
    const indent = getIndent(lines);
    const outputDir = `${env.hasSrcDir ? 'src/' : ''}css/variables`;
    const hasPathImport = lines.some((line) => /from ['"]path['"]/.test(line));

    return `${
        hasPathImport ? '' : `import * as path from 'path';\n`
    }import { UserOptions } from '@inkline/plugin/types';

const inklineConfig: UserOptions = {
${indent}outputDir: path.resolve(__dirname, '${outputDir}')
};
`.split('\n');
}
