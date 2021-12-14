import INavbar from '../index.vue';
import INavbarBasicExample from './basic.vue';
import INavbarCollapseBreakpointExample from './collapse-breakpoint.vue';
import INavbarCollapseTrueExample from './collapse-true.vue';
import INavbarCollapseFalseExample from './collapse-false.vue';
import INavbarCollapseManualExample from './collapse-manual.vue';
import INavbarColorVariantsExample from './color-variants.vue';
import INavbarDropdownExample from './dropdown.vue';
import INavbarNavPlacementExample from './nav-placement.vue';
import INavbarSizeVariantsExample from './size-variants.vue';
import INavbarRoutingExample from './routing.vue';
import INavbarRoutingActiveExample from './routing-active.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: INavbar,
    title: 'Components/Navbar',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(INavbarBasicExample);
export const CollapseBreakpoint = () => INavbarCollapseBreakpointExample;
export const CollapseTrue = () => INavbarCollapseTrueExample;
export const CollapseFalse = () => INavbarCollapseFalseExample;
export const CollapseManual = () => INavbarCollapseManualExample;
export const ColorVariants = () => INavbarColorVariantsExample;
export const Dropdown = () => INavbarDropdownExample;
export const NavPlacement = () => INavbarNavPlacementExample;
export const SizeVariants = () => INavbarSizeVariantsExample;
export const Routing = () => INavbarRoutingExample;
export const RoutingActive = () => INavbarRoutingActiveExample;
