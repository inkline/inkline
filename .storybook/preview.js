import { setup } from '@storybook/vue3';
import { markRaw, watch, ref } from 'vue';
import { light, dark } from './theme';
import { Inkline, components } from '../src/inkline';
import '../src/inkline.scss';
import './preview.scss';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { RouterLink } from './components';
import { useInkline } from '../lib/composables/useInkline';

export const withInklineTheme = ({ themes, defaultTheme }) => {
    const currentTheme = ref(defaultTheme);
    const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

    initializeThemeState(Object.keys(themes), defaultTheme);

    return (story, context) => {
        const selectedTheme = pluckThemeFromContext(context);
        const { themeOverride } = useThemeParameters();

        currentTheme.value = themeOverride || selectedTheme || defaultTheme;

        return {
            components: { story },
            setup() {
                const inkline = useInkline();

                inkline.options.colorMode = currentTheme.value;
                watch(currentTheme, (theme) => {
                    inkline.options.colorMode = theme;
                });

                return {};
            },
            template: `<story />`
        };
    };
};

setup((app) => {
    app.use(Inkline, {
        components,
        routerComponent: markRaw(RouterLink)
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
