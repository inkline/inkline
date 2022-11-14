import { IColumn } from '../index';
import {
    IColumnBasicExample,
    IColumnAutoWidthExample,
    IColumnNestedExample,
    IColumnOffsetExample,
    IColumnOffsetResetExample,
    IColumnPushPullExample,
    IColumnReorderingFirstExample,
    IColumnReorderingLastExample,
    IColumnResponsiveExample,
    IColumnWidthExample
} from './index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IColumn,
    title: 'Layout/Column'
};

export const Basic = createStory(IColumnBasicExample);
export const AutoWidth = createStory(IColumnAutoWidthExample);
export const Nested = createStory(IColumnNestedExample);
export const Offset = createStory(IColumnOffsetExample);
export const OffsetReset = createStory(IColumnOffsetResetExample);
export const PushPull = createStory(IColumnPushPullExample);
export const ReorderingFirst = createStory(IColumnReorderingFirstExample);
export const ReorderingLast = createStory(IColumnReorderingLastExample);
export const Responsive = createStory(IColumnResponsiveExample);
export const Width = createStory(IColumnWidthExample);
