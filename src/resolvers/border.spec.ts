import { assignBorder, borderResolver, resolveBorder, resolveBorderVariant } from './border';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('assignBorder', () => {
    it('should correctly parse a border string into a Border object', () => {
        const borderString = '1px solid black';
        const expected = {
            width: '1px',
            style: 'solid',
            color: 'black'
        };
        const result = assignBorder(borderString);
        expect(result).toEqual(expected);
    });

    it('should handle extra spaces within the border string', () => {
        const borderString = '2px  dashed  blue';
        const expected = {
            width: '2px',
            style: 'dashed',
            color: 'blue'
        };
        const result = assignBorder(borderString);
        expect(result).toEqual(expected);
    });
});

describe('resolveBorder', () => {
    const meta = createTestingResolverMeta({ path: ['border'] });

    it('should correctly resolve a simple border string for all sides', () => {
        const input = '1px solid black';
        const expected = {
            top: { width: '1px', style: 'solid', color: 'black' },
            right: { width: '1px', style: 'solid', color: 'black' },
            bottom: { width: '1px', style: 'solid', color: 'black' },
            left: { width: '1px', style: 'solid', color: 'black' }
        };

        const result = resolveBorder(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve individual border properties', () => {
        const input = {
            top: '2px dashed red',
            right: '3px dotted green',
            bottom: '4px double blue',
            left: '5px groove yellow'
        };
        const expected = {
            top: { width: '2px', style: 'dashed', color: 'red' },
            right: { width: '3px', style: 'dotted', color: 'green' },
            bottom: { width: '4px', style: 'double', color: 'blue' },
            left: { width: '5px', style: 'groove', color: 'yellow' }
        };

        const result = resolveBorder(input, meta);
        expect(result).toEqual(expected);
    });

    it('should handle mixed border types', () => {
        const input = {
            top: '2px dashed red',
            right: { width: '3px', style: 'dotted', color: 'green' },
            bottom: '4px double blue',
            left: { width: '5px', style: 'groove', color: 'yellow' }
        };
        const expected = {
            top: { width: '2px', style: 'dashed', color: 'red' },
            right: { width: '3px', style: 'dotted', color: 'green' },
            bottom: { width: '4px', style: 'double', color: 'blue' },
            left: { width: '5px', style: 'groove', color: 'yellow' }
        };

        const result = resolveBorder(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('resolveBorderVariant', () => {
    const meta = createTestingResolverMeta({ path: ['border'] });

    it('should correctly resolve a simple border string for all sides', () => {
        const input = '1px solid black';
        const expected = {
            top: { width: '1px', style: 'solid', color: 'black' },
            right: { width: '1px', style: 'solid', color: 'black' },
            bottom: { width: '1px', style: 'solid', color: 'black' },
            left: { width: '1px', style: 'solid', color: 'black' }
        };

        const result = resolveBorderVariant(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve individual border properties', () => {
        const input = {
            top: '2px dashed red',
            right: '3px dotted green',
            bottom: '4px double blue',
            left: '5px groove yellow'
        };
        const expected = {
            top: { width: '2px', style: 'dashed', color: 'red' },
            right: { width: '3px', style: 'dotted', color: 'green' },
            bottom: { width: '4px', style: 'double', color: 'blue' },
            left: { width: '5px', style: 'groove', color: 'yellow' }
        };

        const result = resolveBorderVariant(input, meta);
        expect(result).toEqual(expected);
    });

    it('should handle mixed border types', () => {
        const input = {
            top: '2px dashed red',
            right: { width: '3px', style: 'dotted', color: 'green' },
            bottom: '4px double blue',
            left: { width: '5px', style: 'groove', color: 'yellow' }
        };
        const expected = {
            top: { width: '2px', style: 'dashed', color: 'red' },
            right: { width: '3px', style: 'dotted', color: 'green' },
            bottom: { width: '4px', style: 'double', color: 'blue' },
            left: { width: '5px', style: 'groove', color: 'yellow' }
        };

        const result = resolveBorderVariant(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('borderResolver', () => {
    const meta = createTestingResolverMeta({ path: ['border'] });

    it('should correctly resolve a simple border string for all sides', () => {
        const input = '1px solid black';
        const expectedBorder = assignBorder(input);
        const expected = {
            default: {
                top: expectedBorder,
                right: expectedBorder,
                bottom: expectedBorder,
                left: expectedBorder
            }
        };

        const result = borderResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve border with variants', () => {
        const input = {
            default: '2px dashed red',
            hover: '3px dotted green'
        };
        const expectedDefaultBorder = assignBorder(input.default);
        const expectedHoverBorder = assignBorder(input.hover);
        const expected = {
            default: {
                top: expectedDefaultBorder,
                right: expectedDefaultBorder,
                bottom: expectedDefaultBorder,
                left: expectedDefaultBorder
            },
            hover: {
                top: expectedHoverBorder,
                right: expectedHoverBorder,
                bottom: expectedHoverBorder,
                left: expectedHoverBorder
            }
        };

        const result = borderResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });
});
