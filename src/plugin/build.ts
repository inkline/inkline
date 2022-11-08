import { UserOptions } from './types';
import { build as buildConfig } from '@inkline/config';
import { getResolvedConfiguration } from './config';

export async function build (options: UserOptions) {
    const { configFile, outputDir, extName } = getResolvedConfiguration(options);
    const manifest = true;

    await buildConfig({ configFile, outputDir, extName, manifest });
}
