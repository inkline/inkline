import { sizeMultiplierVariants } from '../../../common';
import {
    defineFontFamily,
    defineFontSize,
    defineFontWeight,
    defineLetterSpacing,
    defineLineHeight,
    defineTextAlignment,
    defineTextColor
} from '../../../../utils';

export const textColor = defineTextColor('var(--color-dark)', {
    dark: 'var(--color-dark)',
    weak: 'var(--color-gray-700)',
    weaker: 'var(--color-gray-500)',
    weakest: 'var(--color-gray-300)',
    light: 'var(--color-light)'
});

export const contrastTextColor = defineTextColor('var(--color-white)', {
    light: 'var(--color-gray-900)',
    dark: 'var(--color-white)'
});

export const fontFamily = defineFontFamily(
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

export const fontSize = defineFontSize('1rem', {
    ...sizeMultiplierVariants
});

export const fontWeight = defineFontWeight('var(--font-weight-normal)', {
    extralight: 200,
    light: 300,
    normal: 'normal',
    semibold: 600,
    bold: 'bold',
    black: 900,
    lighter: 'lighter',
    bolder: 'bolder'
});

export const lineHeight = defineLineHeight(1.5);

export const letterSpacing = defineLetterSpacing(0);

export const textAlign = defineTextAlignment('left', {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify'
});
