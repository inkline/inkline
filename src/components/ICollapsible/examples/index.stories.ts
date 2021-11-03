import ICollapsible from '../index.vue';
import {
    ICollapsibleAccordionExample,
    ICollapsibleBasicExample,
    ICollapsibleColorVariantsExample,
    ICollapsibleDefaultOpenExample,
    ICollapsibleHeaderExample,
    ICollapsibleSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ICollapsible,
    title: 'Components/Collapsible',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        ICollapsibleBasicExample
    },
    setup: () => ({ args }),
    template: '<ICollapsibleBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Accordion = () => ICollapsibleAccordionExample;
export const ColorVariants = () => ICollapsibleColorVariantsExample;
export const DefaultOpen = () => ICollapsibleDefaultOpenExample;
export const Header = () => ICollapsibleHeaderExample;
export const SizeVariants = () => ICollapsibleSizeVariantsExample;
