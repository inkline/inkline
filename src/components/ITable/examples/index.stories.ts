import ITable from '../index.vue';
import {
    ITableBasicExample,
    ITableBorderedExample,
    ITableColorVariantsExample,
    ITableHoverExample,
    ITableResponsiveExample,
    ITableStripedExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITable,
    title: 'Components/Table',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        ITableBasicExample
    },
    setup: () => ({ args }),
    template: '<ITableBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Bordered = () => ITableBorderedExample;
export const ColorVariants = () => ITableColorVariantsExample;
export const Hover = () => ITableHoverExample;
export const Responsive = () => ITableResponsiveExample;
export const Striped = () => ITableStripedExample;
