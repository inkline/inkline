import IBadge from '../../index';
import {
    IBadgeBasicExample,
    IBadgeColorVariantsExample,
    IBadgeHeadingExample,
    IBadgeSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IBadge,
    title: 'Components/Badge',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(IBadgeBasicExample);
export const ColorVariants = createStory(IBadgeColorVariantsExample);
export const Heading = createStory(IBadgeHeadingExample);
export const SizeVariants = createStory(IBadgeSizeVariantsExample);
