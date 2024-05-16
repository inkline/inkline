import { resolveTransition, resolveTransitionVariant, transitionResolver } from './transition';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveTransition', () => {
    const meta = createTestingResolverMeta({ path: ['transition', 'default'] });

    it('should return the same transition when transition is a string', () => {
        const transition = 'all 2s ease';
        const result = resolveTransition(transition, meta);
        expect(result).toEqual({
            property: 'all',
            duration: '2s',
            timingFunction: 'ease'
        });
    });

    it('should return the transition when transition is an object', () => {
        const transition = {
            property: 'opacity',
            duration: '1s',
            timingFunction: 'linear'
        };
        const result = resolveTransition(transition, meta);
        expect(result).toEqual(transition);
    });
});

describe('resolveTransitionVariant', () => {
    const meta = createTestingResolverMeta({ path: ['transition', 'variant'] });

    it('should return the same transition when variant is a string', () => {
        const variant = 'opacity 1s linear';
        const result = resolveTransitionVariant(variant, meta);
        expect(result).toEqual({
            property: 'opacity',
            duration: '1s',
            timingFunction: 'linear'
        });
    });

    it('should return the transition when variant is an object', () => {
        const variant = {
            property: 'opacity',
            duration: '1s',
            timingFunction: 'linear'
        };
        const result = resolveTransitionVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('transitionResolver', () => {
    describe('match', () => {
        it.each([
            ['transition', false],
            ['transition.default', true],
            ['transition.default.property', false],
            ['components.button.default.transition', true],
            ['other.transition.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (transitionResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
