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

export const Basic = () => IColumnBasicExample;
export const AutoWidth = () => IColumnAutoWidthExample;
export const Nested = () => IColumnNestedExample;
export const Offset = () => IColumnOffsetExample;
export const OffsetReset = () => IColumnOffsetResetExample;
export const PushPull = () => IColumnPushPullExample;
export const ReorderingFirst = () => IColumnReorderingFirstExample;
export const ReorderingLast = () => IColumnReorderingLastExample;
export const Responsive = () => IColumnResponsiveExample;
