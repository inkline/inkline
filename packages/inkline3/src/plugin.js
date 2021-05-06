import { reactive, watch } from 'vue'
import { InklineIcons } from '@inkline/icons';
import { addClass, removeClass } from "@inkline/inkline/src/helpers";
import { initialize as initializeForm } from "@inkline/inkline/src/validation";
import { setLocale } from '@inkline/inkline/src/i18n';

const defaultOptions = {
    colorMode: 'system',
    components: {},
    icons: {}
};

const colorModeLocalStorageKey = 'inkline-color-mode';
const handleColorMode = (colorMode) => {
    let color;
    if (colorMode === 'system') {
        color = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        color = colorMode;
    }

    removeClass(document.body, `-light -dark`);
    addClass(document.body, `-${color}`);
};

export const Inkline = {
    install(app, options = {}) {
        options = {
            ...defaultOptions,
            ...options
        };

        let colorMode = options.colorMode;

        /**
         * Register Inkline plugins
         */
        app.use(InklineIcons, options.icons);

        /**
         * Register components provided through options globally
         */

        for (const componentIndex in options.components) {
            app.component(options.components[componentIndex].name, options.components[componentIndex]);
        }

        /**
         * Get preferred theme based on selected color mode
         */

        if (typeof window !== 'undefined') {
            colorMode = window.localStorage.getItem(colorModeLocalStorageKey) || options.colorMode;
        }

        /**
         * Add $inkline global property
         */

        app.config.globalProperties.$inkline = {
            form(schema) {
                return initializeForm(schema);
            },
            setLocale(locale) {
                setLocale(locale);
            },
            options: reactive({
                locale: 'en',
                validateOn: ['input', 'blur'],
                colorMode,
            })
        };

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
            } else {
                darkModeMediaQuery.addListener(onDarkModeMediaQueryChange);
            }

            handleColorMode(colorMode);
        }
    }
};
