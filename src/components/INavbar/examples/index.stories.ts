import INavbar from '../index.vue';
import {
    INavbarBasicExample,
    INavbarCollapseBreakpointExample,
    INavbarCollapseTrueExample,
    INavbarCollapseFalseExample,
    INavbarCollapseManualExample,
    INavbarColorVariantsExample,
    INavbarDropdownExample,
    INavbarNavPlacementExample,
    INavbarSizeVariantsExample,
    INavbarRoutingExample,
    INavbarRoutingActiveExample
} from './index';
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
