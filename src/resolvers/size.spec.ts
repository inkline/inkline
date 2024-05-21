import {
    resolveSizeMultiplier,
    resolveSizeMultiplierVariant,
    sizeMultiplierResolver,
    resolveSizePercentage,
    resolveSizePercentageVariant,
    sizePercentagesResolver
} from './size';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveSizeMultiplier', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'multiplier'] });

    it('should return the same multiplier when multiplier is a number', () => {
        const multiplier = 1.5;
        const result = resolveSizeMultiplier(multiplier, meta);
        expect(result).toEqual(multiplier);
    });

    it('should return the multiplier with css variables when multiplier is a variable', () => {
        const multiplier = 'var(--multiplier)';
        const result = resolveSizeMultiplier(multiplier, meta);
        expect(result).toEqual(multiplier);
    });
});

describe('resolveSizeMultiplierVariant', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'multiplier', 'variant'] });

    it('should return the same multiplier when variant is a number', () => {
        const variant = 2.0;
        const result = resolveSizeMultiplierVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should return the multiplier with css variables when variant is a variable', () => {
        const variant = 'var(--multiplier-variant)';
        const result = resolveSizeMultiplierVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('sizeMultiplierResolver', () => {
    describe('match', () => {
        it.each([
            ['size.multiplier', false],
            ['size.multiplier.default', true],
            ['size.multiplier.default.mobile', false],
            ['components.button.default.size.multiplier', false],
            ['other.size.multiplier.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = matchKey(path, sizeMultiplierResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

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
