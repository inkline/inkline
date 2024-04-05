import type { RawTheme } from '../../../../types';
import { sizeMultiplierVariants } from '../../../common';

export const typography: RawTheme['typography'] = {
    color: {
        dark: 'var(--color-dark)',
        weak: 'var(--color-gray-700)',
        weaker: 'var(--color-gray-500)',
        weakest: 'var(--color-gray-300)',
        light: 'var(--color-light)'
    },
    contrastColor: {
        light: 'var(--color-gray-900)',
        dark: 'var(--color-white)'
    },
    fontFamily: {
        default: {
            base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
            monospace:
                "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            print: "'Georgia', 'Times New Roman', 'Times', serif"
        },
        secondary: {
            base: 'var(--font-family-base)',
            monospace: 'var(--font-family-monospace)',
            print: 'var(--font-family-print)'
        }
    },
    fontSize: {
        default: '1rem',
        ...sizeMultiplierVariants
    },
    fontWeight: {
        default: 'var(--font-weight-normal)',
        extralight: 200,
        light: 300,
        normal: 'normal',
        semibold: 600,
        bold: 'bold',
        black: 900,
        lighter: 'lighter',
        bolder: 'bolder'
    },
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: 'left'
};
