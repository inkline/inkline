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
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IDropdown,
    title: 'Components/Dropdown',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-dropdown v-bind="args">
        Dropdown
    </i-dropdown>`,
});

export const Component = Template.bind({});

export const Basic = () => IDropdownBasicExample;
export const ColorVariants = () => IDropdownColorVariantsExample;
export const HeaderFooter = () => IDropdownHeaderFooterExample;
export const SizeVariants = () => IDropdownSizeVariantsExample;
export const Freeform = () => IDropdownFreeformExample;
export const Nested = () => IDropdownNestedExample;
export const Placement = () => IDropdownPlacementExample;
export const Routing = () => IDropdownRoutingExample;
export const StateActive = () => IDropdownStateActiveExample;
export const Trigger = () => IDropdownTriggerExample;
            