import INav from './index.vue';
import {
    INavBasicExample,
    INavColorVariantsExample,
    INavRoutingExample,
    INavSizeVariantsExample,
    INavStateActiveExample,
    INavVerticalExample
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: INav,
    title: 'Components/Nav',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-nav v-bind="args">
        Nav
    </i-nav>`,
});

export const Component = Template.bind({});

export const Basic = () => INavBasicExample;
export const ColorVariants = () => INavColorVariantsExample;
export const Routing = () => INavRoutingExample;
export const SizeVariants = () => INavSizeVariantsExample;
export const StateActive = () => INavStateActiveExample;
export const Vertical = () => INavVerticalExample;
            