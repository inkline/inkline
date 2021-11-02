import INavbar from './index.vue';
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
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: INavbar,
    title: 'Components/Navbar',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-navbar v-bind="args">
        Navbar
    </i-navbar>`,
});

export const Component = Template.bind({});

export const Basic = () => INavbarBasicExample;
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
            