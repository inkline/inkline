import React from 'react';
import { light, dark } from './theme';
import '../src/inkline.scss';
import './preview.scss';
import { InklineProvider } from "@inkline/inkline/plugins/react";
import {app} from "@storybook/vue3";
import { Inkline } from "@inkline/inkline/plugin";

const framework = process.env.FRAMEWORK || 'vue';

if (framework === 'vue') {
    app.use(Inkline, {
        components
    });
}

// @TODO
// addons.getChannel().on('DARK_MODE', (isDarkMode) => {
//     app.config.globalProperties.$inkline.options.colorMode = isDarkMode ? 'dark' : 'light';
// });

export const decorators = framework === 'vue' ? [] : [
    (Story) => <Inkline>
        <Story />
    </Inkline>
]

export const parameters = {
    actions: {
        argTypesRegex: "^on[A-Z].*"
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
