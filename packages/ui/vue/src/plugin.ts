import { Plugin, ref } from 'vue';
import { defaultIconDefinitions, defaultVariants } from './defaults';
import { InklineOptionsKey, InklineOptions, UserOptions } from '@inkline/types';
import defu from 'defu';

export const defaultOptions: InklineOptions = {
    components: {},
    colorMode: {},
    icons: {
        definitions: defaultIconDefinitions
    },
    toast: {},
    modal: {},
    router: {
        component: 'RouterLink'
    },
    validation: {
        validateOn: ['input', 'blur']
    },
    props: {
        color: '',
        size: ''
    },
    theme: {
        tailwindcss: false,
        prefix: '_',
        variants: defaultVariants
    },
    propsByComponentName: {},
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
