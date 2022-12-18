import { ISidebar } from '../index';
import {
    ISidebarBasicExample,
    ISidebarCollapseBreakpointExample,
    ISidebarCollapseTrueExample,
    ISidebarCollapseFalseExample,
    ISidebarColorVariantsExample,
    ISidebarCollapsePositionExample,
    ISidebarCollapsibleExample,
    ISidebarSizeVariantsExample,
    ISidebarPlacementExample,
    ISidebarRoutingExample,
    ISidebarRoutingActiveExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ISidebar,
    title: 'Components/Sidebar',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = () => ISidebarBasicExample;
export const CollapseBreakpoint = () => ISidebarCollapseBreakpointExample;
export const CollapseTrue = () => ISidebarCollapseTrueExample;
export const CollapseFalse = () => ISidebarCollapseFalseExample;
export const ColorVariants = () => ISidebarColorVariantsExample;
export const CollapsePosition = () => ISidebarCollapsePositionExample;
export const Collapsible = () => ISidebarCollapsibleExample;
export const SizeVariants = () => ISidebarSizeVariantsExample;
export const Placement = () => ISidebarPlacementExample;
export const Routing = () => ISidebarRoutingExample;
export const RoutingActive = () => ISidebarRoutingActiveExample;
