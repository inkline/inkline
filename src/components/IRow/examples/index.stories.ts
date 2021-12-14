import IRow from '../index.vue';
import IRowBasicExample from './basic.vue';
import IRowDistributionAroundExample from './distribution-around.vue';
import IRowDistributionBetweenExample from './distribution-between.vue';
import IRowHorizontalAlignmentStartExample from './horizontal-alignment-start.vue';
import IRowHorizontalAlignmentCenterExample from './horizontal-alignment-center.vue';
import IRowHorizontalAlignmentEndExample from './horizontal-alignment-end.vue';
import IRowReorderingReverseExample from './reordering-reverse.vue';
import IRowVerticalAlignmentTopExample from './vertical-alignment-top.vue';
import IRowVerticalAlignmentMiddleExample from './vertical-alignment-middle.vue';
import IRowVerticalAlignmentBottomExample from './vertical-alignment-bottom.vue';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IRow,
    title: 'Layout/Row'
};

export const Basic = createStory(IRowBasicExample);
export const DistributionAround = createStory(IRowDistributionAroundExample);
export const DistributionBetween = createStory(IRowDistributionBetweenExample);
export const HorizontalAlignmentStart = createStory(IRowHorizontalAlignmentStartExample);
export const HorizontalAlignmentCenter = createStory(IRowHorizontalAlignmentCenterExample);
export const HorizontalAlignmentEnd = createStory(IRowHorizontalAlignmentEndExample);
export const ReorderingReverse = createStory(IRowReorderingReverseExample);
export const VerticalAlignmentTop = createStory(IRowVerticalAlignmentTopExample);
export const VerticalAlignmentMiddle = createStory(IRowVerticalAlignmentMiddleExample);
export const VerticalAlignmentBottom = createStory(IRowVerticalAlignmentBottomExample);
