import ISidebar from '../index.vue';
import ISidebarBasicExample from './basic.vue';
import ISidebarCollapseBreakpointExample from './collapse-breakpoint.vue';
import ISidebarCollapseTrueExample from './collapse-true.vue';
import ISidebarCollapseFalseExample from './collapse-false.vue';
import ISidebarColorVariantsExample from './color-variants.vue';
import ISidebarCollapsePositionExample from './collapse-position.vue';
import ISidebarCollapsibleExample from './collapsible.vue';
import ISidebarSizeVariantsExample from './size-variants.vue';
import ISidebarPlacementExample from './placement.vue';
import ISidebarRoutingExample from './routing.vue';
import ISidebarRoutingActiveExample from './routing-active.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ISidebar,
    title: 'Components/Sidebar',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ISidebarBasicExample);
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
