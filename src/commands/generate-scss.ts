import { build } from '@inkline/config';
import { Commands } from '../types';
import { Logger } from '@grozav/logger';

export async function generateSCSS (options: Commands.Generate.SCSS.Options) {
    try {
        const { config: configFile, ...configuration } = options;

        await build({
            ...configuration,
            configFile,
            extName: '.scss'
        });

        Logger.success(Commands.Generate.SCSS.messages.success);
    } catch (error) {
        Logger.error(Commands.Generate.SCSS.messages.error);
        Logger.log(error);
    }
}
