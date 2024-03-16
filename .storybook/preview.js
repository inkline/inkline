import { addons } from '@storybook/manager-api';
import { setup } from '@storybook/vue3';
import { markRaw } from 'vue';
import { light, dark } from './theme';
import { Inkline, components } from '../src/inkline';
import '../src/inkline.scss';
import './preview.scss';
import { withThemeByClassName } from '@storybook/addon-themes';
import { RouterLink } from './components';

setup((app) => {
    app.use(Inkline, {
        components,
        routerComponent: markRaw(RouterLink)
    });
});

export const decorators = [
    withThemeByClassName({
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
