import IDropdown from '../index.vue';
import {
    IDropdownBasicExample,
    IDropdownColorVariantsExample,
    IDropdownHeaderFooterExample,
    IDropdownSizeVariantsExample,
    IDropdownFreeformExample,
    IDropdownNestedExample,
    IDropdownPlacementExample,
    IDropdownRoutingExample,
    IDropdownStateActiveExample,
    IDropdownTriggerExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IDropdown,
    title: 'Components/Dropdown',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IDropdownBasicExample
    },
    setup: () => ({ args }),
    template: '<IDropdownBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => IDropdownColorVariantsExample;
export const HeaderFooter = () => IDropdownHeaderFooterExample;
export const SizeVariants = () => IDropdownSizeVariantsExample;
export const Freeform = () => IDropdownFreeformExample;
export const Nested = () => IDropdownNestedExample;
export const Placement = () => IDropdownPlacementExample;
export const Routing = () => IDropdownRoutingExample;
export const StateActive = () => IDropdownStateActiveExample;
export const Trigger = () => IDropdownTriggerExample;
