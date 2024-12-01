import { HamburgerMenu } from '@inkline/inkline/components/HamburgerMenu/index';
import {
    HamburgerMenuAnimationExample,
    HamburgerMenuBasicExample,
    HamburgerMenuColorVariantsExample,
    HamburgerMenuSizeVariantsExample
} from '@inkline/inkline/components/HamburgerMenu/examples/index';
import { colorArgType, createStory } from '@inkline/inkline/__storybook__';

export default {
    component: HamburgerMenu,
    title: 'Components/HamburgerMenu',
    argTypes: {
        ...colorArgType(['light', 'dark'])
    }
};

export const Basic = createStory(HamburgerMenuBasicExample);
export const Animation = () => HamburgerMenuAnimationExample;
export const ColorVariants = () => HamburgerMenuColorVariantsExample;
export const SizeVariants = () => HamburgerMenuSizeVariantsExample;
