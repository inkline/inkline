import { createTestingGeneratorMeta } from '../__tests__/utils';
import { generatePercentage, sizeMultiplierGenerator, sizePercentagesGenerator } from './size';

describe('sizeMultiplierGenerator', () => {
    it('should generate correct size multiplier CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'multiplier'] });
        const sizeMultiplier = 1.5;

        const result = sizeMultiplierGenerator.generate(sizeMultiplier, meta);

        expect(result).toEqual(['--size-multiplier: 1.5']);
    });
});

describe('generatePercentage', () => {
    it('should generate correct size percentage CSS variable for number percentage', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'percentages', '50'] });
        const percentage: number = 50;

        const result = generatePercentage(percentage, meta);

        expect(result).toContain('--size-percentage-50: 50%');
    });

    it('should generate correct size percentage CSS variable for string percentage', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'percentages', 'half'] });
        const percentage: string = '50%';

        const result = generatePercentage(percentage, meta);

        expect(result).toContain('--size-percentage-half: 50%');
    });

    it('should generate correct size percentage CSS variable for custom variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'percentages', 'custom'] });
        const percentage: number = 75;

        const result = generatePercentage(percentage, meta);

        expect(result).toContain('--size-percentage-custom: 75%');
    });
});

describe('sizePercentagesGenerator', () => {
    it('should generate correct size percentage CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'percentages'] });
        const sizePercentages = {
            '0': '0%',
            '50': '50%',
            '100': '100%',
            '200': '200%'
        };

        const result = sizePercentagesGenerator.generate(sizePercentages, meta);

        expect(result).toEqual([
            '--size-percentage-0: 0%',
            '--size-percentage-50: 50%',
            '--size-percentage-100: 100%',
            '--size-percentage-200: 200%'
        ]);
    });
});
