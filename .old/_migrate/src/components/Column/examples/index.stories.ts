import { Column } from '@inkline/inkline/components/Column/index';
import {
    ColumnBasicExample,
    ColumnAutoWidthExample,
    ColumnNestedExample,
    ColumnOffsetExample,
    ColumnOffsetResetExample,
    ColumnPushPullExample,
    ColumnReorderingFirstExample,
    ColumnReorderingLastExample,
    ColumnResponsiveExample,
    ColumnWidthExample
} from '@inkline/inkline/components/Column/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: Column,
    title: 'Layout/Column'
};

export const Basic = createStory(ColumnBasicExample);
export const AutoWidth = createStory(ColumnAutoWidthExample);
export const Nested = createStory(ColumnNestedExample);
export const Offset = createStory(ColumnOffsetExample);
export const OffsetReset = createStory(ColumnOffsetResetExample);
export const PushPull = createStory(ColumnPushPullExample);
export const ReorderingFirst = createStory(ColumnReorderingFirstExample);
export const ReorderingLast = createStory(ColumnReorderingLastExample);
export const Responsive = createStory(ColumnResponsiveExample);
export const Width = createStory(ColumnWidthExample);
