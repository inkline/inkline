import {
    SpacingBottomExample,
    SpacingHorizontalCenterExample,
    SpacingLeftExample,
    SpacingRightExample,
    SpacingTopExample
} from '@inkline/inkline/stories/utilities/spacing/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Spacing'
};

export const Bottom = createStory(SpacingBottomExample);
export const HorizontalCenter = createStory(SpacingHorizontalCenterExample);
export const Left = createStory(SpacingLeftExample);
export const Right = createStory(SpacingRightExample);
export const Top = createStory(SpacingTopExample);
