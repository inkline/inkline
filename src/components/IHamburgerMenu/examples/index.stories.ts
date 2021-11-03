import IHamburgerMenu from '../index.vue';
import {
    IHamburgerMenuAnimationExample,
    IHamburgerMenuBasicExample,
    IHamburgerMenuColorVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IHamburgerMenu,
    title: 'Components/HamburgerMenu',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IHamburgerMenuBasicExample
    },
    setup: () => ({ args }),
    template: '<IHamburgerMenuBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Animation = () => IHamburgerMenuAnimationExample;
export const ColorVariants = () => IHamburgerMenuColorVariantsExample;
