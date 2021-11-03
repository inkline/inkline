import ITable from '../index.vue';
import {
    ITableBasicExample,
    ITableBorderedExample,
    ITableColorVariantsExample,
    ITableHoverExample,
    ITableResponsiveExample,
    ITableStripedExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ITable,
    title: 'Components/Table',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-table v-bind="args">
        Table
    </i-table>`,
});

export const Component = Template.bind({});

export const Basic = () => ITableBasicExample;
export const Bordered = () => ITableBorderedExample;
export const ColorVariants = () => ITableColorVariantsExample;
export const Hover = () => ITableHoverExample;
export const Responsive = () => ITableResponsiveExample;
export const Striped = () => ITableStripedExample;
            