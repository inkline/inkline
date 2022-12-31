/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, InjectionKey, Plugin, reactive, watch } from 'vue';
import { addClass, isKey, removeClass } from '@grozav/utils';
import { initialize as initializeForm } from '@inkline/inkline/validation';
import { setLocale } from '@inkline/inkline/i18n';
import * as inklineIcons from '@inkline/inkline/icons';
import { SvgNode } from '@inkline/inkline/types';
import { OverlayController } from '@inkline/inkline/controllers';

export interface InklineOptions {
    colorMode: 'system' | 'light' | 'dark' | string;
    colorModeStrategy: 'localStorage' | null;
    locale: string;
    validateOn: string[];
    routerComponent: any;
    color: string;
    size: string;
    componentOptions: any;

    [key: string]: any;
}

export interface InklinePluginOptions extends InklineOptions {
    components: any;
    icons: Record<string, SvgNode>;
    renderMode: 'client' | 'universal';
}

export interface InklineGlobal {
    form: (...args: any[]) => any;
    setLocale: (language: string) => any;
    options: InklineOptions;
}

/**
 * Color mode change handler
 */
export const onChangeColorMode = (colorMode: 'system' | 'light' | 'dark' | string) => {
    let color;
    if (colorMode === 'system') {
        color = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        color = colorMode;
    }

    removeClass(document.body, 'light-theme dark-theme');
    addClass(document.body, `${color}-theme`);
};

/**
 * Create inkline prototype
 */
export function createInklineGlobal({
    icons,
    components,
    ...options
}: InklinePluginOptions): InklineGlobal {
    return {
        form(schema) {
            return initializeForm(schema);
        },
        setLocale(locale) {
            setLocale(locale);
        },
        options: reactive(options)
    } as InklineGlobal;
}

/**
 * Color mode localStorage key
 */
export const colorModeLocalStorageKey = 'inkline-color-mode';

/**
 * Default configuration options
 */
export const defaultOptions: InklinePluginOptions = {
    components: {},
    icons: {},
    renderMode: 'client',

    colorMode: 'system',
    colorModeStrategy: 'localStorage',
    locale: 'en',
    validateOn: ['input', 'blur'],
    routerComponent: 'RouterLink',
    color: '',
    size: '',
    componentOptions: {}
};

export const InklineKey = Symbol('inkline') as InjectionKey<InklineGlobal>;
export const InklineIconsKey = Symbol('inklineIcons') as InjectionKey<Record<string, SvgNode>>;

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

        const inklineGlobals = createInklineGlobal(extendedOptions);

        app.config.globalProperties.$inkline = inklineGlobals;
        app.provide(InklineKey, inklineGlobals);

        /**
         * Add $inklineIcons global provide
         */

        app.provide(InklineIconsKey, {
            ...inklineIcons,
            ...icons
        });

        if (typeof window !== 'undefined') {
            /**
             * Add global key bindings
             */

            window.addEventListener('keydown', (e) => {
                if (isKey('esc', e)) {
                    /**
                     * Handle `esc` key when a modal is shown
                     */
                    OverlayController.onPressEscape();
                }
            });

            /**
             * Add color mode on change handler
             */

            const onDarkModeMediaQueryChange = () => {
                if (inklineGlobals.options.colorMode === 'system') {
                    onChangeColorMode(inklineGlobals.options.colorMode);
                }
            };

            const darkModeMediaQuery: MediaQueryList = matchMedia('(prefers-color-scheme: dark)');
            if (darkModeMediaQuery.addEventListener) {
                darkModeMediaQuery.addEventListener('change', onDarkModeMediaQueryChange);
            } else {
                darkModeMediaQuery.addListener(onDarkModeMediaQueryChange);
            }

            watch(
                () => inklineGlobals.options.colorMode,
                (colorMode) => {
                    onChangeColorMode(colorMode);

                    if (inklineGlobals.options.colorModeStrategy === 'localStorage') {
                        localStorage.setItem(colorModeLocalStorageKey, colorMode);
                    }
                }
            );

            /**
             * Get preferred theme based on selected color mode
             */

            if (
                inklineGlobals.options.colorModeStrategy === 'localStorage' &&
                renderMode === 'client'
            ) {
                const storedColorMode = localStorage.getItem(colorModeLocalStorageKey);
                if (storedColorMode) {
                    inklineGlobals.options.colorMode = storedColorMode;
                }
            } else {
                onChangeColorMode(inklineGlobals.options.colorMode);
            }

            /**
             * Add inkline class to document body and initialize color mode
             */

            addClass(document.body, 'inkline');
        }
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $inkline: InklineGlobal;
    }
}
