import { Plugin, ref } from 'vue';
import { InklineOptionsKey } from './constants';
import { InklineOptions, UserOptions } from './types';
import { createColorModeHandler } from './plugins';
import defu from 'defu';

export const defaultOptions: InklineOptions = {
    props: {
        color: '',
        size: ''
    },
    propsByComponentName: {},
    colorMode: {
        preference: 'system',
        strategy: 'localStorage',
        renderMode: 'client'
    },
    routerComponent: 'RouterLink'
};

export function resolveOptions(userOptions: UserOptions): InklineOptions {
    return defu(userOptions, defaultOptions) as InklineOptions;
}

export const Inkline = {
    install: (app, options: UserOptions) => {
        const resolvedOptions = ref(resolveOptions(options));

        createColorModeHandler(resolvedOptions);

        app.provide(InklineOptionsKey, resolvedOptions);
    }
} satisfies Plugin;
