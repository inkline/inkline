import { InjectionKey, Plugin } from "vue";
import * as inklineIcons from '@inkline/inkline/icons';
import { SvgNode } from '@inkline/inkline/types';

export const InklineIconsKey = Symbol('inklineIcons') as InjectionKey<Record<string, SvgNode>>;

export interface InklineIconsPluginOptions {
    icons: Record<string, SvgNode>;
}

export const IconsPlugin: Plugin = {
    install: (app, { icons }: InklineIconsPluginOptions) => {
        /**
         * Add $inklineIcons global provide
         */

        app.provide(InklineIconsKey, {
            ...inklineIcons,
            ...icons
        });
    }
};
