import { createColorGenerateFn, colorsGenerator, colorGenerator } from './colors';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassifierType, ResolvedTheme } from '../types';

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
                        $type: ClassifierType.Group,
                        dark: {
                            $type: ClassifierType.PrimitiveVariants,
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
                        $type: ClassifierType.Group,
                        button: {
                            $type: ClassifierType.EntityVariants,
                            default: {
                                $type: ClassifierType.Group,
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
                        $type: ClassifierType.Group,
                        button: {
                            $type: ClassifierType.EntityVariants,
                            primary: {
                                $type: ClassifierType.Group,
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
