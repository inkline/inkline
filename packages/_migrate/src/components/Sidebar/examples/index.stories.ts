import { Sidebar } from '@inkline/inkline/components/Sidebar/index';
import {
    SidebarBasicExample,
    SidebarCollapseBreakpointExample,
    SidebarCollapseTrueExample,
    SidebarCollapseFalseExample,
    SidebarColorVariantsExample,
    SidebarCollapsePositionExample,
    SidebarCollapsibleExample,
    SidebarSizeVariantsExample,
    SidebarPlacementExample,
    SidebarRoutingExample,
    SidebarRoutingActiveExample
} from '@inkline/inkline/components/Sidebar/examples/index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Sidebar,
    title: 'Components/Sidebar',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = () => SidebarBasicExample;
export const CollapseBreakpoint = () => SidebarCollapseBreakpointExample;
export const CollapseTrue = () => SidebarCollapseTrueExample;
export const CollapseFalse = () => SidebarCollapseFalseExample;
export const ColorVariants = () => SidebarColorVariantsExample;
export const CollapsePosition = () => SidebarCollapsePositionExample;
export const Collapsible = () => SidebarCollapsibleExample;
export const SizeVariants = () => SidebarSizeVariantsExample;
export const Placement = () => SidebarPlacementExample;
export const Routing = () => SidebarRoutingExample;
export const RoutingActive = () => SidebarRoutingActiveExample;
