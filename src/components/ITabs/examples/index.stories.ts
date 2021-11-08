import ITabs from '../index.vue';
import {
    ITabsBasicExample,
    ITabsColorVariantsExample,
    ITabsSizeVariantsExample,
    ITabsStretchExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITabs,
    title: 'Components/Tabs',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        ITabsBasicExample
    },
    setup: () => ({ args }),
    template: '<ITabsBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => ITabsColorVariantsExample;
export const SizeVariants = () => ITabsSizeVariantsExample;
export const Stretch = () => ITabsStretchExample;
