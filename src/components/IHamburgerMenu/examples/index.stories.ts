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
    setup: () => ({ args }),
    template: `<i-hamburger-menu v-bind="args">
        HamburgerMenu
    </i-hamburger-menu>`,
});

export const Component = Template.bind({});

export const Animation = () => IHamburgerMenuAnimationExample;
export const Basic = () => IHamburgerMenuBasicExample;
export const ColorVariants = () => IHamburgerMenuColorVariantsExample;
            