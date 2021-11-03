import ILoader from '../index.vue';
import {
    ILoaderColorVariantsExample,
    ILoaderSizeAutoExample,
    ILoaderSizeVariantsExample,
    ILoaderTextExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ILoader,
    title: 'Components/Loader',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-loader v-bind="args">
        Loader
    </i-loader>`,
});

export const Component = Template.bind({});

export const ColorVariants = () => ILoaderColorVariantsExample;
export const SizeAuto = () => ILoaderSizeAutoExample;
export const SizeVariants = () => ILoaderSizeVariantsExample;
export const Text = () => ILoaderTextExample;
            