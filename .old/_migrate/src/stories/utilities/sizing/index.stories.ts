import {
    SizingHeightExample,
    SizingMaxHeightExample,
    SizingMaxWidthExample,
    SizingWidthExample
} from '@inkline/inkline/stories/utilities/sizing/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Sizing'
};

export const Height = createStory(SizingHeightExample);
export const MaxHeight = createStory(SizingMaxHeightExample);
export const MaxWidth = createStory(SizingMaxWidthExample);
export const Width = createStory(SizingWidthExample);
