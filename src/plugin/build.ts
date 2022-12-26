import { UserOptions } from "./types";
import { build as buildConfig, getResolvedOptions } from "@inkline/config";

export async function build(options: UserOptions) {
    const { configFile, outputDir, extName } = getResolvedOptions(options);
    const manifest = true;

    await buildConfig({ configFile, outputDir, extName, manifest });
}
