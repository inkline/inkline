import { resolveScaleRatio, resolveScaleRatioVariant, scaleRatiosResolver } from './scaleRatios';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveScaleRatio', () => {
    const meta = createTestingResolverMeta({ path: ['scaleRatios', 'default'] });

    it('should return the same scale ratio value', () => {
        const input = 1.618;
        const expected = 1.618;

        const result = resolveScaleRatio(input, meta);
        expect(result).toBe(expected);
    });
});

describe('resolveScaleRatioVariant', () => {
    const meta = createTestingResolverMeta({ path: ['scaleRatios', 'golden'] });

    it('should return the same scale ratio variant value', () => {
        const input = 2.618;
        const expected = 2.618;

        const result = resolveScaleRatioVariant(input, meta);
        expect(result).toBe(expected);
    });
});

describe('scaleRatiosResolver', () => {
    const meta = createTestingResolverMeta({ path: ['scaleRatios'] });

    it('should correctly resolve scale ratios without variants', () => {
        const input = {
            default: 1.618,
            golden: 1.618,
            silver: 2.414
        };
        const expected = {
            default: 1.618,
            golden: 1.618,
            silver: 2.414
        };

        const result = scaleRatiosResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });
});
