import { resolveBoxShadow, resolveBoxShadowVariant, boxShadowResolver } from './boxShadow';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveBoxShadow', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow'] });

    it('should correctly parse a box shadow string', () => {
        const input = '10px 5px 5px 0px black';
        const expected = {
            offsetX: '10px',
            offsetY: '5px',
            blurRadius: '5px',
            spreadRadius: '0px',
            color: 'black'
        };

        const result = resolveBoxShadow(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly handle a box shadow object', () => {
        const input = {
            offsetX: '10px',
            offsetY: '5px',
            blurRadius: '5px',
            spreadRadius: '0px',
            color: 'red'
        };
        const expected = { ...input };

        const result = resolveBoxShadow(input, meta);
        expect(result).toEqual(expected);
    });

    it('should default spreadRadius to "0" if not provided in string', () => {
        const input = '10px 5px 5px red';
        const expected = {
            offsetX: '10px',
            offsetY: '5px',
            blurRadius: '5px',
            spreadRadius: '0',
            color: 'red'
        };

        const result = resolveBoxShadow(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('resolveBoxShadowVariant', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow', 'sm'] });

    it('should return the same box shadow variant value', () => {
        const input = '15px 10px 10px 5px blue';
        const expected = {
            offsetX: '15px',
            offsetY: '10px',
            blurRadius: '10px',
            spreadRadius: '5px',
            color: 'blue'
        };

        const result = resolveBoxShadowVariant(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('boxShadowResolver', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow'] });

    it('should correctly resolve box shadows without variants', () => {
        const input = '3px 3px 5px 0px grey';
        const expected = {
            default: resolveBoxShadow(input, meta)
        };

        const result = boxShadowResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve box shadows with variants', () => {
        const input = {
            default: '3px 3px 5px 0px grey',
            hover: '5px 5px 8px 0px grey',
            focus: {
                offsetX: '10px',
                offsetY: '10px',
                blurRadius: '20px',
                spreadRadius: '0px',
                color: 'navy'
            }
        };
        const expected = {
            default: resolveBoxShadow(input.default, meta),
            hover: resolveBoxShadow(input.hover, meta),
            focus: resolveBoxShadow(input.focus, meta)
        };

        const result = boxShadowResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });
});
