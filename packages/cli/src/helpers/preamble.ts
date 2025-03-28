import { DevEnv, InitEnv } from '../types';

export function getPluginCjsPreamble(_code: string, _devEnv: DevEnv, env: InitEnv) {
    const outputDir = `${env.hasSrcDir ? 'src/' : ''}css/variables`;

    return `
const inklineConfig = {
    outputDir: '${outputDir}'
};
`;
}

export function getPluginPreamble(_code: string, devEnv: DevEnv, env: InitEnv) {
    const outputDir = `${env.hasSrcDir ? 'src/' : ''}css/variables`;
    const isTypescript = devEnv.configFile.endsWith('.ts');

    return `${isTypescript ? `import type { UserOptions } from '@inkline/plugin';\n` : ''}
const inklineConfig${isTypescript ? `: UserOptions` : ''} = {
    outputDir: '${outputDir}'
};
`;
}
