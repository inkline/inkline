import {
    generateSizeMultiplier,
    resolveSizeMultiplier,
    resolveSizeMultiplierVariant,
    sizeMultiplierGenerator,
    sizeMultiplierResolver
} from './sizeMultiplier';
import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
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
            ['sizeMultiplier', false],
            ['sizeMultiplier.default', true],
            ['sizeMultiplier.default.mobile', false],
            ['components.button.default.sizeMultiplier', false],
            ['other.sizeMultiplier.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = matchKey(path, sizeMultiplierResolver.key as RegExp);
            expect(match).toBe(result);
        });
    });
});

describe('generateSizeMultiplier', () => {
    it('should generate css variables for size multiplier', () => {
        const meta = createTestingGeneratorMeta({ path: ['sizeMultiplier', 'md'] });
        const result = generateSizeMultiplier(1.5, meta);
        expect(result).toEqual(['--size-multiplier-md: 1.5;']);
    });
});

describe('sizeMultiplierGenerator', () => {
    describe('match', () => {
        it.each([
            ['size', false],
            ['sizeMultiplier', false],
            ['sizeMultiplier.default', true],
            ['sizeMultiplier.md', true],
            ['components.button.sizeMultiplier.md', false],
            ['other.sizeMultiplier.md.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = matchKey(path, sizeMultiplierGenerator.key as string);
            expect(match).toBe(result);
        });
    });
});
