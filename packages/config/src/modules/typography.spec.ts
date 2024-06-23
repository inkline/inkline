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
    typographyContrastColorGenerator,
    typographyFontFamilyGenerator,
    typographyFontSizeGenerator,
    typographyFontWeightGenerator,
    typographyLineHeightGenerator,
    typographyLetterSpacingGenerator,
    typographyTextAlignmentGenerator
} from './typography';
import { createTestingResolverMeta, createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassificationType, ResolvedTheme } from '../types';

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

describe('typographyColorGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography color default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        color: {
                            __type: ClassificationType.Group,
                            primary: {
                                __type: ClassificationType.Variable,
                                default: color
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'color', 'primary', 'default']
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

        it('should generate css variables for typography color non-default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        color: {
                            __type: ClassificationType.Group,
                            primary: {
                                __type: ClassificationType.Variable,
                                'shade-100': color
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'color', 'primary', 'shade-100']
            });
            const result = typographyColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--text-color-primary-shade-100-h: 0;',
                '--text-color-primary-shade-100-s: 0%;',
                '--text-color-primary-shade-100-l: 0%;',
                '--text-color-primary-shade-100-a: 1;',
                '--text-color-primary-shade-100: hsla(var(--text-color-primary-shade-100-h) var(--text-color-primary-shade-100-s) var(--text-color-primary-shade-100-l) / var(--text-color-primary-shade-100-a));'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.color', false],
            ['typography.color.primary', false],
            ['typography.color.primary.default', true],
            ['typography.color.primary.other', true],
            ['other.typography.color.primary', false],
            ['other.typography.color.primary.path', false]
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
                    typography: {
                        __type: ClassificationType.Group,
                        contrastColor: {
                            __type: ClassificationType.Group,
                            primary: {
                                __type: ClassificationType.Variable,
                                default: color
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'contrastColor', 'primary', 'default']
            });
            const result = typographyContrastColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--contrast-text-color-primary-h: 0;',
                '--contrast-text-color-primary-s: 0%;',
                '--contrast-text-color-primary-l: 100%;',
                '--contrast-text-color-primary-a: 1;',
                '--contrast-text-color-primary: hsla(var(--contrast-text-color-primary-h) var(--contrast-text-color-primary-s) var(--contrast-text-color-primary-l) / var(--contrast-text-color-primary-a));'
            ]);
        });

        it('should generate css variables for typography contrast color for non-default variant', () => {
            const color = { h: '0', s: '0%', l: '100%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        contrastColor: {
                            __type: ClassificationType.Group,
                            primary: {
                                __type: ClassificationType.Variable,
                                'shade-100': color
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'contrastColor', 'primary', 'shade-100']
            });
            const result = typographyContrastColorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--contrast-text-color-primary-shade-100-h: 0;',
                '--contrast-text-color-primary-shade-100-s: 0%;',
                '--contrast-text-color-primary-shade-100-l: 100%;',
                '--contrast-text-color-primary-shade-100-a: 1;',
                '--contrast-text-color-primary-shade-100: hsla(var(--contrast-text-color-primary-shade-100-h) var(--contrast-text-color-primary-shade-100-s) var(--contrast-text-color-primary-shade-100-l) / var(--contrast-text-color-primary-shade-100-a));'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.contrastColor', false],
            ['typography.contrastColor.primary', false],
            ['typography.contrastColor.primary.default', true],
            ['typography.contrastColor.primary.other', true],
            ['other.typography.contrastColor.primary', false],
            ['other.typography.contrastColor.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyContrastColorGenerator.key as RegExp[]).some((key) =>
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
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        fontFamily: {
                            __type: ClassificationType.Variable,
                            primary: fontFamily
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'fontFamily', 'primary']
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
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        fontFamily: {
                            __type: ClassificationType.Variable,
                            default: fontFamily
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'fontFamily', 'default']
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
            ['typography', false],
            ['typography.fontFamily', false],
            ['typography.fontFamily.default', true],
            ['typography.fontFamily.primary', true],
            ['other.typography.fontFamily.primary', false],
            ['other.typography.fontFamily.primary.path', false]
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
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        fontSize: {
                            __type: ClassificationType.Variable,
                            md: fontSize
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'fontSize', 'md']
            });
            const result = typographyFontSizeGenerator.generate(fontSize, meta);
            expect(result).toEqual(['--font-size-md: 1rem;']);
        });

        it('should generate css variables for typography font size for default variant', () => {
            const fontSize = '1rem';
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        fontSize: {
                            __type: ClassificationType.Variable,
                            default: fontSize
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'fontSize', 'default']
            });
            const result = typographyFontSizeGenerator.generate(fontSize, meta);
            expect(result).toEqual(['--font-size: 1rem;']);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.fontSize', false],
            ['typography.fontSize.default', true],
            ['typography.fontSize.primary', true],
            ['other.typography.fontSize.primary', false],
            ['other.typography.fontSize.primary.path', false]
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
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        fontWeight: {
                            __type: ClassificationType.Variable,
                            bold: fontWeight
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'fontWeight', 'bold']
            });
            const result = typographyFontWeightGenerator.generate(fontWeight, meta);
            expect(result).toEqual(['--font-weight-bold: 700;']);
        });

        it('should generate css variables for typography font weight for default variant', () => {
            const fontWeight = '700';
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        fontWeight: {
                            __type: ClassificationType.Variable,
                            default: fontWeight
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'fontWeight', 'default']
            });
            const result = typographyFontWeightGenerator.generate(fontWeight, meta);
            expect(result).toEqual(['--font-weight: 700;']);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.fontWeight', false],
            ['typography.fontWeight.default', true],
            ['typography.fontWeight.primary', true],
            ['other.typography.fontWeight.primary', false],
            ['other.typography.fontWeight.primary.path', false]
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
                    typography: {
                        __type: ClassificationType.Group,
                        lineHeight: {
                            __type: ClassificationType.Variable,
                            md: lineHeight
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'lineHeight', 'md']
            });
            const result = typographyLineHeightGenerator.generate(lineHeight, meta);
            expect(result).toEqual(['--line-height-md: 1.5;']);
        });

        it('should generate css variables for typography line height default variant', () => {
            const lineHeight = '1.5';
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        lineHeight: {
                            __type: ClassificationType.Variable,
                            default: lineHeight
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'lineHeight', 'default']
            });
            const result = typographyLineHeightGenerator.generate(lineHeight, meta);
            expect(result).toEqual(['--line-height: 1.5;']);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.lineHeight', false],
            ['typography.lineHeight.default', true],
            ['typography.lineHeight.primary', true],
            ['other.typography.lineHeight.primary', false],
            ['other.typography.lineHeight.primary.path', false]
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
                    typography: {
                        __type: ClassificationType.Group,
                        letterSpacing: {
                            __type: ClassificationType.Variable,
                            md: letterSpacing
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'letterSpacing', 'md']
            });
            const result = typographyLetterSpacingGenerator.generate(letterSpacing, meta);
            expect(result).toEqual(['--letter-spacing-md: 0.1em;']);
        });

        it('should generate css variables for typography letter spacing default variant', () => {
            const letterSpacing = '0.1em';
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        letterSpacing: {
                            __type: ClassificationType.Variable,
                            default: letterSpacing
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'letterSpacing', 'default']
            });
            const result = typographyLetterSpacingGenerator.generate(letterSpacing, meta);
            expect(result).toEqual(['--letter-spacing: 0.1em;']);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.letterSpacing', false],
            ['typography.letterSpacing.default', true],
            ['typography.letterSpacing.primary', true],
            ['other.typography.letterSpacing.primary', false],
            ['other.typography.letterSpacing.primary.path', false]
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
                    typography: {
                        __type: ClassificationType.Group,
                        textAlign: {
                            __type: ClassificationType.Variable,
                            center: textAlign
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'textAlign', 'center']
            });
            const result = typographyTextAlignmentGenerator.generate(textAlign, meta);
            expect(result).toEqual(['--text-align-center: center;']);
        });

        it('should generate css variables for typography text alignment non-default variant', () => {
            const textAlign = 'center';
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        __type: ClassificationType.Group,
                        textAlign: {
                            __type: ClassificationType.Variable,
                            default: textAlign
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['typography', 'textAlign', 'default']
            });
            const result = typographyTextAlignmentGenerator.generate(textAlign, meta);
            expect(result).toEqual(['--text-align: center;']);
        });
    });

    describe('match', () => {
        it.each([
            ['typography', false],
            ['typography.textAlign', false],
            ['typography.textAlign.default', true],
            ['typography.textAlign.primary', true],
            ['other.typography.textAlign.primary', false],
            ['other.typography.textAlign.primary.path', false]
        ])('should match "%s" path', (path, result) => {
            const match = (typographyTextAlignmentGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});
