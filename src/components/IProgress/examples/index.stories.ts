import IProgress from '../index.vue';
import {
    IProgressBasicExample,
    IProgressBarColorVariantsExample,
    IProgressColorVariantsExample,
    IProgressSizeVariantsExample,
    IProgressStackedExample,
    IProgressValueExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IProgress,
    title: 'Components/Progress',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IProgressBasicExample
    },
    setup: () => ({ args }),
    template: '<IProgressBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const BarColorVariants = () => IProgressBarColorVariantsExample;
export const ColorVariants = () => IProgressColorVariantsExample;
export const SizeVariants = () => IProgressSizeVariantsExample;
export const Stacked = () => IProgressStackedExample;
export const Value = () => IProgressValueExample;
