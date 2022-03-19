import { light, dark } from './theme';
import '../../common/preview.scss';
import '../../../src/inkline.scss';
import { addons } from '@storybook/addons';
import { $inkline, Inkline } from '@inkline/inkline/plugin';

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

export const decorators = [
    (Story) => <Inkline><Story /></Inkline>
];
