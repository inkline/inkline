import { assignBorder, borderResolver, resolveBorder, resolveBorderVariant } from './border';
import { createTestingResolverMeta } from '../__tests__/utils';
import type { BorderSide } from '../types';
import { matchKey } from '../utils';

describe('assignBorder()', () => {
    it('should correctly parse a well-formed border string', () => {
        const result = assignBorder('5px solid red');
        expect(result).toEqual({ width: '5px', style: 'solid', color: 'red' });
    });

    it('should handle extra spaces between properties', () => {
        const result = assignBorder('5px  solid   red');
        expect(result).toEqual({ width: '5px', style: 'solid', color: 'red' });
    });

    it('should return undefined properties if parts are missing', () => {
        const result = assignBorder('5px solid');
        expect(result).toEqual({ width: '5px', style: 'solid', color: undefined });
    });

    it('should handle an empty input string', () => {
        const result = assignBorder('');
        expect(result).toEqual({ width: '', style: undefined, color: undefined });
    });
});

describe('resolveBorder()', () => {
    const meta = createTestingResolverMeta();

    it('should handle a single string input by assigning the same border to all sides', () => {
        const border = '2px dashed blue';
        const resolved = resolveBorder(border, meta);
        const expectedBorder = assignBorder(border);
        expect(resolved).toEqual({
            top: expectedBorder,
            right: expectedBorder,
            bottom: expectedBorder,
            left: expectedBorder
        });
    });

    it('should handle individual border properties by assigning the same border to all sides', () => {
        const border = { width: '3px', style: 'solid', color: 'black' };
        const resolved = resolveBorder(border, meta);
        expect(resolved).toEqual({
            top: border,
            right: border,
            bottom: border,
            left: border
        });
    });

    it('should handle separate border definitions for each side when provided', () => {
        const borders = {
            top: '1px solid red',
            right: '2px dotted green',
            bottom: '3px dashed blue',
            left: '4px double yellow'
        };
        const resolved = resolveBorder(borders, meta);
        expect(resolved).toEqual({
            top: assignBorder(borders.top),
            right: assignBorder(borders.right),
            bottom: assignBorder(borders.bottom),
            left: assignBorder(borders.left)
        });
    });

    it('should handle mixed types of borders correctly', () => {
        const borders = {
            top: '1px solid red',
            right: { width: '2px', style: 'dotted', color: 'green' },
            bottom: '3px dashed blue',
            left: { width: '4px', style: 'double', color: 'yellow' }
        };
        const resolved = resolveBorder(borders, meta);
        expect(resolved).toEqual({
            top: assignBorder(borders.top),
            right: borders.right,
            bottom: assignBorder(borders.bottom),
            left: borders.left
        });
    });

    it('should handle missing border sides with default values', () => {
        const borders = {
            top: '1px solid red',
            left: '4px double yellow'
        } as Record<BorderSide, string>;

        const resolved = resolveBorder(borders, meta);
        expect(resolved).toEqual({
            top: assignBorder(borders.top),
            right: undefined,
            bottom: undefined,
            left: assignBorder(borders.left)
        });
    });
});

describe('resolveBorderVariant()', () => {
    it('should be a wrapper around "resolveBorder"', () => {
        expect(resolveBorderVariant).toBe(resolveBorder);
    });
});

describe('borderResolver', () => {
    describe('match', () => {
        it.each([
            ['border', false],
            ['border.default', true],
            ['border.default.width', false],
            ['border.default.top', false],
            ['components.button.default.border', true],
            ['other.border.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (borderResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
