import {
    ColorBasicBackgroundExample,
    ColorBasicTextExample,
    ColorBrandBackgroundExample,
    ColorBrandDarkBackgroundExample,
    ColorBrandLightBackgroundExample,
    ColorBrandPrimaryBackgroundExample,
    ColorBrandSecondaryBackgroundExample,
    ColorBrandTextExample,
    ColorNeutralBackgroundExample,
    ColorNeutralTextExample,
    ColorStateBackgroundExample,
    ColorStateDangerBackgroundExample,
    ColorStateInfoBackgroundExample,
    ColorStateSuccessBackgroundExample,
    ColorStateTextExample,
    ColorStateWarningBackgroundExample
} from '@inkline/inkline/stories/utilities/color/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Color'
};

export const BasicText = createStory(ColorBasicTextExample);
export const BasicBackground = createStory(ColorBasicBackgroundExample);
export const BrandText = createStory(ColorBrandTextExample);
export const BrandBackground = createStory(ColorBrandBackgroundExample);
export const BrandPrimaryBackground = createStory(ColorBrandPrimaryBackgroundExample);
export const BrandSecondaryBackground = createStory(ColorBrandSecondaryBackgroundExample);
export const BrandLightBackground = createStory(ColorBrandLightBackgroundExample);
export const BrandDarkBackground = createStory(ColorBrandDarkBackgroundExample);
export const NeutralText = createStory(ColorNeutralTextExample);
export const NeutralBackground = createStory(ColorNeutralBackgroundExample);
export const StateText = createStory(ColorStateTextExample);
export const StateBackground = createStory(ColorStateBackgroundExample);
export const StateInfoBackground = createStory(ColorStateInfoBackgroundExample);
export const StateSuccessBackground = createStory(ColorStateSuccessBackgroundExample);
export const StateWarningBackground = createStory(ColorStateWarningBackgroundExample);
export const StateDangerBackground = createStory(ColorStateDangerBackgroundExample);
