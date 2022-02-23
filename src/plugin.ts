/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin, reactive, watch } from 'vue';
import { addClass, removeClass } from '@inkline/inkline/helpers';
import { initialize as initializeForm } from '@inkline/inkline/validation';
import { setLocale } from '@inkline/inkline/i18n';
import { InklineIcons } from '@inkline/icons';
import * as inklineIconsPack from '@inkline/icons/packs/inkline';

export interface PrototypeConfig {
    colorMode: 'system' | 'light' | 'dark' | string;
    locale: string;
    validateOn: string[];
    routerComponent: string;
    color: string;
    size: string;
    componentOptions: any;

    [key: string]: any;
}

export interface PluginConfig extends PrototypeConfig {
    components: any;
    icons: any;
}

export interface Prototype {
    form: (...args: any[]) => any;
    setLocale: (language: string) => any;
    options: PrototypeConfig;
}

export interface InklineGlobals {
    prototype?: Prototype
}

/**
 * Color mode localStorage key
 */
export const colorModeLocalStorageKey = 'inkline-color-mode';

/**
 * Color mode change handler
 */
export const handleColorMode = (colorMode: string) => {
    let color;
    if (colorMode === 'system') {
        color = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        color = colorMode;
    }

    removeClass(document.body, '-light -dark');
    addClass(document.body, `-${color}`);
};

/**
 * Default configuration options
 */
export const defaultOptions: PluginConfig = {
    components: {},
    icons: {},
    colorMode: 'system',
    locale: 'en',
    validateOn: ['input', 'blur'],
    color: '',
    size: '',
    routerComponent: 'router-link',
    componentOptions: {}
};

/**
 * Create inkline prototype
 */
export function createPrototype ({ icons, components, ...options }: PrototypeConfig): Prototype {
    return {
        form (schema) {
            return initializeForm(schema);
        },
        setLocale (locale) {
            setLocale(locale);
        },
        options: reactive(options)
    } as Prototype;
}

/**
 * Easily accessible global Inkline object
 */
export const inklineGlobals: InklineGlobals = {
    prototype: undefined
};

/**
 * Inkline Vue.js plugin
 */
export const Inkline: Plugin = {
    install (app, options: Partial<PrototypeConfig> = {}) {
        const extendedOptions: PluginConfig = {
            ...defaultOptions,
            ...options
        };

        /**
         * Register Inkline plugins
         */

        InklineIcons.add(inklineIconsPack);
        InklineIcons.add(extendedOptions.icons);

        app.use(InklineIcons, {
            registerComponent: false
        });

        /**
         * Register components provided through options globally
         */

        for (const componentIndex in extendedOptions.components) { // eslint-disable-line guard-for-in
            app.component(extendedOptions.components[componentIndex].name, extendedOptions.components[componentIndex]);
        }

        /**
         * Get preferred theme based on selected color mode
         */

        if (typeof window !== 'undefined') {
            extendedOptions.colorMode = localStorage.getItem(colorModeLocalStorageKey) || extendedOptions.colorMode;
        }

        /**
         * Add $inkline global property
         */

        const prototype: Prototype = createPrototype(extendedOptions);

        app.config.globalProperties.$inkline = prototype;
        app.provide('inkline', prototype);

        inklineGlobals.prototype = prototype;

        if (typeof window !== 'undefined') {
            /**
             * Add inkline class to document body and initialize color mode
             */

            addClass(document.body, 'inkline');

            /**
             * Add color mode on change handler
             */

            watch(() => prototype.options.colorMode, (colorMode) => {
                handleColorMode(colorMode as string);

                localStorage.setItem(colorModeLocalStorageKey, colorMode as string);
            });

            /**
             * Add dark mode media query on change handler
             */

            const onDarkModeMediaQueryChange = (e: MediaQueryListEvent) => {
                prototype.options.prefersColorScheme = e.matches ? 'dark' : 'light';

                if (prototype.options.colorMode === 'system') {
                    handleColorMode(prototype.options.colorMode);
                }
            };

            const darkModeMediaQuery: MediaQueryList = matchMedia('(prefers-color-scheme: dark)');
            if (darkModeMediaQuery.addEventListener) {
                darkModeMediaQuery.addEventListener('change', onDarkModeMediaQueryChange);
            } else {
                darkModeMediaQuery.addListener(onDarkModeMediaQueryChange);
            }

            handleColorMode(extendedOptions.colorMode);
        }
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $inkline: Prototype
    }
}
