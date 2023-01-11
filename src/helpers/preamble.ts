import { DevEnv, InitEnv } from '../types';

export function getPluginCjsPreamble(lines: string[], devEnv: DevEnv, env: InitEnv) {
    const outputDir = `${env.hasSrcDir ? 'src/' : ''}css/variables`;
    const hasPathRequire = lines.some((line) => /require\(['"]path['"]\)/.test(line));

    return `${hasPathRequire ? '' : `const path = require('path');\n`}

const inklineConfig = {
    outputDir: path.resolve(__dirname, '${outputDir}')
};
`.split('\n');
}

export function getPluginPreamble(lines: string[], devEnv: DevEnv, env: InitEnv) {
    const outputDir = `${env.hasSrcDir ? 'src/' : ''}css/variables`;
    const hasPathImport = lines.some((line) => /from ['"]path['"]/.test(line));
    const isTypescript = devEnv.configFile.endsWith('.ts');

    return `${hasPathImport ? '' : `import * as path from 'path';\n`}${
        isTypescript ? `import type { UserOptions } from '@inkline/plugin';\n` : ''
    }
const inklineConfig${isTypescript ? `: UserOptions` : ''} = {
    outputDir: path.resolve(__dirname, '${outputDir}')
};
`.split('\n');
}