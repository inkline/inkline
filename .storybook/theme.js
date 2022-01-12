import { create } from '@storybook/theming';
import logoLight from '../public/assets/images/storybook-logo-light.png';
import logoDark from '../public/assets/images/storybook-logo-dark.png';

const commonConfig = {
    brandTitle: 'Inkline',
    brandUrl: 'https://inkline.io'
};

export const light = create({
    base: 'light',
    brandImage: logoLight,
    ...commonConfig
});

export const dark = create({
    base: 'dark',
    brandImage: logoDark,
    ...commonConfig
});
