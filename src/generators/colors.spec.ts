import { colorsGenerator, generateColor } from './colors';
import { ResolvedTheme } from '../types';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('generateColor', () => {
    it('should generate correct color CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['colors', 'primary', 'default'] });
        const color = { h: 0, s: 100, l: 50, a: 1 };

        const result = generateColor(color, meta);

        expect(result).toContain('--color-primary--h: 0');
        expect(result).toContain('--color-primary--s: 100%');
        expect(result).toContain('--color-primary--l: 50%');
        expect(result).toContain('--color-primary--a: 1');
        expect(result).toContain(
            '--color-primary: hsla(var(--color-primary--h), var(--color-primary--s), var(--color-primary--l), var(--color-primary--a))'
        );
    });

    it('should generate correct color CSS variables for custom variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['colors', 'primary', 'custom'] });
        const color = { h: 0, s: 100, l: 50, a: 1 };

        const result = generateColor(color, meta);

        expect(result).toContain('--color-primary-custom--h: 0');
        expect(result).toContain('--color-primary-custom--s: 100%');
        expect(result).toContain('--color-primary-custom--l: 50%');
        expect(result).toContain('--color-primary-custom--a: 1');
        expect(result).toContain(
            '--color-primary-custom: hsla(var(--color-primary-custom--h), var(--color-primary-custom--s), var(--color-primary-custom--l), var(--color-primary-custom--a))'
        );
    });

    it('should handle color properties as strings correctly', () => {
        const meta = createTestingGeneratorMeta({ path: ['colors', 'primary', 'default'] });
        const color = { h: '0', s: '100%', l: '50%', a: '1' };

        const result = generateColor(color, meta);

        expect(result).toContain('--color-primary--h: 0');
        expect(result).toContain('--color-primary--s: 100%');
        expect(result).toContain('--color-primary--l: 50%');
        expect(result).toContain('--color-primary--a: 1');
        expect(result).toContain(
            '--color-primary: hsla(var(--color-primary--h), var(--color-primary--s), var(--color-primary--l), var(--color-primary--a))'
        );
    });
});

describe('colorsGenerator', () => {
    const meta = createTestingGeneratorMeta({ path: ['colors'] });

    it('should correctly generate tokens for a single color', () => {
        const colors: ResolvedTheme['colors'] = {
            primary: { default: { h: 0, s: 100, l: 50, a: 1 } }
        };
        const tokens = colorsGenerator.generate(colors, meta);
        expect(tokens).toEqual([
            '--color-primary--h: 0',
            '--color-primary--s: 100%',
            '--color-primary--l: 50%',
            '--color-primary--a: 1',
            '--color-primary: hsla(var(--color-primary--h), var(--color-primary--s), var(--color-primary--l), var(--color-primary--a))'
        ]);
    });

    it('should correctly generate tokens for multiple colors', () => {
        const colors: ResolvedTheme['colors'] = {
            primary: { default: { h: 0, s: 100, l: 50, a: 1 } },
            secondary: {
                default: {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'var(--color-primary--l)',
                    a: 'var(--color-primary--a)'
                }
            }
        };
        const tokens = colorsGenerator.generate(colors, meta);
        expect(tokens).toEqual([
            '--color-primary--h: 0',
            '--color-primary--s: 100%',
            '--color-primary--l: 50%',
            '--color-primary--a: 1',
            '--color-primary: hsla(var(--color-primary--h), var(--color-primary--s), var(--color-primary--l), var(--color-primary--a))',
            '--color-secondary--h: var(--color-primary--h)',
            '--color-secondary--s: var(--color-primary--s)',
            '--color-secondary--l: var(--color-primary--l)',
            '--color-secondary--a: var(--color-primary--a)',
            '--color-secondary: hsla(var(--color-secondary--h), var(--color-secondary--s), var(--color-secondary--l), var(--color-secondary--a))'
        ]);
    });

    it('should correctly generate tokens for a color with variants using CSS variables', () => {
        const colors: ResolvedTheme['colors'] = {
            primary: {
                default: { h: 0, s: 100, l: 50, a: 1 },
                'shade-150': {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'calc(var(--color-primary--l) - 15%)',
                    a: 'var(--color-primary--a)'
                },
                'tint-150': {
                    h: 'var(--color-primary--h)',
                    s: 'var(--color-primary--s)',
                    l: 'calc(var(--color-primary--l) + 15%)',
                    a: 'var(--color-primary--a)'
                }
            }
        };
        const tokens = colorsGenerator.generate(colors, meta);
        expect(tokens).toEqual([
            '--color-primary--h: 0',
            '--color-primary--s: 100%',
            '--color-primary--l: 50%',
            '--color-primary--a: 1',
            '--color-primary: hsla(var(--color-primary--h), var(--color-primary--s), var(--color-primary--l), var(--color-primary--a))',
            '--color-primary-shade-150--h: var(--color-primary--h)',
            '--color-primary-shade-150--s: var(--color-primary--s)',
            '--color-primary-shade-150--l: calc(var(--color-primary--l) - 15%)',
            '--color-primary-shade-150--a: var(--color-primary--a)',
            '--color-primary-shade-150: hsla(var(--color-primary-shade-150--h), var(--color-primary-shade-150--s), var(--color-primary-shade-150--l), var(--color-primary-shade-150--a))',
            '--color-primary-tint-150--h: var(--color-primary--h)',
            '--color-primary-tint-150--s: var(--color-primary--s)',
            '--color-primary-tint-150--l: calc(var(--color-primary--l) + 15%)',
            '--color-primary-tint-150--a: var(--color-primary--a)',
            '--color-primary-tint-150: hsla(var(--color-primary-tint-150--h), var(--color-primary-tint-150--s), var(--color-primary-tint-150--l), var(--color-primary-tint-150--a))'
        ]);
    });
});
