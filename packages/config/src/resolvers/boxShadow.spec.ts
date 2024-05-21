import { resolveBoxShadow, resolveBoxShadowVariant, boxShadowResolver } from './boxShadow';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveBoxShadow', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow', 'default'] });

    it('should return the same boxShadow when boxShadow is an object', () => {
        const boxShadow = {
            offsetX: '10px',
            offsetY: '20px',
            blurRadius: '30px',
            spreadRadius: '40px',
            color: '#000'
        };
        const result = resolveBoxShadow(boxShadow, meta);
        expect(result).toEqual(boxShadow);
    });

    it('should assign all properties with the same value when boxShadow is a single value string', () => {
        const result = resolveBoxShadow('10px 20px 30px 40px #000', meta);
        expect(result).toEqual({
            offsetX: '10px',
            offsetY: '20px',
            blurRadius: '30px',
            spreadRadius: '40px',
            color: '#000'
        });
    });
});

describe('resolveBoxShadowVariant', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow', 'variant'] });

    it('should return the same boxShadow when variant is a string', () => {
        const variant = '10px 20px 30px 40px #000';
        const result = resolveBoxShadowVariant(variant, meta);
        expect(result).toEqual({
            offsetX: '10px',
            offsetY: '20px',
            blurRadius: '30px',
            spreadRadius: '40px',
            color: '#000'
        });
    });

    it('should return the boxShadow with css variables when variant is an object', () => {
        const variant = {
            offsetX: 'var(--shadow-offset-x)',
            offsetY: 'var(--shadow-offset-y)',
            blurRadius: 'var(--shadow-blur-radius)',
            spreadRadius: 'var(--shadow-spread-radius)',
            color: 'var(--shadow-color)'
        };
        const result = resolveBoxShadowVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('boxShadowResolver', () => {
    describe('match', () => {
        it.each([
            ['boxShadow.default', true],
            ['boxShadow.default.offsetX', false],
            ['components.button.default.boxShadow', true],
            ['other.boxShadow.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (boxShadowResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
