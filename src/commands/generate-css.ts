import { build } from '@inkline/config';
import { Commands } from '../types';
import { Logger } from '@grozav/logger';

export async function generateCSS (options: Commands.Generate.CSS.Options) {
    try {
        const { config: configFile, ...configuration } = options;

        await build({
            configFile,
            ...configuration
        });

        Logger.success(Commands.Generate.CSS.messages.success);
    } catch (error) {
        Logger.error(Commands.Generate.CSS.messages.error);
        Logger.log(error);
    }
}
