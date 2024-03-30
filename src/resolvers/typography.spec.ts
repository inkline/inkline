import {
    resolveTypographyFontFamily,
    resolveTypographyFontFamilyVariant,
    resolveTypographyFontSize,
    resolveTypographyFontSizeVariant,
    resolveTypographyFontWeight,
    resolveTypographyFontWeightVariant,
    resolveTypographyLineHeight,
    resolveTypographyColor,
    resolveTypographyColorVariant,
    resolveTypographyContrastColor,
    resolveTypographyContrastColorVariant,
    resolveTypographyLetterSpacing,
    typographyLetterSpacingResolver,
    typographyContrastColorResolver,
    typographyColorResolver,
    typographyLineHeightResolver,
    typographyFontWeightResolver,
    typographyFontSizeResolver,
    typographyFontFamilyResolver
} from './typography';
import { codegenCssVariables } from '../utils';
import { fontSizeModifiers } from './modifiers';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveTypographyFontFamily', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontFamily'] });

    it('should return the same fontFamily value', () => {
        const fontFamily = {
            base: 'Arial, sans-serif',
            monospace: 'Courier New, monospace',
            print: 'serif'
        };
        const result = resolveTypographyFontFamily(fontFamily, meta);
        expect(result).toEqual(fontFamily);
    });
});

describe('resolveTypographyFontFamilyVariant', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontFamily', 'primary'] });

    it('should return the same fontFamily value', () => {
        const fontFamily = {
            base: 'Arial, sans-serif',
            monospace: 'Courier New, monospace',
            print: 'serif'
        };
        const result = resolveTypographyFontFamilyVariant(fontFamily, meta);
        expect(result).toEqual(fontFamily);
    });
});

describe('resolveTypographyFontSize', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontSize'] });

    it('should return the same fontSize value', () => {
        const fontSize = '16px';
        const result = resolveTypographyFontSize(fontSize, meta);
        expect(result).toEqual(fontSize);
    });
});

describe('resolveTypographyFontSizeVariant', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontSize', 'sm'] });

    it('should apply fontSize modifiers correctly', () => {
        const variant = { add: '2px' };
        const result = resolveTypographyFontSizeVariant(variant, meta);
        expect(result).toEqual('calc(var(--font-size) + 2px)');
    });
});

describe('resolveTypographyFontWeight', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontWeight'] });

    it('should return the same fontWeight value', () => {
        const fontWeight = 'bold';
        const result = resolveTypographyFontWeight(fontWeight, meta);
        expect(result).toEqual(fontWeight);
    });
});

describe('resolveTypographyFontWeightVariant', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontWeight', 'bold'] });

    it('should return the same fontWeight value', () => {
        const fontWeight = 'bold';
        const result = resolveTypographyFontWeightVariant(fontWeight, meta);
        expect(result).toEqual(fontWeight);
    });
});

describe('resolveTypographyLineHeight', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'lineHeight'] });

    it('should return the same lineHeight value', () => {
        const lineHeight = '1.5';
        const result = resolveTypographyLineHeight(lineHeight, meta);
        expect(result).toEqual(lineHeight);
    });
});

describe('resolveTypographyColor', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'color'] });

    it('should return the same color value', () => {
        const color = '#FFFFFF';
        const result = resolveTypographyColor(color, meta);
        expect(result).toEqual(color);
    });
});

describe('resolveTypographyColorVariant', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'color', 'primary'] });

    it('should return the same color value', () => {
        const color = '#FFFFFF';
        const result = resolveTypographyColorVariant(color, meta);
        expect(result).toEqual(color);
    });
});

describe('resolveTypographyContrastColor', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'contrastColor'] });

    it('should return the same contrastColor value', () => {
        const contrastColor = '#000000';
        const result = resolveTypographyContrastColor(contrastColor, meta);
        expect(result).toEqual(contrastColor);
    });
});

describe('resolveTypographyContrastColorVariant', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'contrastColor', 'primary'] });

    it('should return the same contrastColor value', () => {
        const contrastColor = '#000000';
        const result = resolveTypographyContrastColorVariant(contrastColor, meta);
        expect(result).toEqual(contrastColor);
    });
});

describe('resolveTypographyLetterSpacing', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'letterSpacing'] });

    it('should return the same letterSpacing value', () => {
        const letterSpacing = '0.05em';
        const result = resolveTypographyLetterSpacing(letterSpacing, meta);
        expect(result).toEqual(letterSpacing);
    });
});

describe('typographyFontFamilyResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontFamily'] });

    it('should correctly resolve fontFamily', () => {
        const fontFamily = {
            base: 'Arial, sans-serif',
            monospace: 'Courier New, monospace',
            print: 'serif'
        };
        const result = typographyFontFamilyResolver.resolve(fontFamily, meta);
        expect(result).toEqual({
            default: fontFamily
        });
    });

    it('should correctly resolve fontFamily with variants', () => {
        const fontFamilyVariants = {
            default: {
                base: 'Arial, sans-serif',
                monospace: 'Courier New, monospace',
                print: 'serif'
            },
            primary: {
                base: 'var(--font-family-base)',
                monospace: 'var(--font-family-monospace)',
                print: 'var(--font-family-print)'
            }
        };
        const result = typographyFontFamilyResolver.resolve(fontFamilyVariants, meta);
        expect(result).toEqual(fontFamilyVariants);
    });
});

describe('typographyFontSizeResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontSize'] });

    it('should correctly resolve fontSize', () => {
        const fontSize = '16px';
        const result = typographyFontSizeResolver.resolve(fontSize, meta);
        expect(result).toEqual({
            default: fontSize
        });
    });

    it('should correctly resolve fontSize with variants', () => {
        const fontSize = {
            small: { multiply: 0.75 },
            default: '16px',
            large: '18px'
        };
        const result = typographyFontSizeResolver.resolve(fontSize, meta);
        expect(result).toEqual({
            small: 'calc(var(--font-size) * 0.75)',
            default: '16px',
            large: '18px'
        });
    });
});

describe('typographyFontWeightResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontWeight'] });

    it('should correctly resolve fontWeight', () => {
        const fontWeight = 'normal';
        const result = typographyFontWeightResolver.resolve(fontWeight, meta);
        expect(result).toEqual({
            default: fontWeight
        });
    });

    it('should correctly resolve fontWeight with variants', () => {
        const fontWeight = {
            default: 'normal',
            bold: 'bold'
        };
        const result = typographyFontWeightResolver.resolve(fontWeight, meta);
        expect(result).toEqual(fontWeight);
    });
});

describe('typographyLineHeightResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'lineHeight'] });

    it('should correctly resolve lineHeight without variants', () => {
        const lineHeight = '1.5';
        const result = typographyLineHeightResolver.resolve(lineHeight, meta);
        expect(result).toEqual({
            default: lineHeight
        });
    });
});

describe('typographyColorResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'color'] });

    it('should correctly resolve color', () => {
        const color = '#FFFFFF';
        const result = typographyColorResolver.resolve(color, meta);
        expect(result).toEqual({
            default: color
        });
    });

    it('should correctly resolve color with variants', () => {
        const color = {
            default: '#FFFFFF',
            darkMode: '#000000'
        };
        const result = typographyColorResolver.resolve(color, meta);
        expect(result).toEqual(color);
    });
});

describe('typographyContrastColorResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'contrastColor'] });

    it('should correctly resolve contrastColor', () => {
        const contrastColor = '#000000';
        const result = typographyContrastColorResolver.resolve(contrastColor, meta);
        expect(result).toEqual({
            default: contrastColor
        });
    });

    it('should correctly resolve contrastColor with variants', () => {
        const contrastColor = {
            default: '#000000',
            darkMode: '#FFFFFF'
        };
        const result = typographyContrastColorResolver.resolve(contrastColor, meta);
        expect(result).toEqual(contrastColor);
    });
});

describe('typographyLetterSpacingResolver', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'letterSpacing'] });

    it('should correctly resolve letterSpacing without variants', () => {
        const letterSpacing = '0.05em';
        const result = typographyLetterSpacingResolver.resolve(letterSpacing, meta);
        expect(result).toEqual({
            default: letterSpacing
        });
    });
});
