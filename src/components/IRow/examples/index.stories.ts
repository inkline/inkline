import IRow from '../index.vue';
import {
    IRowBasicExample,
    IRowDistributionAroundExample,
    IRowDistributionBetweenExample,
    IRowHorizontalAlignmentStartExample,
    IRowHorizontalAlignmentCenterExample,
    IRowHorizontalAlignmentEndExample,
    IRowReorderingReverseExample,
    IRowVerticalAlignmentTopExample,
    IRowVerticalAlignmentMiddleExample,
    IRowVerticalAlignmentBottomExample,
} from './index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IRow,
    title: 'Components/Row'
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
