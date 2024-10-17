import { UserOptions } from './types';
import * as chokidar from 'chokidar';
import { build } from './build';
import { exists, getResolvedBuildOptions } from '@inkline/config';
import { resolve } from 'path';
import { Logger } from '@inkline/utils';
import dependencyTree from 'dependency-tree';

/**
 * Watch config file for changes and rebuild
 */
export async function watch(options: UserOptions) {
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
        void build(options, true);
    };

    watcher.on('change', watchFn);
    await build(options);

    return watcher;
}
