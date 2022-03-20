import { IDropdown } from '@inkline/inkline/components';
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
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IDropdown,
    title: 'Components/Dropdown',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IDropdownBasicExample);
export const ColorVariants = createStory(IDropdownColorVariantsExample);
export const HeaderFooter = createStory(IDropdownHeaderFooterExample);
export const SizeVariants = createStory(IDropdownSizeVariantsExample);
export const Freeform = createStory(IDropdownFreeformExample);
export const Nested = createStory(IDropdownNestedExample);
export const Placement = createStory(IDropdownPlacementExample);
export const Routing = createStory(IDropdownRoutingExample);
export const StateActive = createStory(IDropdownStateActiveExample);
export const Trigger = createStory(IDropdownTriggerExample);
