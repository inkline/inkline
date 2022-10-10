/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin, reactive, watch } from 'vue';
import { addClass, removeClass } from '@inkline/inkline/helpers';
import { initialize as initializeForm } from '@inkline/inkline/validation';
import { setLocale } from '@inkline/inkline/i18n';
import * as inklineIcons from '@inkline/inkline/icons';
import { SvgNode } from '@inkline/inkline/types';

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
    icons: Record<string, SvgNode>
}

export interface Prototype {
    form: (...args: any[]) => any;
    setLocale: (language: string) => any;
    options: PrototypeConfig;
}

export interface InklineGlobals {
    prototype?: Prototype;
    icons?: Record<string, SvgNode>;
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
    prototype: undefined,
    icons: undefined
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
         * Register components provided through options globally
         */

        for (const componentIndex in extendedOptions.components) { // eslint-disable-line guard-for-in
            app.component(extendedOptions.components[componentIndex].name, extendedOptions.components[componentIndex]);
        }

        /**
         * Get preferred theme based on selected color mode
         */

        if (typeof window !== 'undefined') {
            const storedColorMode = localStorage.getItem(colorModeLocalStorageKey);
            if (storedColorMode) {
                extendedOptions.colorMode = storedColorMode;
            }
        }

        /**
         * Add $inkline global property
         */

        const prototype: Prototype = createPrototype(extendedOptions);

        inklineGlobals.prototype = prototype;
        app.config.globalProperties.$inkline = prototype;
        app.provide('inkline', prototype);

        /**
         * Add inklineIcons global provide
         */

        const icons: Record<string, SvgNode> = {
            ...inklineIcons,
            ...extendedOptions.icons
        };

        app.provide('inklineIcons', icons);

        if (typeof window !== 'undefined') {
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

            const onDarkModeMediaQueryChange = () => {
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

            /**
             * Add inkline class to document body and initialize color mode
             */

            addClass(document.body, 'inkline');
            handleColorMode(extendedOptions.colorMode);
        }
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $inkline: Prototype
    }
}
