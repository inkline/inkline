import addons from '@storybook/addons';
import { app } from '@storybook/vue3';
import { light, dark } from './theme';
import { Inkline, components } from '../src/inkline';
import '../src/inkline.scss';
import './preview.scss';

app.use(Inkline, {
    components
});

addons.getChannel().on('DARK_MODE', (isDarkMode) => {
    app.config.globalProperties.$inkline.options.colorMode = isDarkMode ? 'dark' : 'light';
});

export const parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*'
    },
    controls: {
        matchers: {
            date: /Date$/
        }
    },
    darkMode: {
        stylePreview: true,
        dark,
        light
    }
};
