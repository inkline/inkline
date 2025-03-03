import { create } from '@storybook/theming';

const commonConfig = {
    brandTitle: 'Inkline',
    brandUrl: 'https://inkline.io'
};

export const light = create({
    base: 'light',
    brandImage: '/images/storybook-logo-light.png',
    ...commonConfig
});

export const dark = create({
    base: 'dark',
    brandImage: '/images/storybook-logo-dark.png',
    ...commonConfig
});
