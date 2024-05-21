import { generateScaleRatio, scaleRatiosGenerator } from './scaleRatios';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { ClassifierType, ResolvedTheme } from '../types';
import { matchKey } from '../utils';

describe('generateScaleRatio', () => {
    it('should generate scale ratio css variables for default variant', () => {
        const value = 1.5;
        const meta = createTestingGeneratorMeta({
            theme: {
                scaleRatios: {
                    $type: ClassifierType.PrimitiveVariants,
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
                    $type: ClassifierType.PrimitiveVariants,
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
                        $type: ClassifierType.PrimitiveVariants,
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
                        $type: ClassifierType.PrimitiveVariants,
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
