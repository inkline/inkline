import IHeader from '../index.vue';
import {
    IHeaderBasicExample,
    IHeaderColorVariantsExample,
    IHeaderCoverExample,
    IHeaderFullscreenExample,
    IHeaderSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IHeader,
    title: 'Components/Header',
    argTypes: {
        ...colorArgType(['light', 'dark', 'primary']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IHeaderBasicExample
    },
    setup: () => ({ args }),
    template: '<IHeaderBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => IHeaderColorVariantsExample;
export const Cover = () => IHeaderCoverExample;
export const Fullscreen = () => IHeaderFullscreenExample;
export const SizeVariants = () => IHeaderSizeVariantsExample;
