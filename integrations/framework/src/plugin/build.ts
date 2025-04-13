import { PluginUserOptions } from './types';
import { build as buildConfig, getResolvedBuildOptions } from '@inkline/config';
import { Logger } from '@inkline/logger';

export async function build(options: PluginUserOptions) {
    const { configFile, configExtName } = getResolvedBuildOptions(options);

    await buildConfig(options);

    if (!options.silent) {
        Logger.success(`${configFile}${configExtName} built successfully.`);
    }
}
