import { INavbar } from '@inkline/inkline/components';
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
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: INavbar,
    title: 'Components/Navbar',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(INavbarBasicExample);
export const CollapseBreakpoint = createStory(INavbarCollapseBreakpointExample);
export const CollapseTrue = createStory(INavbarCollapseTrueExample);
export const CollapseFalse = createStory(INavbarCollapseFalseExample);
export const CollapseManual = createStory(INavbarCollapseManualExample);
export const ColorVariants = createStory(INavbarColorVariantsExample);
export const Dropdown = createStory(INavbarDropdownExample);
export const NavPlacement = createStory(INavbarNavPlacementExample);
export const SizeVariants = createStory(INavbarSizeVariantsExample);
export const Routing = createStory(INavbarRoutingExample);
export const RoutingActive = createStory(INavbarRoutingActiveExample);
