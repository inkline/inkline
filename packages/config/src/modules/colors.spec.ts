import {
    resolveColor,
    resolveColorVariant,
    colorsResolver,
    colorGenerator,
    colorsGenerator,
    createColorGenerateFn
} from './colors';
import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassificationType, ResolvedTheme } from '../types';

describe('resolveColor', () => {
    const meta = createTestingResolverMeta({ path: ['colors', 'default'] });

    it('should return the same color when color is a string', () => {
        const color = '#ff0000';
        const result = resolveColor(color, meta);
        expect(result).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });

    it('should return the color with css variables when color is a variable', () => {
        const color = 'var(--color)';
        const result = resolveColor(color, meta);
        expect(result).toEqual({
            h: 'var(--color-h)',
            s: 'var(--color-s)',
            l: 'var(--color-l)',
            a: 'var(--color-a)'
        });
    });

    it('should return the color when color is "transparent"', () => {
        const color = 'transparent';
        const result = resolveColor(color, meta);
        expect(result).toEqual('transparent');
    });

    it('should return the color when color is "inherit"', () => {
        const color = 'inherit';
        const result = resolveColor(color, meta);
        expect(result).toEqual('inherit');
    });

    it('should return the color when color is an RGB object', () => {
        const color = { r: 255, g: 0, b: 0, a: 1 };
        const result = resolveColor(color, meta);
        expect(result).toEqual({ h: 0, s: 100, l: 50, a: 1 });
    });

    it('should return the color when color is an HSLA object', () => {
        const color = { h: 0, s: 100, l: 50, a: 1 };
        const result = resolveColor(color, meta);
        expect(result).toEqual(color);
    });
});

describe('resolveColorVariant', () => {
    const meta = createTestingResolverMeta({ path: ['colors', 'variant'] });

    it('should return the same color when variant is a string', () => {
        const variant = '#00ff00';
        const result = resolveColorVariant(variant, meta);
        expect(result).toEqual({ h: 120, s: 100, l: 50, a: 1 });
    });

    it('should return the color with css variables when variant is a variable', () => {
        const variant = 'var(--color-variant)';
        const result = resolveColorVariant(variant, meta);
        expect(result).toEqual({
            h: 'var(--color-variant-h)',
            s: 'var(--color-variant-s)',
            l: 'var(--color-variant-l)',
            a: 'var(--color-variant-a)'
        });
    });

    it('should modify the color with modifiers when variant is an object with modifiers', () => {
        const variant = {
            lighten: '0.2',
            darken: '0.1',
            saturate: '0.3',
            desaturate: '0.4',
            rotate: '45',
            fade: '0.5',
            opaquer: '0.6'
        };
        const result = resolveColorVariant(variant, meta);
        expect(result).toEqual({
            a: 'calc(calc(var(--color-colors-a) - var(--color-colors-a) * 0.5) + calc(var(--color-colors-a) - var(--color-colors-a) * 0.5) * 0.6)',
            h: 'calc(var(--color-colors-h) + 45)',
            l: 'calc(calc(var(--color-colors-l) + var(--color-colors-l) * 0.2) - calc(var(--color-colors-l) + var(--color-colors-l) * 0.2) * 0.1)',
            s: 'calc(calc(var(--color-colors-s) + var(--color-colors-s) * 0.3) - calc(var(--color-colors-s) + var(--color-colors-s) * 0.3) * 0.4)'
        });
    });
});

describe('colorsResolver', () => {
    describe('match', () => {
        it.each([
            ['colors', false],
            ['colors.red', false],
            ['colors.red.default', true],
            ['colors.red.default.h', false],
            ['components.button.default.color', true],
            ['components.button.default.color.h', false],
            ['other.colors.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (colorsResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('createColorGenerateFn', () => {
    it('should generate color css variables for default color variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['colors', 'dark', 'default'] });
        const color = { h: '0', s: '0%', l: '0%', a: '1' };
        const result = createColorGenerateFn('color-dark')(color, meta);
        expect(result).toEqual([
            '--color-dark-h: 0;',
            '--color-dark-s: 0%;',
            '--color-dark-l: 0%;',
            '--color-dark-a: 1;',
            '--color-dark: hsla(var(--color-dark-h) var(--color-dark-s) var(--color-dark-l) / var(--color-dark-a));'
        ]);
    });

    it('should generate color css variables for non-default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['colors', 'dark', 'tint-100'] });
        const color = { h: '0', s: '0%', l: '100%', a: '1' };
        const result = createColorGenerateFn('color-dark-tint-100')(color, meta);
        expect(result).toEqual([
            '--color-dark-tint-100-h: 0;',
            '--color-dark-tint-100-s: 0%;',
            '--color-dark-tint-100-l: 100%;',
            '--color-dark-tint-100-a: 1;',
            '--color-dark-tint-100: hsla(var(--color-dark-tint-100-h) var(--color-dark-tint-100-s) var(--color-dark-tint-100-l) / var(--color-dark-tint-100-a));'
        ]);
    });
});

describe('colorsGenerator', () => {
    describe('generate', () => {
        it('should generate color css variables for default color variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    colors: {
                        __type: ClassificationType.Group,
                        dark: {
                            __type: ClassificationType.Variable,
                            default: color
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['colors', 'dark', 'default']
            });
            const result = colorsGenerator.generate(color, meta);
            expect(result).toEqual([
                '--color-dark-h: 0;',
                '--color-dark-s: 0%;',
                '--color-dark-l: 0%;',
                '--color-dark-a: 1;',
                '--color-dark: hsla(var(--color-dark-h) var(--color-dark-s) var(--color-dark-l) / var(--color-dark-a));'
            ]);
        });

        it('should generate color css variables for non-default variant', () => {
            const meta = createTestingGeneratorMeta({ path: ['colors', 'dark', 'tint-100'] });
            const color = { h: '0', s: '0%', l: '100%', a: '1' };
            const result = colorsGenerator.generate(color, meta);
            expect(result).toEqual([
                '--color-dark-tint-100-h: 0;',
                '--color-dark-tint-100-s: 0%;',
                '--color-dark-tint-100-l: 100%;',
                '--color-dark-tint-100-a: 1;',
                '--color-dark-tint-100: hsla(var(--color-dark-tint-100-h) var(--color-dark-tint-100-s) var(--color-dark-tint-100-l) / var(--color-dark-tint-100-a));'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['colors', false],
            ['colors.red', false],
            ['colors.red.default', true],
            ['colors.red.default.h', false],
            ['components.button.default.colors', false],
            ['other.colors.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (colorsGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('colorGenerator', () => {
    describe('generate', () => {
        it('should generate color css variables for default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    components: {
                        __type: ClassificationType.Group,
                        button: {
                            __type: ClassificationType.Element,
                            default: {
                                __type: ClassificationType.Group,
                                color
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['components', 'button', 'default', 'color']
            });
            const result = colorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--button--color-h: 0;',
                '--button--color-s: 0%;',
                '--button--color-l: 0%;',
                '--button--color-a: 1;'
            ]);
        });

        it('should generate color css variables for non-default variant', () => {
            const color = { h: '0', s: '0%', l: '0%', a: '1' };
            const meta = createTestingGeneratorMeta({
                theme: {
                    components: {
                        __type: ClassificationType.Group,
                        button: {
                            __type: ClassificationType.Element,
                            primary: {
                                __type: ClassificationType.Group,
                                color
                            }
                        }
                    }
                } as unknown as ResolvedTheme,
                path: ['components', 'button', 'primary', 'color']
            });
            const result = colorGenerator.generate(color, meta);
            expect(result).toEqual([
                '--button--primary--color-h: 0;',
                '--button--primary--color-s: 0%;',
                '--button--primary--color-l: 0%;',
                '--button--primary--color-a: 1;'
            ]);
        });
    });

    describe('match', () => {
        it.each([
            ['color', false],
            ['color.default', false],
            ['color.default.h', false],
            ['components.button.default.color', true],
            ['other.color.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (colorGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
