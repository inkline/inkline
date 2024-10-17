import { Navbar } from '@inkline/inkline/components/Navbar/index';
import {
    NavbarBasicExample,
    NavbarCollapseBreakpointExample,
    NavbarCollapseTrueExample,
    NavbarCollapseFalseExample,
    NavbarCollapsedStateExample,
    NavbarColorVariantsExample,
    NavbarDropdownExample,
    NavbarNavPlacementExample,
    NavbarSizeVariantsExample,
    NavbarRoutingExample,
    NavbarRoutingActiveExample
} from '@inkline/inkline/components/Navbar/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Navbar,
    title: 'Components/Navbar',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(NavbarBasicExample);
export const CollapseBreakpoint = () => NavbarCollapseBreakpointExample;
export const CollapseTrue = () => NavbarCollapseTrueExample;
export const CollapseFalse = () => NavbarCollapseFalseExample;
export const CollapsedState = () => NavbarCollapsedStateExample;
export const ColorVariants = () => NavbarColorVariantsExample;
export const Dropdown = () => NavbarDropdownExample;
export const NavPlacement = () => NavbarNavPlacementExample;
export const SizeVariants = () => NavbarSizeVariantsExample;
export const Routing = () => NavbarRoutingExample;
export const RoutingActive = () => NavbarRoutingActiveExample;
