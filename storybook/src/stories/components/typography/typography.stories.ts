import { Typography } from '@inkline/component-typography';
import {
    TypographyBasicExample,
    TypographyAlignExample,
    TypographyColorVariantsExample,
    TypographySizeVariantsExample,
    TypographyFontWeightExample,
    TypographyLetterSpacingExample,
    TypographyLineClampExample,
    TypographyLineHeightExample,
    TypographyTextDecorationExample,
    TypographyTextTransformExample,
    TypographyTruncateExample,
    TypographyLeadExample,
    TypographyInitialismExample
} from '@inkline/component-typography/examples';
import { markRaw } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Typography> = {
    component: markRaw(Typography),
    title: 'Typography/Typography'
};

export default meta;

export const Basic: StoryFn = () => TypographyBasicExample;
export const Align: StoryFn = () => TypographyAlignExample;
export const ColorVariants: StoryFn = () => TypographyColorVariantsExample;
export const SizeVariants: StoryFn = () => TypographySizeVariantsExample;
export const FontWeight: StoryFn = () => TypographyFontWeightExample;
export const LetterSpacing: StoryFn = () => TypographyLetterSpacingExample;
export const LineClamp: StoryFn = () => TypographyLineClampExample;
export const LineHeight: StoryFn = () => TypographyLineHeightExample;
export const TextDecoration: StoryFn = () => TypographyTextDecorationExample;
export const TextTransform: StoryFn = () => TypographyTextTransformExample;
export const Truncate: StoryFn = () => TypographyTruncateExample;
export const Lead: StoryFn = () => TypographyLeadExample;
export const Initialism: StoryFn = () => TypographyInitialismExample;
