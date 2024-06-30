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
    typographyTextAlignmentResolver,
    typographyColorGenerator,
    typographyContrastTextColorGenerator,
    typographyFontFamilyGenerator,
    typographyFontSizeGenerator,
    typographyFontWeightGenerator,
    typographyLineHeightGenerator,
    typographyLetterSpacingGenerator,
    typographyTextAlignmentGenerator
} from './typography';
import { createTestingResolverMeta, createTestingGeneratorMeta } from '../__tests__/utils';
import {
    defineFontFamilyVariable,
    defineFontSizeVariable,
    defineFontWeightVariable,
    defineTextAlignmentVariable,
    defineTextColorVariable,
    defineTheme,
    matchKey
} from '../utils';
import { ClassificationType } from '../types';

describe('resolveTypographyColor', () => {
    const meta = createTestingResolverMeta({ path: ['color', 'default'] });

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
    const meta = createTestingResolverMeta({ path: ['color', 'variant'] });

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
    const meta = createTestingResolverMeta({ path: ['fontFamily', 'default'] });

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
    const meta = createTestingResolverMeta({ path: ['fontSize', 'default'] });

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
    const meta = createTestingResolverMeta({ path: ['fontWeight', 'default'] });

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
    const meta = createTestingResolverMeta({ path: ['letterSpacing', 'default'] });

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
    const meta = createTestingResolverMeta({ path: ['lineHeight', 'default'] });

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
    const meta = createTestingResolverMeta({ path: ['textAlign', 'default'] });

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
            ['textColor', false],
            ['textColor.base', true],
            ['textColor.base.h', false],
            ['components.button.default.textColor', false],
            ['other.textColor.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyColorResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontFamilyResolver', () => {
    describe('match', () => {
        it.each([
            ['fontFamily', false],
            ['fontFamily.default', true],
            ['fontFamily.default.base', false],
            ['components.button.default.fontFamily', false],
            ['other.fontFamily.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyFontFamilyResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontSizeResolver', () => {
    describe('match', () => {
        it.each([
            ['fontSize', false],
            ['fontSize.default', true],
            ['components.button.default.fontSize', false],
            ['other.fontSize.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyFontSizeResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontWeightResolver', () => {
    describe('match', () => {
        it.each([
            ['fontWeight', false],
            ['fontWeight.default', true],
            ['components.button.default.fontWeight', false],
            ['other.fontWeight.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyFontWeightResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyLetterSpacingResolver', () => {
    describe('match', () => {
        it.each([
            ['letterSpacing', false],
            ['letterSpacing.default', true],
            ['components.button.default.letterSpacing', false],
            ['other.letterSpacing.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = matchKey(path, typographyLetterSpacingResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyLineHeightResolver', () => {
    describe('match', () => {
        it.each([
            ['lineHeight', false],
            ['lineHeight.default', true],
            ['components.button.default.lineHeight', false],
            ['other.lineHeight.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyLineHeightResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyTextAlignmentResolver', () => {
    describe('match', () => {
        it.each([
            ['textAlign', false],
            ['textAlign.default', true],
            ['components.button.default.textAlign', false],
            ['other.textAlign.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, typographyTextAlignmentResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('typographyColorGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography color default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    textColor: defineTextColorVariable(color)
                },
                path: ['textColor', 'default']
            });
            const result = typographyColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--text-color-h: 0;',
                '--text-color-s: 0%;',
                '--text-color-l: 0%;',
                '--text-color-a: 1;',
                '--text-color: hsla(var(--text-color-h) var(--text-color-s) var(--text-color-l) / var(--text-color-a));'
            ]);
        });

        it('should generate css variables for typography color non-default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    textColor: defineTextColorVariable('', {
                        primary: color
                    })
                },
                path: ['color', 'primary']
            });
            const result = typographyColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--text-color-primary-h: 0;',
                '--text-color-primary-s: 0%;',
                '--text-color-primary-l: 0%;',
                '--text-color-primary-a: 1;',
                '--text-color-primary: hsla(var(--text-color-primary-h) var(--text-color-primary-s) var(--text-color-primary-l) / var(--text-color-primary-a));'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['textColor', false],
            ['textColor.primary', true],
            ['textColor.default', true],
            ['other.textColor.primary', false],
            ['other.textColor.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyColorGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyContrastColorGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography contrast color for default variant', () => {
            const color = { h: '0', s: '0%', l: '100%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    contrastTextColor: defineTextColorVariable(color)
                },
                path: ['contrastTextColor', 'default']
            });
            const result = typographyContrastTextColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--contrast-text-color-h: 0;',
                '--contrast-text-color-s: 0%;',
                '--contrast-text-color-l: 100%;',
                '--contrast-text-color-a: 1;',
                '--contrast-text-color: hsla(var(--contrast-text-color-h) var(--contrast-text-color-s) var(--contrast-text-color-l) / var(--contrast-text-color-a));'
            ]);
        });

        it('should generate css variables for typography contrast color for non-default variant', () => {
            const color = { h: '0', s: '0%', l: '100%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    contrastTextColor: defineTextColorVariable('', {
                        primary: color
                    })
                },
                path: ['contrastTextColor', 'primary']
            });
            const result = typographyContrastTextColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--contrast-text-color-primary-h: 0;',
                '--contrast-text-color-primary-s: 0%;',
                '--contrast-text-color-primary-l: 100%;',
                '--contrast-text-color-primary-a: 1;',
                '--contrast-text-color-primary: hsla(var(--contrast-text-color-primary-h) var(--contrast-text-color-primary-s) var(--contrast-text-color-primary-l) / var(--contrast-text-color-primary-a));'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['contrastTextColor', false],
            ['contrastTextColor.default', true],
            ['contrastTextColor.primary', true],
            ['contrastTextColor.primary.other', false],
            ['other.contrastTextColor.primary', false],
            ['other.contrastTextColor.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyContrastTextColorGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontFamilyGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography font family for non-default variant', () => {
            const fontFamily = {
                base: 'Arial',
                monospace: 'monospace',
                print: 'serif'
            };
            const meta = createTestingGeneratorMeta({
                theme: defineTheme({
                    fontFamily: defineFontFamilyVariable(fontFamily, {
                        primary: fontFamily
                    })
                }),
                path: ['fontFamily', 'primary']
            });
            const result = typographyFontFamilyGenerator.generate(fontFamily, meta);
            expect(result).toEqual([
                '--font-family-base-primary: Arial;',
                '--font-family-monospace-primary: monospace;',
                '--font-family-print-primary: serif;',
                '--font-family-primary: var(--font-family-base-primary);'
            ]);
        });

        it('should generate css variables for typography font family for default variant', () => {
            const fontFamily = {
                base: 'Arial',
                monospace: 'monospace',
                print: 'serif'
            };
            const meta = createTestingGeneratorMeta({
                theme: defineTheme({
                    fontFamily: defineFontFamilyVariable(fontFamily)
                }),
                path: ['fontFamily', 'default']
            });
            const result = typographyFontFamilyGenerator.generate(fontFamily, meta);
            expect(result).toEqual([
                '--font-family-base: Arial;',
                '--font-family-monospace: monospace;',
                '--font-family-print: serif;',
                '--font-family: var(--font-family-base);'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['fontFamily', false],
            ['fontFamily.default', true],
            ['fontFamily.primary', true],
            ['other.fontFamily.primary', false],
            ['other.fontFamily.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyFontFamilyGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontSizeGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography font size for non-default variant', () => {
            const fontSize = '1rem';
            const meta = createTestingGeneratorMeta({
                theme: defineTheme({
                    fontSize: defineFontSizeVariable(fontSize, {
                        md: fontSize
                    })
                }),
                path: ['fontSize', 'md']
            });
            const result = typographyFontSizeGenerator.generate(fontSize, meta);
            expect(result).toEqual(['--font-size-md: 1rem;']);
        });

        it('should generate css variables for typography font size for default variant', () => {
            const fontSize = '1rem';
            const meta = createTestingGeneratorMeta({
                theme: defineTheme({
                    fontSize: defineFontSizeVariable(fontSize)
                }),
                path: ['fontSize', 'default']
            });
            const result = typographyFontSizeGenerator.generate(fontSize, meta);
            expect(result).toEqual(['--font-size: 1rem;']);
        });
    });

    describe('match', () => {
        it.each([
            ['fontSize', false],
            ['fontSize.default', true],
            ['fontSize.primary', true],
            ['other.fontSize.primary', false],
            ['other.fontSize.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyFontSizeGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyFontWeightGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography font weight for non-default variant', () => {
            const fontWeight = '700';
            const meta = createTestingGeneratorMeta({
                theme: defineTheme({
                    fontWeight: defineFontWeightVariable('normal', { bold: fontWeight })
                }),
                path: ['fontWeight', 'bold']
            });
            const result = typographyFontWeightGenerator.generate(fontWeight, meta);
            expect(result).toEqual(['--font-weight-bold: 700;']);
        });

        it('should generate css variables for typography font weight for default variant', () => {
            const fontWeight = '700';
            const meta = createTestingGeneratorMeta({
                theme: defineTheme({
                    fontWeight: defineFontWeightVariable(fontWeight)
                }),
                path: ['fontWeight', 'default']
            });
            const result = typographyFontWeightGenerator.generate(fontWeight, meta);
            expect(result).toEqual(['--font-weight: 700;']);
        });
    });

    describe('match', () => {
        it.each([
            ['fontWeight', false],
            ['fontWeight.default', true],
            ['fontWeight.primary', true],
            ['other.fontWeight.primary', false],
            ['other.fontWeight.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyFontWeightGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyLineHeightGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography line height non-default variant', () => {
            const lineHeight = '1.5';
            const meta = createTestingGeneratorMeta({
                theme: {
                    lineHeight: {
                        __type: ClassificationType.Variable,
                        md: lineHeight
                    }
                },
                path: ['lineHeight', 'md']
            });
            const result = typographyLineHeightGenerator.generate(lineHeight, meta);
            expect(result).toEqual(['--line-height-md: 1.5;']);
        });

        it('should generate css variables for typography line height default variant', () => {
            const lineHeight = '1.5';
            const meta = createTestingGeneratorMeta({
                theme: {
                    lineHeight: {
                        __type: ClassificationType.Variable,
                        default: lineHeight
                    }
                },
                path: ['lineHeight', 'default']
            });
            const result = typographyLineHeightGenerator.generate(lineHeight, meta);
            expect(result).toEqual(['--line-height: 1.5;']);
        });
    });

    describe('match', () => {
        it.each([
            ['lineHeight', false],
            ['lineHeight.default', true],
            ['lineHeight.primary', true],
            ['other.lineHeight.primary', false],
            ['other.lineHeight.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyLineHeightGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyLetterSpacingGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography letter spacing non-default variant', () => {
            const letterSpacing = '0.1em';
            const meta = createTestingGeneratorMeta({
                theme: {
                    letterSpacing: {
                        __type: ClassificationType.Variable,
                        md: letterSpacing
                    }
                },
                path: ['letterSpacing', 'md']
            });
            const result = typographyLetterSpacingGenerator.generate(letterSpacing, meta);
            expect(result).toEqual(['--letter-spacing-md: 0.1em;']);
        });

        it('should generate css variables for typography letter spacing default variant', () => {
            const letterSpacing = '0.1em';
            const meta = createTestingGeneratorMeta({
                theme: {
                    letterSpacing: {
                        __type: ClassificationType.Variable,
                        default: letterSpacing
                    }
                },
                path: ['letterSpacing', 'default']
            });
            const result = typographyLetterSpacingGenerator.generate(letterSpacing, meta);
            expect(result).toEqual(['--letter-spacing: 0.1em;']);
        });
    });

    describe('match', () => {
        it.each([
            ['letterSpacing', false],
            ['letterSpacing.default', true],
            ['letterSpacing.primary', true],
            ['other.letterSpacing.primary', false],
            ['other.letterSpacing.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyLetterSpacingGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});

describe('typographyTextAlignmentGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography text alignment default variant', () => {
            const textAlign = 'center';
            const meta = createTestingGeneratorMeta({
                theme: {
                    textAlign: defineTextAlignmentVariable('left', { center: textAlign })
                },
                path: ['textAlign', 'center']
            });
            const result = typographyTextAlignmentGenerator.generate(textAlign, meta);
            expect(result).toEqual(['--text-align-center: center;']);
        });

        it('should generate css variables for typography text alignment non-default variant', () => {
            const textAlign = 'center';
            const meta = createTestingGeneratorMeta({
                theme: {
                    textAlign: {
                        __type: ClassificationType.Variable,
                        default: textAlign
                    }
                },
                path: ['textAlign', 'default']
            });
            const result = typographyTextAlignmentGenerator.generate(textAlign, meta);
            expect(result).toEqual(['--text-align: center;']);
        });
    });

    describe('match', () => {
        it.each([
            ['textAlign', false],
            ['textAlign.default', true],
            ['textAlign.primary', true],
            ['other.textAlign.primary', false],
            ['other.textAlign.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyTextAlignmentGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});
