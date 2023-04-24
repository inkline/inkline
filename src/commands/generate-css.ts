import { build } from '@inkline/config';
import { Commands } from '../types';
import { Logger } from '@grozav/logger';

export async function generateCss(options: Commands.Generate.Css.Options) {
    try {
        const { config: configFile, ...configuration } = options;

        await build({
            ...configuration,
            configFile,
            extName: '.css'
        });

        Logger.success(Commands.Generate.Css.messages.success);
    } catch (error) {
        Logger.error(Commands.Generate.Css.messages.error);
        Logger.log(error);
    }
}
