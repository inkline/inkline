import IColumn from '../index.vue';
import {
    IColumnAutoWidthExample,
    IColumnBasicExample,
    IColumnNestedExample,
    IColumnOffsetExample,
    IColumnOffsetResetExample,
    IColumnPushPullExample,
    IColumnReorderingFirstExample,
    IColumnReorderingLastExample,
    IColumnResponsiveExample
} from './index';

export default {
    component: IColumn,
    title: 'Components/Column'
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-column v-bind="args">
        Column
    </i-column>`,
});

export const Component = Template.bind({});

export const AutoWidth = () => IColumnAutoWidthExample;
export const Basic = () => IColumnBasicExample;
export const Nested = () => IColumnNestedExample;
export const Offset = () => IColumnOffsetExample;
export const OffsetReset = () => IColumnOffsetResetExample;
export const PushPull = () => IColumnPushPullExample;
export const ReorderingFirst = () => IColumnReorderingFirstExample;
export const ReorderingLast = () => IColumnReorderingLastExample;
export const Responsive = () => IColumnResponsiveExample;
