import IBadge from '../index';
import {
    IBadgeBasicExample
    // IBadgeColorVariantsExample,
    // IBadgeHeadingExample,
    // IBadgeSizeVariantsExample
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
// export const ColorVariants = () => IBadgeColorVariantsExample;
// export const Heading = () => IBadgeHeadingExample;
// export const SizeVariants = () => IBadgeSizeVariantsExample;
