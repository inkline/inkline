import { ISidebar } from '@inkline/inkline/components';
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
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ISidebar,
    title: 'Components/Sidebar',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ISidebarBasicExample);
export const CollapseBreakpoint = createStory(ISidebarCollapseBreakpointExample);
export const CollapseTrue = createStory(ISidebarCollapseTrueExample);
export const CollapseFalse = createStory(ISidebarCollapseFalseExample);
export const ColorVariants = createStory(ISidebarColorVariantsExample);
export const CollapsePosition = createStory(ISidebarCollapsePositionExample);
export const Collapsible = createStory(ISidebarCollapsibleExample);
export const SizeVariants = createStory(ISidebarSizeVariantsExample);
export const Placement = createStory(ISidebarPlacementExample);
export const Routing = createStory(ISidebarRoutingExample);
export const RoutingActive = createStory(ISidebarRoutingActiveExample);
