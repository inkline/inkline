import IBadge from '../index.vue';
import {
    IBadgeColorVariantsExample,
    IBadgeHeadingExample,
    IBadgeSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IBadge,
    title: 'Components/Badge',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-badge v-bind="args">
        Badge
    </i-badge>`,
});

export const Basic = Template.bind({});
export const ColorVariants = () => IBadgeColorVariantsExample;
export const Heading = () => IBadgeHeadingExample;
export const SizeVariants = () => IBadgeSizeVariantsExample;
