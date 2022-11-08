import { UserOptions } from './types';
import { resolve } from 'pathe';
import { DEFAULT_CONFIG_FILE } from './constants';
import { DEFAULT_OUTPUT_DIR, DEFAULT_OUTPUT_EXTNAME } from '@inkline/config';

export function getResolvedConfiguration (options: UserOptions): UserOptions {
    const configFile = options.configFile || resolve(process.cwd(), DEFAULT_CONFIG_FILE);
    const outputDir = options.outputDir || resolve(process.cwd(), DEFAULT_OUTPUT_DIR);
    const extName = options.extName || DEFAULT_OUTPUT_EXTNAME;

    return { configFile, outputDir, extName };
}
