import { UserOptions } from './types';
import { build } from '@inkline/config';
import * as chokidar from 'chokidar';

/**
 * Watch config file for changes and rebuild
 */
export async function watch ({ configFile, outputDir, extName }: UserOptions) {
    const watcher = chokidar.watch(configFile, {
        persistent: true
    });

    const watchFn = async () => {
        await build({ configFile, outputDir, extName });
    };

    watcher
        .on('add', watchFn)
        .on('change', watchFn);

    return watcher;
}
