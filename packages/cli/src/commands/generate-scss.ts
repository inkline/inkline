import { build } from '@inkline/config';
import { Logger } from '@inkline/utils';
import { Commands } from '../types';

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
