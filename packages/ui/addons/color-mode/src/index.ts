import { watch } from 'vue';
import { addClass, removeClass } from '@inkline/utils';
import { InklineAddon, InklineOptions } from '@inkline/types';
import { defaultColorModeAddonOptions } from './constants';

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

    removeClass(document.documentElement, 'light-theme dark-theme');
    addClass(document.documentElement, `${color}-theme`);
};

/**
 * Color mode localStorage key
 */
export const colorModeLocalStorageKey = 'inkline-color-mode';

export function colorModeAddon(addonOptions?: InklineOptions['colorMode']): InklineAddon {
    return (_app, options) => {
        if (typeof window === 'undefined') return;

        options.value.colorMode = {
            ...defaultColorModeAddonOptions,
            ...options.value.colorMode,
            ...addonOptions
        };

        /**
         * Add color mode on change handler
         */

        const onDarkModeMediaQueryChange = () => {
            if (options.value.colorMode?.preference === 'system') {
                onChangeColorMode(options.value.colorMode.preference);
            }
        };

        const darkModeMediaQuery: MediaQueryList = matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.addEventListener) {
            darkModeMediaQuery.addEventListener('change', onDarkModeMediaQueryChange);
        } else {
            darkModeMediaQuery.addListener(onDarkModeMediaQueryChange);
        }

        watch(
            () => options.value.colorMode.preference,
            (preference) => {
                if (!preference) return;

                onChangeColorMode(preference);

                if (options.value.colorMode.strategy === 'localStorage') {
                    localStorage.setItem(
                        colorModeLocalStorageKey,
                        options.value.colorMode?.strategy
                    );
                }
            }
        );

        /**
         * Get preferred theme based on selected color mode
         */

        if (
            options.value.colorMode.strategy === 'localStorage' &&
            options.value.colorMode.renderMode === 'client'
        ) {
            const storedColorMode = localStorage.getItem(colorModeLocalStorageKey);
            if (storedColorMode) {
                options.value.colorMode.preference = storedColorMode;
            }
        }

        onChangeColorMode(options.value.colorMode.preference ?? 'system');
    };
}

export default colorModeAddon;
