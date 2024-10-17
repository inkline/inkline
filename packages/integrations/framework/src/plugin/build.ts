import { UserOptions } from './types';
import { build as buildConfig, getResolvedBuildOptions } from '@inkline/config';
import { Logger } from '@inkline/utils';

export async function build(options: UserOptions, watch: boolean = false) {
    const { configFile, configExtName } = getResolvedBuildOptions(options);

    if (watch && !options.silent) {
        Logger.success(`${configFile}${configExtName} changed, rebuilding...`);
    }

    await buildConfig(options);

    if (!watch && !options.silent) {
        Logger.success(`${configFile}${configExtName} built successfully...`);
    }
}
