import IHamburgerMenu from '../index.vue';
import {
    IHamburgerMenuAnimationExample,
    IHamburgerMenuBasicExample,
    IHamburgerMenuColorVariantsExample
} from './index';
import { colorArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IHamburgerMenu,
    title: 'Components/HamburgerMenu',
    argTypes: {
        ...colorArgType(['light', 'dark'])
    }
};

const Template = (args: any) => ({
    components: {
        IHamburgerMenuBasicExample
    },
    setup: () => ({ args }),
    template: '<IHamburgerMenuBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const Animation = () => IHamburgerMenuAnimationExample;
export const ColorVariants = () => IHamburgerMenuColorVariantsExample;
