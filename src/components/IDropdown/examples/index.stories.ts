import { IDropdown } from '../index';
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
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IDropdown,
    title: 'Components/Dropdown',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IDropdownBasicExample);
export const ColorVariants = () => IDropdownColorVariantsExample;
export const HeaderFooter = () => IDropdownHeaderFooterExample;
export const SizeVariants = () => IDropdownSizeVariantsExample;
export const Freeform = () => IDropdownFreeformExample;
export const Nested = () => IDropdownNestedExample;
export const Placement = () => IDropdownPlacementExample;
export const Routing = () => IDropdownRoutingExample;
export const StateActive = () => IDropdownStateActiveExample;
export const Trigger = () => IDropdownTriggerExample;
