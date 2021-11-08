import IBadge from '../index.vue';
import {
    IBadgeBasicExample,
    IBadgeColorVariantsExample,
    IBadgeHeadingExample,
    IBadgeSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IBadge,
    title: 'Components/Badge',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IBadgeBasicExample
    },
    setup: () => ({ args }),
    template: '<IBadgeBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => IBadgeColorVariantsExample;
export const Heading = () => IBadgeHeadingExample;
export const SizeVariants = () => IBadgeSizeVariantsExample;
