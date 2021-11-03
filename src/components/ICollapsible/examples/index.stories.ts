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
    setup: () => ({ args }),
    template: `<i-collapsible v-bind="args">
        <i-collapsible-item title="Item 1">
            Item 1 content
        </i-collapsible-item>
        <i-collapsible-item title="Item 2">
            Item 2 content
        </i-collapsible-item>
        <i-collapsible-item title="Item 3">
            Item 3 content
        </i-collapsible-item>
    </i-collapsible>`,
});

export const Component = Template.bind({});

export const Accordion = () => ICollapsibleAccordionExample;
export const Basic = () => ICollapsibleBasicExample;
export const ColorVariants = () => ICollapsibleColorVariantsExample;
export const DefaultOpen = () => ICollapsibleDefaultOpenExample;
export const Header = () => ICollapsibleHeaderExample;
export const SizeVariants = () => ICollapsibleSizeVariantsExample;
