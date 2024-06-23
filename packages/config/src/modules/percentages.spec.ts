import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import {
    generatePercentage,
    resolveSizePercentage,
    resolveSizePercentageVariant,
    sizePercentagesGenerator,
    sizePercentagesResolver
} from './percentages';

describe('resolveSizePercentage', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'percentages'] });

    it('should return the same percentage when percentage is a number', () => {
        const percentage = 50;
        const result = resolveSizePercentage(percentage, meta);
        expect(result).toEqual(`${percentage}%`);
    });

    it('should return the percentage with css variables when percentage is a variable', () => {
        const percentage = 'var(--percentage)';
        const result = resolveSizePercentage(percentage, meta);
        expect(result).toEqual(percentage);
    });
});

describe('resolveSizePercentageVariant', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'percentages', 'variant'] });

    it('should return the same percentage when variant is a number', () => {
        const variant = 75;
        const result = resolveSizePercentageVariant(variant, meta);
        expect(result).toEqual(`${variant}%`);
    });

    it('should return the percentage with css variables when variant is a variable', () => {
        const variant = 'var(--percentage-variant)';
        const result = resolveSizePercentageVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('sizePercentagesResolver', () => {
    describe('match', () => {
        it.each([
            ['size.percentages', false],
            ['size.percentages.default', true],
            ['size.percentages.default.mobile', false],
            ['components.button.default.size.percentages', false],
            ['other.size.percentages.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, sizePercentagesResolver.key as RegExp);
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
