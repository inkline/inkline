import { createTestingGeneratorMeta } from '../__tests__/utils';
import { generateScaleRatio, scaleRatiosGenerator } from './scaleRatios';

describe('generateScaleRatio', () => {
    it('should generate correct scale ratio CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['scaleRatios', 'default'] });
        const scaleRatio = 1.5;

        const result = generateScaleRatio(scaleRatio, meta);

        expect(result).toEqual([
            '--scale-ratio: 1.5',
            '--scale-ratio-pow-1: calc(var(--scale-ratio))',
            '--scale-ratio-pow-2: calc(var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-3: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-4: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-5: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-6: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))'
        ]);
    });

    it('should generate correct scale ratio CSS variables for non-default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['scaleRatios', 'custom'] });
        const scaleRatio = 2;

        const result = generateScaleRatio(scaleRatio, meta);

        expect(result).toEqual(['--scale-ratio-custom: 2']);
    });
});

describe('scaleRatiosGenerator', () => {
    it('should generate correct scale ratio CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['scaleRatios'] });
        const scaleRatios = {
            default: 1.5,
            custom: 2,
            golden: 1.618
        };

        const result = scaleRatiosGenerator.generate(scaleRatios, meta);

        expect(result).toEqual([
            '--scale-ratio: 1.5',
            '--scale-ratio-pow-1: calc(var(--scale-ratio))',
            '--scale-ratio-pow-2: calc(var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-3: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-4: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-5: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-pow-6: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
            '--scale-ratio-custom: 2',
            '--scale-ratio-golden: 1.618'
        ]);
    });
});
