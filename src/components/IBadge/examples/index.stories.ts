import IBadge from '../index.vue';
import {
    IBadgeBasicExample,
    IBadgeColorVariantsExample,
    IBadgeHeadingExample,
    IBadgeSizeVariantsExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IBadge,
    title: 'Components/Badge',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(IBadgeBasicExample);
export const ColorVariants = () => IBadgeColorVariantsExample;
export const Heading = () => IBadgeHeadingExample;
export const SizeVariants = () => IBadgeSizeVariantsExample;
