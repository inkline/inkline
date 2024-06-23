import {
    generateScaleRatio,
    resolveScaleRatio,
    resolveScaleRatioVariant,
    scaleRatiosGenerator,
    scaleRatiosResolver
} from './scaleRatios';
import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassificationType, ResolvedTheme } from '../types';

describe('resolveScaleRatio', () => {
    const meta = createTestingResolverMeta({ path: ['scaleRatios', 'default'] });

    it('should return the same scale ratio when scale ratio is a number', () => {
        const scaleRatio = 1.5;
        const result = resolveScaleRatio(scaleRatio, meta);
        expect(result).toEqual(scaleRatio);
    });

    it('should return the scale ratio with css variables when scale ratio is a variable', () => {
        const scaleRatio = 'var(--scale-ratio)';
        const result = resolveScaleRatio(scaleRatio, meta);
        expect(result).toEqual(scaleRatio);
    });
});

describe('resolveScaleRatioVariant', () => {
    const meta = createTestingResolverMeta({ path: ['scaleRatios', 'variant'] });

    it('should return the same scale ratio when variant is a number', () => {
        const variant = 2.0;
        const result = resolveScaleRatioVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should return the scale ratio with css variables when variant is a variable', () => {
        const variant = 'var(--scale-ratio-variant)';
        const result = resolveScaleRatioVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('scaleRatiosResolver', () => {
    describe('match', () => {
        it.each([
            ['scaleRatios', false],
            ['scaleRatios.default', true],
            ['components.button.default.scaleRatios', false],
            ['other.scaleRatios.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, scaleRatiosResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('generateScaleRatio', () => {
    it('should generate scale ratio css variables for default variant', () => {
        const value = 1.5;
        const meta = createTestingGeneratorMeta({
            theme: {
                scaleRatios: {
                    __type: ClassificationType.Variable,
                    __name: 'scaleRatios',
                    default: value
                }
            },
            path: ['scaleRatios', 'default']
        });
        const result = generateScaleRatio(value, meta);
        expect(result).toEqual([
            '--scale-ratio: 1.5;',
            '--scale-ratio-pow-1: calc(var(--scale-ratio));',
            '--scale-ratio-pow-2: calc(var(--scale-ratio) * var(--scale-ratio));',
            '--scale-ratio-pow-3: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));',
            '--scale-ratio-pow-4: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));',
            '--scale-ratio-pow-5: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));',
            '--scale-ratio-pow-6: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));'
        ]);
    });

    it('should generate scale ratio css variables for non-default variant', () => {
        const value = 2;
        const meta = createTestingGeneratorMeta({
            theme: {
                scaleRatios: {
                    __type: ClassificationType.Variable,
                    __name: 'scaleRatios',
                    default: value
                }
            },
            path: ['scaleRatios', 'large']
        });
        const result = generateScaleRatio(value, meta);
        expect(result).toEqual(['--scale-ratio-large: 2;']);
    });
});

describe('scaleRatiosGenerator', () => {
    describe('generate', () => {
        it('should generate scale ratio css variables for default variant', () => {
            const value = 1.5;
            const meta = createTestingGeneratorMeta({
                theme: {
                    scaleRatios: {
                        __type: ClassificationType.Variable,
                        __name: 'scaleRatios',
                        default: value
                    }
                },
                path: ['scaleRatios', 'default']
            });
            const result = scaleRatiosGenerator.generate(1.5, meta);
            expect(result).toEqual([
                '--scale-ratio: 1.5;',
                '--scale-ratio-pow-1: calc(var(--scale-ratio));',
                '--scale-ratio-pow-2: calc(var(--scale-ratio) * var(--scale-ratio));',
                '--scale-ratio-pow-3: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));',
                '--scale-ratio-pow-4: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));',
                '--scale-ratio-pow-5: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));',
                '--scale-ratio-pow-6: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));'
            ]);
        });

        it('should generate scale ratio css variables for non-default variant', () => {
            const value = 2;
            const meta = createTestingGeneratorMeta({
                theme: {
                    scaleRatios: {
                        __type: ClassificationType.Variable,
                        __name: 'scaleRatios',
                        large: value
                    }
                } as unknown as ResolvedTheme,
                path: ['scaleRatios', 'large']
            });
            const result = scaleRatiosGenerator.generate(2, meta);
            expect(result).toEqual(['--scale-ratio-large: 2;']);
        });

        describe('match', () => {
            it.each([
                ['scaleRatios', false],
                ['scaleRatios.default', true],
                ['scaleRatios.large', true],
                ['other.scaleRatios.value', false]
            ])('should match "%s" path => %s', (path, result) => {
                const match = matchKey(path, scaleRatiosGenerator.key as RegExp);
                expect(match).toBe(result);
            });
        });
    });
});
