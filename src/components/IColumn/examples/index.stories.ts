import IColumn from '../index.vue';
import IColumnAutoWidthExample from './auto-width.vue';
import IColumnBasicExample from './basic.vue';
import IColumnNestedExample from './nested.vue';
import IColumnOffsetExample from './offset.vue';
import IColumnOffsetResetExample from './offset-reset.vue';
import IColumnPushPullExample from './push-pull.vue';
import IColumnReorderingFirstExample from './reordering-first.vue';
import IColumnReorderingLastExample from './reordering-last.vue';
import IColumnResponsiveExample from './responsive.vue';
import IColumnWidthExample from './width.vue';
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
