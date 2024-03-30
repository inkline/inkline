import {
    typographyColorGenerator,
    typographyContrastColorGenerator,
    typographyFontFamilyGenerator,
    typographyFontSizeGenerator,
    typographyFontWeightGenerator,
    typographyLetterSpacingGenerator,
    typographyLineHeightGenerator
} from './typography';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('typographyFontFamilyGenerator', () => {
    it('should generate correct values for base case', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'fontFamily'] });
        const theme = {
            primary: {
                base: 'Arial',
                monospace: 'Courier New',
                print: 'Times New Roman'
            },
            secondary: {
                base: 'Arial',
                monospace: 'Courier New',
                print: 'Times New Roman'
            },
            default: {
                base: 'var(--font-family-primary-base)',
                monospace: 'var(--font-family-primary-monospace)',
                print: 'var(--font-family-primary-print)'
            }
        };

        const result = typographyFontFamilyGenerator.generate(theme, meta);
        expect(result).toEqual([
            '--font-family-base-primary: Arial',
            '--font-family-monospace-primary: Courier New',
            '--font-family-print-primary: Times New Roman',
            '--font-family-primary: var(--font-family-base-primary)',
            '--font-family-base-secondary: Arial',
            '--font-family-monospace-secondary: Courier New',
            '--font-family-print-secondary: Times New Roman',
            '--font-family-secondary: var(--font-family-base-secondary)',
            '--font-family-base: var(--font-family-primary-base)',
            '--font-family-monospace: var(--font-family-primary-monospace)',
            '--font-family-print: var(--font-family-primary-print)',
            '--font-family: var(--font-family-base)'
        ]);
    });
});

describe('typographyFontSizeGenerator', () => {
    it('should generate correct values', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'fontSize'] });
        const theme = {
            default: '16px',
            variant: '18px',
            variant2: 'calc(var(--font-size) * 1.2)'
        };

        const result = typographyFontSizeGenerator.generate(theme, meta);
        expect(result).toEqual([
            '--font-size: 16px',
            '--font-size-variant: 18px',
            '--font-size-variant-2: calc(var(--font-size) * 1.2)'
        ]);
    });
});

describe('typographyFontWeightGenerator', () => {
    it('should generate correct values', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'fontWeight'] });
        const theme = {
            default: '400',
            bold: '700',
            light: '300'
        };

        const result = typographyFontWeightGenerator.generate(theme, meta);
        expect(result).toEqual([
            '--font-weight: 400',
            '--font-weight-bold: 700',
            '--font-weight-light: 300'
        ]);
    });
});

describe('typographyContrastColorGenerator', () => {
    it('should generate correct values', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'contrastColor'] });
        const theme = {
            default: '#000',
            light: '#333',
            dark: '#fff'
        };

        const result = typographyContrastColorGenerator.generate(theme, meta);
        expect(result).toEqual([
            '--contrast-color: #000',
            '--contrast-color-light: #333',
            '--contrast-color-dark: #fff'
        ]);
    });
});

describe('typographyColorGenerator', () => {
    it('should generate correct values for base case', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'color'] });
        const theme = {
            default: '#000',
            light: '#333',
            dark: '#fff'
        };

        const result = typographyColorGenerator.generate(theme, meta);
        expect(result).toEqual(['--color: #000', '--color-light: #333', '--color-dark: #fff']);
    });
});

describe('typographyLetterSpacingGenerator', () => {
    it('should generate correct values', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'letterSpacing'] });
        const theme = {
            default: '0.1em',
            wide: '0.2em',
            narrow: '0.05em'
        };

        const result = typographyLetterSpacingGenerator.generate(theme, meta);
        expect(result).toEqual([
            '--letter-spacing: 0.1em',
            '--letter-spacing-wide: 0.2em',
            '--letter-spacing-narrow: 0.05em'
        ]);
    });
});

describe('typographyLineHeightGenerator', () => {
    it('should generate correct values for base case', () => {
        const meta = createTestingGeneratorMeta({ path: ['typography', 'lineHeight'] });
        const theme = {
            default: '1.5',
            compact: '1.2',
            cozy: '1.7'
        };

        const result = typographyLineHeightGenerator.generate(theme, meta);
        expect(result).toEqual([
            '--line-height: 1.5',
            '--line-height-compact: 1.2',
            '--line-height-cozy: 1.7'
        ]);
    });
});
