import type { Plugin } from 'vue';
import type { SvgNode } from '@inkline/inkline/types';
import * as inklineIcons from '@inkline/inkline/icons';
import { InklineIconsKey } from '@inkline/inkline';

export interface InklineIconsPluginOptions {
    icons: Record<string, SvgNode>;
}

export const IconsPlugin: Plugin = {
    install: (app, { icons }: InklineIconsPluginOptions = { icons: {} }) => {
        /**
         * Add $inklineIcons global provide
         */

        app.provide(InklineIconsKey, {
            ...inklineIcons,
            ...icons
        });
    }
};
