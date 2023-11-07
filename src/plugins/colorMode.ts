import type { Plugin } from 'vue';
import { watch } from 'vue';
import { addClass, removeClass } from '@grozav/utils';
import type { InklineService } from '@inkline/inkline/plugin';

export interface InklineColorModeOptions {
    colorMode: 'system' | 'light' | 'dark' | string;
    colorModeStrategy: 'localStorage' | null;
}

export interface InklineColorModePluginOptions {
    inkline: InklineService;
    renderMode: 'client' | 'universal';
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
 * Color mode localStorage key
 */
export const colorModeLocalStorageKey = 'inkline-color-mode';

export const ColorModePlugin: Plugin = {
    install: (app, { inkline, renderMode }: InklineColorModePluginOptions) => {
        if (typeof window !== 'undefined') {
            /**
             * Add color mode on change handler
             */

            const onDarkModeMediaQueryChange = () => {
                if (inkline.options.colorMode === 'system') {
                    onChangeColorMode(inkline.options.colorMode);
                }
            };

            const darkModeMediaQuery: MediaQueryList = matchMedia('(prefers-color-scheme: dark)');
            if (darkModeMediaQuery.addEventListener) {
                darkModeMediaQuery.addEventListener('change', onDarkModeMediaQueryChange);
            } else {
                darkModeMediaQuery.addListener(onDarkModeMediaQueryChange);
            }

            watch(
                () => inkline.options.colorMode,
                (colorMode) => {
                    onChangeColorMode(colorMode);

                    if (inkline.options.colorModeStrategy === 'localStorage') {
                        localStorage.setItem(colorModeLocalStorageKey, colorMode);
                    }
                }
            );

            /**
             * Get preferred theme based on selected color mode
             */

            if (inkline.options.colorModeStrategy === 'localStorage' && renderMode === 'client') {
                const storedColorMode = localStorage.getItem(colorModeLocalStorageKey);
                if (storedColorMode) {
                    inkline.options.colorMode = storedColorMode;
                }
            } else {
                onChangeColorMode(inkline.options.colorMode);
            }
        }
    }
};
