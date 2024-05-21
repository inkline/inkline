import { UserOptions } from "./types";
import { build as buildConfig, getResolvedOptions } from "@inkline/config";
import { Logger } from "@grozav/logger";

export async function build(options: UserOptions, watch: boolean = false) {
    const { configFile, configExtName } = getResolvedOptions(options);

    if (watch && !options.silent) {
        Logger.success(`${configFile}${configExtName} changed, rebuilding...`);
    }

    await buildConfig(options);

    if (!watch && !options.silent) {
        Logger.success(`${configFile}${configExtName} built successfully...`);
    }
}
