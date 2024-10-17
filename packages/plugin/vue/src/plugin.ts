import { Plugin, ref } from 'vue';
import { InklineOptionsKey } from './symbols';
import { InklineOptions, UserOptions } from '@inkline/types';
import defu from 'defu';

export const defaultOptions: InklineOptions = {
    components: {},
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
    routerComponent: 'RouterLink',
    addons: []
};

export function resolveOptions(userOptions: UserOptions): InklineOptions {
    return defu(userOptions, defaultOptions) as InklineOptions;
}

export const Inkline = {
    install: (app, options: UserOptions) => {
        const resolvedOptions = ref(resolveOptions(options));

        app.provide(InklineOptionsKey, resolvedOptions);

        resolvedOptions.value.addons.forEach((addon) => {
            addon(app, resolvedOptions);
        });
    }
} satisfies Plugin;
