import { Row } from '@inkline/inkline/components/Row/index';
import {
    RowBasicExample,
    RowDistributionAroundExample,
    RowDistributionBetweenExample,
    RowHorizontalAlignmentStartExample,
    RowHorizontalAlignmentCenterExample,
    RowHorizontalAlignmentEndExample,
    RowReorderingReverseExample,
    RowVerticalAlignmentTopExample,
    RowVerticalAlignmentMiddleExample,
    RowVerticalAlignmentBottomExample
} from '@inkline/inkline/components/Row/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: Row,
    title: 'Layout/Row'
};

export const Basic = createStory(RowBasicExample);
export const DistributionAround = createStory(RowDistributionAroundExample);
export const DistributionBetween = createStory(RowDistributionBetweenExample);
export const HorizontalAlignmentStart = createStory(RowHorizontalAlignmentStartExample);
export const HorizontalAlignmentCenter = createStory(RowHorizontalAlignmentCenterExample);
export const HorizontalAlignmentEnd = createStory(RowHorizontalAlignmentEndExample);
export const ReorderingReverse = createStory(RowReorderingReverseExample);
export const VerticalAlignmentTop = createStory(RowVerticalAlignmentTopExample);
export const VerticalAlignmentMiddle = createStory(RowVerticalAlignmentMiddleExample);
export const VerticalAlignmentBottom = createStory(RowVerticalAlignmentBottomExample);
