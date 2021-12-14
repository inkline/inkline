import IDropdown from '../index.vue';
import IDropdownBasicExample from './basic.vue';
import IDropdownColorVariantsExample from './color-variants.vue';
import IDropdownHeaderFooterExample from './header-footer.vue';
import IDropdownSizeVariantsExample from './size-variants.vue';
import IDropdownFreeformExample from './freeform.vue';
import IDropdownNestedExample from './nested.vue';
import IDropdownPlacementExample from './placement.vue';
import IDropdownRoutingExample from './routing.vue';
import IDropdownStateActiveExample from './state-active.vue';
import IDropdownTriggerExample from './trigger.vue';
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
