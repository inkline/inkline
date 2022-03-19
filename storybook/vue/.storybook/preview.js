import { light, dark } from './theme';
import '../../common/preview.scss';
import '../../../src/inkline.scss';
import { app } from '@storybook/vue3';
import { addons } from '@storybook/addons';
import { $inkline, Inkline } from '@inkline/inkline/plugin';

app.use(Inkline, {
    components: {}
});

addons.getChannel().on('DARK_MODE', (isDarkMode) => {
    if (!$inkline.prototype) {
        return;
    }

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
