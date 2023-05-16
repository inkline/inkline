import { UserOptions } from "./types";
import * as chokidar from "chokidar";
import { build } from "./build";
import { getResolvedOptions } from "@inkline/config";
import { resolve } from "path";
import { Logger } from "@grozav/logger";

/**
 * Watch config file for changes and rebuild
 */
export async function watch(options: UserOptions) {
    const { configDir, configFile, configExtName } =
        getResolvedOptions(options);

    if (!options.silent) {
        Logger.info(`Watching ${configFile}${configExtName} for changes...`);
    }

    const watcher = chokidar.watch(
        resolve(configDir, `${configFile}${configExtName}`),
        {
            persistent: true,
        }
    );

    const watchFn = async () => {
        await build(options, true);
    };

    watcher.on("change", watchFn);
    await build(options);

    return watcher;
}
