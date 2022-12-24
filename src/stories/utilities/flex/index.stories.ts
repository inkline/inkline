import {
    FlexAlignContentExample,
    FlexAlignItemsExample,
    FlexAlignSelfExample,
    FlexDirectionColumnExample,
    FlexDirectionRowExample,
    FlexFillExample,
    FlexGrowExample,
    FlexShrinkExample,
    FlexWrapExample,
    FlexExample,
    FlexInlineFlexExample,
    FlexJustifyContentExample,
    FlexMarginAutoExample,
    FlexOrderExample
} from '@inkline/inkline/stories/utilities/flex/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Flex'
};

export const AlignContent = createStory(FlexAlignContentExample);
export const AlignItems = createStory(FlexAlignItemsExample);
export const AlignSelf = createStory(FlexAlignSelfExample);
export const DirectionColumn = createStory(FlexDirectionColumnExample);
export const DirectionRow = createStory(FlexDirectionRowExample);
export const Fill = createStory(FlexFillExample);
export const Grow = createStory(FlexGrowExample);
export const Shrink = createStory(FlexShrinkExample);
export const Wrap = createStory(FlexWrapExample);
export const Flex = createStory(FlexExample);
export const InlineFlex = createStory(FlexInlineFlexExample);
export const JustifyContent = createStory(FlexJustifyContentExample);
export const MarginAuto = createStory(FlexMarginAutoExample);
export const Order = createStory(FlexOrderExample);
