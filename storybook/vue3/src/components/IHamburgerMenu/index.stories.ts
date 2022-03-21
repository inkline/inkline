import { IHamburgerMenu } from '@inkline/inkline/components';
import {
    IHamburgerMenuAnimationExample,
    IHamburgerMenuBasicExample,
    IHamburgerMenuColorVariantsExample
} from './index';
import { colorArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IHamburgerMenu,
    title: 'Components/HamburgerMenu',
    argTypes: {
        ...colorArgType(['light', 'dark'])
    }
};

export const Basic = createStory(IHamburgerMenuBasicExample);
export const Animation = createStory(IHamburgerMenuAnimationExample);
export const ColorVariants = createStory(IHamburgerMenuColorVariantsExample);
