import {
    assignBorderRadius,
    borderRadiusResolver,
    resolveBorderRadius,
    resolveBorderRadiusVariant
} from './borderRadius';
import { createTestingResolverMeta } from '../__tests__/utils';
import { borderResolver } from './border';
import { matchKey } from '../utils';

describe('assignBorderRadius', () => {
    it('should assign all sides with the same value when one value is provided', () => {
        const result = assignBorderRadius('10px');
        expect(result).toEqual({
            topLeft: '10px',
            topRight: '10px',
            bottomRight: '10px',
            bottomLeft: '10px'
        });
    });

    it('should assign horizontal and vertical sides differently when two values are provided', () => {
        const result = assignBorderRadius('10px 20px');
        expect(result).toEqual({
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '10px',
            bottomLeft: '20px'
        });
    });

    it('should assign each side a different value when four values are provided', () => {
        const result = assignBorderRadius('10px 20px 30px 40px');
        expect(result).toEqual({
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '30px',
            bottomLeft: '40px'
        });
    });

    it('should assign top/bottom and left/right sides differently when three values are provided', () => {
        const result = assignBorderRadius('10px 20px 30px');
        expect(result).toEqual({
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '30px',
            bottomLeft: '20px'
        });
    });
});

describe('resolveBorderRadius', () => {
    const meta = createTestingResolverMeta({ path: ['borderRadius', 'default'] });

    it('should return the same borderRadius when borderRadius is an object', () => {
        const borderRadius = {
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '30px',
            bottomLeft: '40px'
        };
        const result = resolveBorderRadius(borderRadius, meta);
        expect(result).toEqual(borderRadius);
    });

    it('should assign all sides with the same value when borderRadius is a single value string', () => {
        const result = resolveBorderRadius('15px', meta);
        expect(result).toEqual({
            topLeft: '15px',
            topRight: '15px',
            bottomRight: '15px',
            bottomLeft: '15px'
        });
    });

    it('should assign all sides with the same value when borderRadius is a variable', () => {
        const result = resolveBorderRadius('var(--radius)', meta);
        expect(result).toEqual({
            topLeft: 'var(--radius)',
            topRight: 'var(--radius)',
            bottomRight: 'var(--radius)',
            bottomLeft: 'var(--radius)'
        });
    });

    it('should assign different values to sides when borderRadius is a multi value string', () => {
        const result = resolveBorderRadius('10px 20px 30px 40px', meta);
        expect(result).toEqual({
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '30px',
            bottomLeft: '40px'
        });
    });
});

describe('resolveBorderRadiusVariant', () => {
    const meta = createTestingResolverMeta({ path: ['borderRadius', 'variant'] });

    it('should return the same borderRadius when variant is a string', () => {
        const variant = '10px 20px 30px 40px';
        const result = resolveBorderRadiusVariant(variant, meta);
        expect(result).toEqual({
            topLeft: '10px',
            topRight: '20px',
            bottomRight: '30px',
            bottomLeft: '40px'
        });
    });

    it('should return the borderRadius with css variables when variant is an object', () => {
        const variant = {
            topLeft: 'var(--border-top-left-radius)',
            topRight: 'var(--border-top-right-radius)',
            bottomRight: 'var(--border-bottom-right-radius)',
            bottomLeft: 'var(--border-bottom-left-radius)'
        };
        const result = resolveBorderRadiusVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should modify the borderRadius with modifiers when variant is an object with modifiers', () => {
        const variant = {
            add: '5px'
        };
        const result = resolveBorderRadiusVariant(variant, meta);
        expect(result).toEqual({
            bottomLeft: 'calc(var(--border-bottom-left-radius) + 5px)',
            bottomRight: 'calc(var(--border-bottom-right-radius) + 5px)',
            topLeft: 'calc(var(--border-top-left-radius) + 5px)',
            topRight: 'calc(var(--border-top-right-radius) + 5px)'
        });
    });
});

describe('borderRadiusResolver', () => {
    describe('match', () => {
        it.each([
            ['borderRadius.default', true],
            ['borderRadius.default.topLeft', false],
            ['components.button.default.borderRadius', true],
            ['other.borderRadius.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (borderRadiusResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
