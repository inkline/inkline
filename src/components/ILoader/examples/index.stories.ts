import ILoader from '../index.vue';
import {
    ILoaderColorVariantsExample,
    ILoaderSizeAutoExample,
    ILoaderSizeVariantsExample,
    ILoaderTextExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ILoader,
    title: 'Components/Loader',
    argTypes: {
        ...colorArgType(['primary', 'light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: '<i-loader v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => ILoaderColorVariantsExample;
export const SizeAuto = () => ILoaderSizeAutoExample;
export const SizeVariants = () => ILoaderSizeVariantsExample;
export const Text = () => ILoaderTextExample;
