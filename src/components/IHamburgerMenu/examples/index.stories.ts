import IHamburgerMenu from '../index.vue';
import {
    IHamburgerMenuAnimationExample,
    IHamburgerMenuBasicExample,
    IHamburgerMenuColorVariantsExample,
    IHamburgerMenuSizeVariantsExample
} from './index';
import { colorArgType, createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IHamburgerMenu,
    title: 'Components/HamburgerMenu',
    argTypes: {
        ...colorArgType(['light', 'dark'])
    }
};

export const Basic = createStory(IHamburgerMenuBasicExample);
export const Animation = () => IHamburgerMenuAnimationExample;
export const ColorVariants = () => IHamburgerMenuColorVariantsExample;
export const SizeVariants = () => IHamburgerMenuSizeVariantsExample;
