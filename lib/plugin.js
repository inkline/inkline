import { reactive, watch } from 'vue';
import { addClass, removeClass } from './helpers';
import { initialize as initializeForm } from './validation';
import { setLocale } from './i18n';
import { InklineIcons } from '@inkline/icons';
/**
 * Default configuration options
 */
const defaultOptions = {
    components: {},
    icons: {},
    colorMode: 'system',
    locale: 'en',
    validateOn: ['input', 'blur'],
    color: '',
    size: '',
    componentOptions: {}
};
/**
 * Color mode localStorage key
 */
const colorModeLocalStorageKey = 'inkline-color-mode';
/**
 * Color mode change handler
 */
const handleColorMode = (colorMode) => {
    let color;
    if (colorMode === 'system') {
        color = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    else {
        color = colorMode;
    }
    removeClass(document.body, '-light -dark');
    addClass(document.body, `-${color}`);
};
/**
 * Easily accessible global Inkline object
 */
export const inklineGlobals = {
    prototype: undefined
};
/**
 * Inkline Vue.js plugin
 */
export const Inkline = {
    install(app, options = {}) {
        const extendedOptions = {
            ...defaultOptions,
            ...options,
        };
        let colorMode = extendedOptions.colorMode;
        /**
         * Register Inkline plugins
         */
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
            colorMode = window.localStorage.getItem(colorModeLocalStorageKey) || extendedOptions.colorMode;
        }
        /**
         * Add $inkline global property
         */
        const prototype = {
            form(schema) {
                return initializeForm(schema);
            },
            setLocale(locale) {
                setLocale(locale);
            },
            options: reactive({
                colorMode,
                locale: extendedOptions.locale,
                validateOn: extendedOptions.validateOn,
                color: extendedOptions.color,
                size: extendedOptions.size,
                componentOptions: extendedOptions.componentOptions
            })
        };
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
            watch(() => app.config.globalProperties.$inkline.options.colorMode, (colorMode) => {
                handleColorMode(colorMode);
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(colorModeLocalStorageKey, colorMode);
                }
            });
            /**
             * Add dark mode media query on change handler
             */
            const onDarkModeMediaQueryChange = (e) => {
                app.config.globalProperties.$inkline.options.prefersColorScheme = e.matches ? 'dark' : 'light';
                if (app.config.globalProperties.$inkline.options.colorMode === 'system') {
                    handleColorMode(app.config.globalProperties.$inkline.options.colorMode);
                }
            };
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkModeMediaQuery.addEventListener) {
                darkModeMediaQuery.addEventListener('change', onDarkModeMediaQueryChange);
            }
            else {
                darkModeMediaQuery.addListener(onDarkModeMediaQueryChange);
            }
            handleColorMode(colorMode);
        }
    }
};
//# sourceMappingURL=plugin.js.map