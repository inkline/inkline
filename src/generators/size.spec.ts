import {
    generateSizeMultiplier,
    sizeMultiplierGenerator,
    generatePercentage,
    sizePercentagesGenerator
} from './size';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('generateSizeMultiplier', () => {
    it('should generate css variables for size multiplier', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'multiplier', 'md'] });
        const result = generateSizeMultiplier(1.5, meta);
        expect(result).toEqual(['--size-multiplier-md: 1.5;']);
    });
});

describe('sizeMultiplierGenerator', () => {
    describe('match', () => {
        it.each([
            ['size', false],
            ['size.multiplier', false],
            ['size.multiplier.default', true],
            ['size.multiplier.md', true],
            ['components.button.size.multiplier.md', false],
            ['other.size.multiplier.md.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, sizeMultiplierGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});

describe('generatePercentage', () => {
    it('should generate css variables for size percentage', () => {
        const meta = createTestingGeneratorMeta({ path: ['size', 'percentages', 'half'] });
        const result = generatePercentage(50, meta);
        expect(result).toEqual(['--size-percentage-half: 50%;']);
    });
});

describe('sizePercentagesGenerator', () => {
    describe('match', () => {
        it.each([
            ['size', false],
            ['size.percentages', false],
            ['size.percentages.default', true],
            ['size.percentages.md', true],
            ['components.button.size.percentages.md', false],
            ['other.size.percentages.md.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, sizePercentagesGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});
