import { Dropdown } from '@inkline/inkline/components/Dropdown/index';
import {
    DropdownBasicExample,
    DropdownColorVariantsExample,
    DropdownHeaderFooterExample,
    DropdownSizeVariantsExample,
    DropdownFreeformExample,
    DropdownNestedExample,
    DropdownPlacementExample,
    DropdownRoutingExample,
    DropdownStateActiveExample,
    DropdownTriggerExample
} from '@inkline/inkline/components/Dropdown/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Dropdown,
    title: 'Components/Dropdown',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(DropdownBasicExample);
export const ColorVariants = () => DropdownColorVariantsExample;
export const HeaderFooter = () => DropdownHeaderFooterExample;
export const SizeVariants = () => DropdownSizeVariantsExample;
export const Freeform = () => DropdownFreeformExample;
export const Nested = () => DropdownNestedExample;
export const Placement = () => DropdownPlacementExample;
export const Routing = () => DropdownRoutingExample;
export const StateActive = () => DropdownStateActiveExample;
export const Trigger = () => DropdownTriggerExample;
