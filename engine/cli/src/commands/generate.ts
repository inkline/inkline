import { build } from '@inkline/loader';
import { Logger } from '@inkline/logger';
import { GenerateCommandOptions } from "../types";

export async function generate(options: GenerateCommandOptions) {
    try {
        const { config: configFile, ...configuration } = options;

        await build({
            ...configuration,
            configFile
        });

        Logger.success('Files generated successfully.');
    } catch (error) {
        Logger.error('An unexpected error occurred.');
        Logger.log(error);
    }
}
