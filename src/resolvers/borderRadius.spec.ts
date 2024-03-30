import {
    assignBorderRadius,
    borderRadiusResolver,
    resolveBorderRadius,
    resolveBorderRadiusVariant
} from './borderRadius';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('assignBorderRadius', () => {
    it('should assign the same border radius to all sides if a single value is provided', () => {
        const borderRadius = '5px';
        const expected = { topLeft: '5px', topRight: '5px', bottomRight: '5px', bottomLeft: '5px' };
        const result = assignBorderRadius(borderRadius);
        expect(result).toEqual(expected);
    });

    it('should assign correct border radius values for two values provided', () => {
        const borderRadius = '5px 10px';
        const expected = {
            topLeft: '5px',
            topRight: '10px',
            bottomRight: '5px',
            bottomLeft: '10px'
        };
        const result = assignBorderRadius(borderRadius);
        expect(result).toEqual(expected);
    });

    it('should assign correct border radius values for three values provided', () => {
        const borderRadius = '5px 10px 15px';
        const expected = {
            topLeft: '5px',
            topRight: '10px',
            bottomRight: '15px',
            bottomLeft: '10px'
        };
        const result = assignBorderRadius(borderRadius);
        expect(result).toEqual(expected);
    });

    it('should assign correct border radius values for four values provided', () => {
        const borderRadius = '5px 10px 15px 20px';
        const expected = {
            topLeft: '5px',
            topRight: '10px',
            bottomRight: '15px',
            bottomLeft: '20px'
        };
        const result = assignBorderRadius(borderRadius);
        expect(result).toEqual(expected);
    });
});

describe('resolveBorderRadius', () => {
    const meta = createTestingResolverMeta({ path: ['borderRadius'] });

    it('should correctly resolve borderRadius from string without var', () => {
        const input = '5px 10px 15px 20px';
        const expected = {
            topLeft: '5px',
            topRight: '10px',
            bottomRight: '15px',
            bottomLeft: '20px'
        };

        const result = resolveBorderRadius(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve borderRadius from string with var', () => {
        const input = 'var(--border-radius)';
        const expected = {
            topLeft: 'var(--border-radius)',
            topRight: 'var(--border-radius)',
            bottomRight: 'var(--border-radius)',
            bottomLeft: 'var(--border-radius)'
        };

        const result = resolveBorderRadius(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve borderRadius from object', () => {
        const input = { topLeft: '5px', topRight: '10px', bottomRight: '15px', bottomLeft: '20px' };
        const expected = { ...input };

        const result = resolveBorderRadius(input, meta);
        expect(result).toEqual(expected);
    });
});

describe('resolveBorderRadiusVariant', () => {
    const meta = createTestingResolverMeta({ path: ['borderRadius', 'variant1'] });

    it('should correctly resolve borderRadius variant with css variables', () => {
        const variant = {};
        const expected = {
            topLeft: 'var(--border-top-left-radius)',
            topRight: 'var(--border-top-right-radius)',
            bottomRight: 'var(--border-bottom-right-radius)',
            bottomLeft: 'var(--border-bottom-left-radius)'
        };

        const result = resolveBorderRadiusVariant(variant, meta);
        expect(result).toEqual(expected);
    });

    it('should apply modifiers to the resolved borderRadius variant', () => {
        const variant = { add: '2px' };
        const expected = {
            topLeft: 'calc(var(--border-top-left-radius) + 2px)',
            topRight: 'calc(var(--border-top-right-radius) + 2px)',
            bottomRight: 'calc(var(--border-bottom-right-radius) + 2px)',
            bottomLeft: 'calc(var(--border-bottom-left-radius) + 2px)'
        };

        const result = resolveBorderRadiusVariant(variant, meta);
        expect(result).toEqual(expected);
    });

    it('should ignore non-existent modifiers', () => {
        const variant = { nonExistentModifier: '3px' };
        const expected = {
            topLeft: 'var(--border-top-left-radius)',
            topRight: 'var(--border-top-right-radius)',
            bottomRight: 'var(--border-bottom-right-radius)',
            bottomLeft: 'var(--border-bottom-left-radius)'
        };

        const result = resolveBorderRadiusVariant(variant, meta);
        expect(result).toEqual(expected);
    });
});

describe('borderRadiusResolver', () => {
    const meta = createTestingResolverMeta({ path: ['borderRadius'] });

    it('should correctly resolve a simple borderRadius string', () => {
        const input = '5px';
        const expected = {
            default: { topLeft: '5px', topRight: '5px', bottomRight: '5px', bottomLeft: '5px' }
        };

        const result = borderRadiusResolver.resolve(input, meta);
        expect(result).toEqual(expected);
    });

    it('should correctly resolve borderRadius with variants', () => {
        const input = {
            default: '5px',
            hover: { add: '2px' }
        };
        const expectedDefault = {
            topLeft: '5px',
            topRight: '5px',
            bottomRight: '5px',
            bottomLeft: '5px'
        };
        const expectedHover = {
            topLeft: 'calc(var(--border-top-left-radius) + 2px)',
            topRight: 'calc(var(--border-top-right-radius) + 2px)',
            bottomRight: 'calc(var(--border-bottom-right-radius) + 2px)',
            bottomLeft: 'calc(var(--border-bottom-left-radius) + 2px)'
        };

        const result = borderRadiusResolver.resolve(input, meta);
        expect(result.default).toEqual(expectedDefault);
        expect(result.hover).toEqual(expectedHover);
    });
});
