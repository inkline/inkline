import '../src/index.css';

import { Decorator, setup } from '@storybook/vue3';
import { DecoratorHelpers } from '@storybook/addon-themes';

import { markRaw, watch, ref } from 'vue';
import { light, dark } from './theme';

import {
    Inkline,
    components,
    useOptions,
    globalComponentsAddon,
    colorModeAddon,
    modalAddon,
    toastAddon
} from 'inkline';
import { RouterLink } from './mocks';

export const withInklineTheme = ({
    themes,
    defaultTheme
}: {
    themes: Record<string, string>;
    defaultTheme: string;
}) => {
    const currentTheme = ref(defaultTheme);
    const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

    initializeThemeState(Object.keys(themes), defaultTheme);

    const decorator: Decorator = (story, context) => {
        const selectedTheme = pluckThemeFromContext(context);
        const { themeOverride } = useThemeParameters();

        currentTheme.value = themeOverride || selectedTheme || defaultTheme;

        return {
            components: { story },
            setup() {
                const { options } = useOptions();

                options.value.colorMode.preference = currentTheme.value;
                watch(currentTheme, (theme) => {
                    options.value.colorMode.preference = theme;
                });

                return {};
            },
            template: `
                <story />`
        };
    };

    return decorator;
};

setup((app) => {
    app.use(Inkline, {
        addons: [colorModeAddon(), globalComponentsAddon(components), modalAddon(), toastAddon()],
        router: {
            component: markRaw(RouterLink)
        }
    });
});

export const decorators = [
    withInklineTheme({
        themes: {
            light: 'light-theme',
            dark: 'dark-theme'
        },
        defaultTheme: 'light'
    })
];

export const parameters = {
    actions: {},
    controls: {
        matchers: {
            date: /Date$/
        }
    },
    darkMode: {
        stylePreview: true,
        dark,
        light
    },
    docs: {
        source: {
            type: 'code'
        }
    }
};

export const tags = ['autodocs'];
