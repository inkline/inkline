import IHamburgerMenu from '../index.vue';
import IHamburgerMenuAnimationExample from './animation.vue';
import IHamburgerMenuBasicExample from './basic.vue';
import IHamburgerMenuColorVariantsExample from './color-variants.vue';
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
