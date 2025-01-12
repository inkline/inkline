import * as chokidar from 'chokidar';
import { build } from './build';
import { exists, getResolvedBuildOptions } from '@inkline/config';
import { resolve } from 'path';
import { Logger } from '@inkline/logger';
import dependencyTree from 'dependency-tree';
import { PluginUserOptions } from './types';

/**
 * Create a watcher
 * The function will watch the resolved config file for changes and rebuild the configuration
 */
export function createWatcher(action: (options: PluginUserOptions) => Promise<void>) {
    return async (options: PluginUserOptions) => {
        const {
            configDir,
            configFile: configBaseName,
            configExtName
        } = getResolvedBuildOptions(options);

        const configFile = `${configBaseName}${configExtName}`;
        const configFilePath = resolve(configDir, configFile);

        if (!options.silent) {
            Logger.info(`Watching ${configFile} for changes...`);
        }

        const tsConfig = resolve(configDir, 'tsconfig.json');
        const tsConfigExists = await exists(tsConfig);

        const watchList = dependencyTree.toList({
            filename: configFilePath,
            directory: configDir,
            noTypeDefinitions: true,
            filter: (path) => path.indexOf('node_modules') === -1,
            ...(tsConfigExists ? { tsConfig } : {})
        });

        const watcher = chokidar.watch(watchList, {
            persistent: true
        });

        const watchFn = () => {
            if (!options.silent) {
                Logger.info(`${configFile} changed, rebuilding...`);
            }

            void action(options);
        };

        watcher.on('change', watchFn);
        await action(options);

        return watcher;
    };
}

export const watch = createWatcher(build);
