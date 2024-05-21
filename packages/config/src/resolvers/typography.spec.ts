import {
    resolveTypographyColor,
    resolveTypographyColorVariant,
    resolveTypographyFontFamily,
    resolveTypographyFontSize,
    resolveTypographyFontWeight,
    resolveTypographyLetterSpacing,
    resolveTypographyLineHeight,
    resolveTypographyTextAlignment,
    typographyColorResolver,
    typographyFontFamilyResolver,
    typographyFontSizeResolver,
    typographyFontWeightResolver,
    typographyLetterSpacingResolver,
    typographyLineHeightResolver,
    typographyTextAlignmentResolver
} from './typography';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveTypographyColor', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'color', 'default'] });

    it('should return the same color when color is a string', () => {
        const color = '#ff0000';
        const result = resolveTypographyColor(color, meta);
        expect(result).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });

    it('should return the color with css variables when color is a variable', () => {
        const color = 'var(--color)';
        const result = resolveTypographyColor(color, meta);
        expect(result).toEqual({
            h: 'var(--color-h)',
            s: 'var(--color-s)',
            l: 'var(--color-l)',
            a: 'var(--color-a)'
        });
    });
});

describe('resolveTypographyColorVariant', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'color', 'variant'] });

    it('should return the same color when variant is a string', () => {
        const variant = '#00ff00';
        const result = resolveTypographyColorVariant(variant, meta);
        expect(result).toEqual({ h: 120, s: 100, l: 50, a: 1 });
    });

    it('should return the color with css variables when variant is a variable', () => {
        const variant = 'var(--color-variant)';
        const result = resolveTypographyColorVariant(variant, meta);
        expect(result).toEqual({
            h: 'var(--color-variant-h)',
            s: 'var(--color-variant-s)',
            l: 'var(--color-variant-l)',
            a: 'var(--color-variant-a)'
        });
    });
});

describe('resolveTypographyFontFamily', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontFamily', 'default'] });

    it('should return the same fontFamily when fontFamily is a string', () => {
        const fontFamily = {
            base: 'Arial',
            monospace: 'Courier New',
            print: 'Times New Roman'
        };
        const result = resolveTypographyFontFamily(fontFamily, meta);
        expect(result).toEqual(fontFamily);
    });

    it('should return the fontFamily with css variables when fontFamily is a variable', () => {
        const fontFamily = {
            base: 'var(--font-family-base)',
            monospace: 'var(--font-family-monospace)',
            print: 'var(--font-family-print)'
        };
        const result = resolveTypographyFontFamily(fontFamily, meta);
        expect(result).toEqual(fontFamily);
    });
});

describe('resolveTypographyFontSize', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontSize', 'default'] });

    it('should return the same fontSize when fontSize is a string', () => {
        const fontSize = '16px';
        const result = resolveTypographyFontSize(fontSize, meta);
        expect(result).toEqual(fontSize);
    });

    it('should return the fontSize with css variables when fontSize is a variable', () => {
        const fontSize = 'var(--fontSize)';
        const result = resolveTypographyFontSize(fontSize, meta);
        expect(result).toEqual(fontSize);
    });
});

describe('resolveTypographyFontWeight', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'fontWeight', 'default'] });

    it('should return the same fontWeight when fontWeight is a string', () => {
        const fontWeight = 'bold';
        const result = resolveTypographyFontWeight(fontWeight, meta);
        expect(result).toEqual(fontWeight);
    });

    it('should return the fontWeight with css variables when fontWeight is a variable', () => {
        const fontWeight = 'var(--fontWeight)';
        const result = resolveTypographyFontWeight(fontWeight, meta);
        expect(result).toEqual(fontWeight);
    });
});

describe('resolveTypographyLetterSpacing', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'letterSpacing', 'default'] });

    it('should return the same letterSpacing when letterSpacing is a string', () => {
        const letterSpacing = '0.5em';
        const result = resolveTypographyLetterSpacing(letterSpacing, meta);
        expect(result).toEqual(letterSpacing);
    });

    it('should return the letterSpacing with css variables when letterSpacing is a variable', () => {
        const letterSpacing = 'var(--letterSpacing)';
        const result = resolveTypographyLetterSpacing(letterSpacing, meta);
        expect(result).toEqual(letterSpacing);
    });
});

describe('resolveTypographyLineHeight', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'lineHeight', 'default'] });

    it('should return the same lineHeight when lineHeight is a string', () => {
        const lineHeight = '1.5';
        const result = resolveTypographyLineHeight(lineHeight, meta);
        expect(result).toEqual(lineHeight);
    });

    it('should return the lineHeight with css variables when lineHeight is a variable', () => {
        const lineHeight = 'var(--lineHeight)';
        const result = resolveTypographyLineHeight(lineHeight, meta);
        expect(result).toEqual(lineHeight);
    });
});

describe('resolveTypographyTextAlignment', () => {
    const meta = createTestingResolverMeta({ path: ['typography', 'textAlign', 'default'] });

    it('should return the same textAlign when textAlign is a string', () => {
        const textAlign = 'center';
        const result = resolveTypographyTextAlignment(textAlign, meta);
        expect(result).toEqual(textAlign);
    });

    it('should return the textAlign with css variables when textAlign is a variable', () => {
        const textAlign = 'var(--text-align)';
        const result = resolveTypographyTextAlignment(textAlign, meta);
        expect(result).toEqual(textAlign);
    });
});

describe('typographyColorResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.color', false],
            ['typography.color.base', false],
            ['typography.color.base.default', true],
            ['typography.color.base.default.h', false],
            ['components.button.default.typography.color', false],
            ['other.typography.color.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyColorResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontFamilyResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.fontFamily', false],
            ['typography.fontFamily.default', true],
            ['typography.fontFamily.default.base', false],
            ['components.button.default.typography.fontFamily', false],
            ['other.typography.fontFamily.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyFontFamilyResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontSizeResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.fontSize', false],
            ['typography.fontSize.default', true],
            ['components.button.default.typography.fontSize', false],
            ['other.typography.fontSize.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyFontSizeResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontWeightResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.fontWeight', false],
            ['typography.fontWeight.default', true],
            ['components.button.default.typography.fontWeight', false],
            ['other.typography.fontWeight.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyFontWeightResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyLetterSpacingResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.letterSpacing', false],
            ['typography.letterSpacing.default', true],
            ['components.button.default.typography.letterSpacing', false],
            ['other.typography.letterSpacing.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = matchKey(path, typographyLetterSpacingResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyLineHeightResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.lineHeight', false],
            ['typography.lineHeight.default', true],
            ['components.button.default.typography.lineHeight', false],
            ['other.typography.lineHeight.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyLineHeightResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyTextAlignmentResolver', () => {
    describe('match', () => {
        it.each([
            ['typography.textAlign', false],
            ['typography.textAlign.default', true],
            ['components.button.default.typography.textAlign', false],
            ['other.typography.textAlign.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyTextAlignmentResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});
