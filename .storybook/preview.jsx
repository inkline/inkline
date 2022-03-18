import { light, dark } from './theme';
import '../src/inkline.scss';
import './preview.scss';
import { app } from '@storybook/vue3';
import { addons } from '@storybook/addons';
import { $inkline, Inkline } from '@inkline/inkline/plugin';

const framework = import.meta.env.VITE_FRAMEWORK;
const decorators = [];

if (framework === 'vue') {
    app.use(Inkline, {
        components: {}
    });
} else if (framework === 'react') {
    decorators.push((Story) => <Inkline><Story /></Inkline>);
}

addons.getChannel().on('DARK_MODE', (isDarkMode) => {
    $inkline.prototype.options.value = {
        ...$inkline.prototype.options.value,
        colorMode: isDarkMode ? 'dark' : 'light'
    };
});

export const parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*'
    },
    controls: {
        matchers: {
            date: /Date$/,
        },
    },
    darkMode: {
        stylePreview: true,
        dark,
        light
    }
}

export { decorators };
