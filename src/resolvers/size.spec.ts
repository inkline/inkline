import {
    resolveSizeMultiplierVariant,
    resolveSizePercentage,
    resolveSizePercentageVariant,
    sizeMultiplierResolver,
    sizePercentagesResolver
} from './size';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveSizeMultiplierVariant', () => {
    it('should resolve size multiplier variant for numeric values', () => {
        const variant = 1.5;
        const meta = createTestingResolverMeta({ path: ['size', 'multiplier'] });

        const result = resolveSizeMultiplierVariant(variant, meta);
        expect(result).toEqual(1.5);
    });

    it('should resolve size multiplier variant for string values', () => {
        const variant = '1.5';
        const meta = createTestingResolverMeta({ path: ['size', 'multiplier'] });

        const result = resolveSizeMultiplierVariant(variant, meta);
        expect(result).toEqual('1.5');
    });
});

describe('resolveSizeMultiplierVariant', () => {
    it('should resolve size multiplier variant for numeric values', () => {
        const variant = 1.5;
        const meta = createTestingResolverMeta({ path: ['size', 'multiplier', 'default'] });

        const result = resolveSizeMultiplierVariant(variant, meta);
        expect(result).toEqual(1.5);
    });

    it('should resolve size multiplier variant for string values', () => {
        const variant = '1.5';
        const meta = createTestingResolverMeta({ path: ['size', 'multiplier', 'custom'] });

        const result = resolveSizeMultiplierVariant(variant, meta);
        expect(result).toEqual('1.5');
    });
});

describe('sizeMultiplierResolver', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'multiplier'] });

    it('should resolve size multiplier for numeric values', () => {
        const value = 1.5;
        const resolvedTheme = sizeMultiplierResolver.resolve(value, meta);

        expect(resolvedTheme).toEqual({
            default: 1.5
        });
    });

    it('should resolve size multiplier for string values', () => {
        const value = '1.5';
        const resolvedTheme = sizeMultiplierResolver.resolve(value, meta);

        expect(resolvedTheme).toEqual({
            default: '1.5'
        });
    });

    it('should resolve size multiplier variant for object values', () => {
        const value = { default: 1.5, compact: 1.2 };
        const resolvedTheme = sizeMultiplierResolver.resolve(value, meta);

        expect(resolvedTheme).toEqual({ default: 1.5, compact: 1.2 });
    });
});

describe('resolveSizePercentage', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'percentages'] });

    it('should resolve size percentage for numeric values', () => {
        const percentage = 50;
        const result = resolveSizePercentage(percentage, meta);
        expect(result).toEqual('50%');
    });

    it('should resolve size percentage for string values', () => {
        const percentage = '50%';
        const result = resolveSizePercentage(percentage, meta);
        expect(result).toEqual('50%');
    });
});

describe('resolveSizePercentageVariant', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'percentages', 'default'] });

    it('should resolve size percentage for numeric values', () => {
        const percentage = 50;
        const result = resolveSizePercentageVariant(percentage, meta);
        expect(result).toEqual('50%');
    });

    it('should resolve size percentage for string values', () => {
        const percentage = '50%';
        const result = resolveSizePercentageVariant(percentage, meta);
        expect(result).toEqual('50%');
    });
});

describe('sizePercentagesResolver', () => {
    const meta = createTestingResolverMeta({ path: ['size', 'percentages'] });

    it('should resolve size percentages for numeric values', () => {
        const rawTheme = 50;
        const resolvedTheme = sizePercentagesResolver.resolve(rawTheme, meta);

        expect(resolvedTheme).toEqual({
            default: '50%'
        });
    });

    it('should resolve size percentages for string values', () => {
        const rawTheme = '50%';
        const resolvedTheme = sizePercentagesResolver.resolve(rawTheme, meta);

        expect(resolvedTheme).toEqual({
            default: '50%'
        });
    });

    it('should resolve size percentages variant for object values', () => {
        const rawTheme = { default: 50, compact: '40%' };
        const resolvedTheme = sizePercentagesResolver.resolve(rawTheme, meta);

        expect(resolvedTheme).toEqual({ default: '50%', compact: '40%' });
    });
});
