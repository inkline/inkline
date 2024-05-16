import { resolveScaleRatio, resolveScaleRatioVariant, scaleRatiosResolver } from './scaleRatios';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

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
