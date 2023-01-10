import { build } from '@inkline/config';
import { Commands } from '../types';
import { Logger } from '@grozav/logger';

export async function generateScss(options: Commands.Generate.Scss.Options) {
    try {
        const { config: configFile, ...configuration } = options;

        await build({
            ...configuration,
            configFile,
            extName: '.scss'
        });

        Logger.success(Commands.Generate.Scss.messages.success);
    } catch (error) {
        Logger.error(Commands.Generate.Scss.messages.error);
        Logger.log(error);
    }
}
