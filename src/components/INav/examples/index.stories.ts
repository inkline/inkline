import INav from '../index.vue';
import {
    INavBasicExample,
    INavColorVariantsExample,
    INavRoutingExample,
    INavSizeVariantsExample,
    INavStateActiveExample,
    INavVerticalExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: INav,
    title: 'Components/Nav',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        INavBasicExample
    },
    setup: () => ({ args }),
    template: '<INavBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => INavColorVariantsExample;
export const Routing = () => INavRoutingExample;
export const SizeVariants = () => INavSizeVariantsExample;
export const StateActive = () => INavStateActiveExample;
export const Vertical = () => INavVerticalExample;
