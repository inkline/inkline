import { sizeMultiplierVariants } from '../../../common';
import {
    defineFontFamilyVariable,
    defineFontSizeVariable,
    defineFontWeightVariable,
    defineLetterSpacingVariable,
    defineLineHeightVariable,
    defineTextAlignmentVariable,
    defineTextColorVariable
} from '../../../../utils';

export const textColor = defineTextColorVariable('var(--color-dark)', {
    dark: 'var(--color-dark)',
    weak: 'var(--color-gray-700)',
    weaker: 'var(--color-gray-500)',
    weakest: 'var(--color-gray-300)',
    light: 'var(--color-light)'
});

export const textContrastColor = defineTextColorVariable('var(--color-white)', {
    light: 'var(--color-gray-900)',
    dark: 'var(--color-white)'
});

export const fontFamily = defineFontFamilyVariable(
    {
        base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
        monospace:
            "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        print: "'Georgia', 'Times New Roman', 'Times', serif"
    },
    {
        secondary: {
            base: 'var(--font-family-base)',
            monospace: 'var(--font-family-monospace)',
            print: 'var(--font-family-print)'
        }
    }
);

export const fontSize = defineFontSizeVariable('1rem', {
    ...sizeMultiplierVariants
});

export const fontWeight = defineFontWeightVariable('var(--font-weight-normal)', {
    extralight: 200,
    light: 300,
    normal: 'normal',
    semibold: 600,
    bold: 'bold',
    black: 900,
    lighter: 'lighter',
    bolder: 'bolder'
});

export const lineHeight = defineLineHeightVariable(1.5);

export const letterSpacing = defineLetterSpacingVariable(0);

export const textAlign = defineTextAlignmentVariable('left', {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify'
});
