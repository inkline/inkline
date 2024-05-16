import {
    typographyColorGenerator,
    typographyContrastColorGenerator,
    typographyFontFamilyGenerator,
    typographyFontSizeGenerator,
    typographyFontWeightGenerator,
    typographyLineHeightGenerator,
    typographyLetterSpacingGenerator,
    typographyTextAlignmentGenerator
} from './typography';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { ClassifierType, ResolvedTheme } from '../types';
import { matchKey } from '../utils';

describe('typographyColorGenerator', () => {
    describe('generate', () => {
        it('should generate css variables for typography color default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    typography: {
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        color: {
                            $type: ClassifierType.Group,
                            primary: {
                                $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        color: {
                            $type: ClassifierType.Group,
                            primary: {
                                $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        contrastColor: {
                            $type: ClassifierType.Group,
                            primary: {
                                $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        contrastColor: {
                            $type: ClassifierType.Group,
                            primary: {
                                $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        fontFamily: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        fontFamily: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        fontSize: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        fontSize: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        fontWeight: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        fontWeight: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        lineHeight: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        lineHeight: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        letterSpacing: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        letterSpacing: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        textAlign: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $ignoreKey: true,
                        $type: ClassifierType.Group,
                        textAlign: {
                            $type: ClassifierType.PrimitiveVariants,
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
