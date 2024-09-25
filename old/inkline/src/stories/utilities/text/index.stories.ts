import {
    TextFontMonospaceExample,
    TextFontSizeExample,
    TextFontStyleItalicExample,
    TextFontWeightRelativeExample,
    TextFontWeightExample,
    TextAlignJustifyExample,
    TextAlignResponsiveExample,
    TextAlignExample,
    TextBreakExample,
    TextDecorationExample,
    TextMutedExample,
    TextNowrapExample,
    TextResetExample,
    TextTransformExample,
    TextTruncateExample,
    TextWrapExample,
    TextListsExample
} from '@inkline/inkline/stories/utilities/text/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Text'
};

export const FontMonospace = createStory(TextFontMonospaceExample);
export const FontSize = createStory(TextFontSizeExample);
export const FontStyleItalic = createStory(TextFontStyleItalicExample);
export const FontWeightRelative = createStory(TextFontWeightRelativeExample);
export const FontWeight = createStory(TextFontWeightExample);
export const AlignJustify = createStory(TextAlignJustifyExample);
export const AlignResponsive = createStory(TextAlignResponsiveExample);
export const Align = createStory(TextAlignExample);
export const Break = createStory(TextBreakExample);
export const Decoration = createStory(TextDecorationExample);
export const Muted = createStory(TextMutedExample);
export const Nowrap = createStory(TextNowrapExample);
export const Reset = createStory(TextResetExample);
export const Transform = createStory(TextTransformExample);
export const Truncate = createStory(TextTruncateExample);
export const Wrap = createStory(TextWrapExample);
export const Lists = createStory(TextListsExample);
