import type { Plugin } from 'vue';
import { reactive } from 'vue';
import { addClass } from '@grozav/utils';
import { createSchema } from '@inkline/inkline/validation';
import { setLocale } from '@inkline/inkline/i18n';
import {
    ColorModePlugin,
    IconsPlugin,
    ModalPlugin,
    OverlayPlugin,
    ToastPlugin
} from '@inkline/inkline/plugins';
import type {
    InklineColorModeOptions,
    InklineModalOptions,
    InklineToastOptions,
    InklineIconsPluginOptions
} from '@inkline/inkline/plugins';
import { InklineKey } from '@inkline/inkline/constants';
import type { Form, FormSchema } from '@inkline/inkline/types';

export interface InklineOptions
    extends InklineColorModeOptions,
        InklineToastOptions,
        InklineModalOptions {
    locale: string;
    validateOn: string[];
    routerComponent: any;
    color: string;
    size: string;
    componentOptions: any;

    [key: string]: any;
}

export interface InklinePluginOptions extends InklineOptions, InklineIconsPluginOptions {
    components: any;
    renderMode: 'client' | 'universal';
}

export interface InklineService {
    form: (...args: any[]) => any;
    setLocale: (language: string) => any;
    options: InklineOptions;
}

/**
 * Create inkline prototype
 */
export function createInklineService({
    icons, // eslint-disable-line @typescript-eslint/no-unused-vars
    components, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...options
}: InklinePluginOptions): InklineService {
    return {
        form<T extends Form = Form>(schema: FormSchema<T>) {
            return createSchema<T>(schema);
        },
        setLocale(locale) {
            setLocale(locale);
        },
        options: reactive(options)
    };
}

/**
 * Default configuration options
 */
export const defaultOptions: InklinePluginOptions = {
    color: '',
    colorMode: 'system',
    colorModeStrategy: 'localStorage',
    components: {},
    componentOptions: {},
    icons: {},
    locale: 'en',
    renderMode: 'client',
    routerComponent: 'RouterLink',
    size: '',
    validateOn: ['input', 'blur'],
    toast: {
        position: 'bottom-right',
        duration: 3500
    },
    modal: {}
};

/**
 * Inkline Vue.js plugin
 */
export const Inkline: Plugin = {
    install(app, options: Partial<InklineOptions> = {}) {
        const { components, icons, renderMode, ...overrideOptions } = options;
        const extendedOptions = {
            ...defaultOptions,
            ...overrideOptions
        };

        /**
         * Register components provided through options globally
         */

        for (const componentIndex in components) {
            app.component(componentIndex, components[componentIndex]);
        }

        /**
         * Add $inkline global property
         */

        const inklineService = createInklineService(extendedOptions);

        app.config.globalProperties.$inkline = inklineService;
        app.provide(InklineKey, inklineService);

        if (typeof window !== 'undefined') {
            /**
             * Add inkline class to document body and initialize color mode
             */

            addClass(document.body, 'inkline');
        }

        /**
         * Add additional Inkline plugins
         */

        app.use(ColorModePlugin, { inkline: inklineService, renderMode });
        app.use(IconsPlugin, { icons });
        app.use(ModalPlugin, { inkline: inklineService });
        app.use(OverlayPlugin);
        app.use(ToastPlugin, { inkline: inklineService });
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $inkline: InklineService;
    }
}
