import {
    resolveSpacing,
    resolveSpacingWithSides,
    spacingResolver,
    marginResolver,
    paddingResolver,
    resolveSpacingVariant,
    resolveSpacingWithSidesVariant
} from './spacing';
import { createTestingResolverMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('resolveSpacing', () => {
    const meta = createTestingResolverMeta({ path: ['spacing', 'default'] });

    it('should return the same spacing when spacing is a number', () => {
        const spacing = 10;
        const result = resolveSpacing(spacing, meta);
        expect(result).toEqual(`${spacing}px`);
    });

    it('should return the spacing with css variables when spacing is a variable', () => {
        const spacing = 'var(--spacing)';
        const result = resolveSpacing(spacing, meta);
        expect(result).toEqual(spacing);
    });
});

describe('resolveSpacingVariant', () => {
    const meta = createTestingResolverMeta({ path: ['spacing', 'variant'] });

    it('should return the same spacing when variant is a number', () => {
        const variant = 10;
        const result = resolveSpacingVariant(variant, meta);
        expect(result).toEqual('10px');
    });

    it('should return the spacing with css variables when variant is a variable', () => {
        const variant = 'var(--spacing-variant)';
        const result = resolveSpacingVariant(variant, meta);
        expect(result).toEqual(variant);
    });

    it('should modify the spacing with modifiers when variant is an object with modifiers', () => {
        const variant = {
            add: '5px',
            subtract: '2px',
            multiply: '2',
            divide: '2'
        };
        const result = resolveSpacingVariant(variant, meta);
        expect(result).toEqual('calc(calc(calc(calc(var(--spacing) + 5px) - 2px) * 2) / 2)');
    });
});

describe('resolveSpacingWithSides', () => {
    const meta = createTestingResolverMeta({ path: ['spacing', 'sides'] });

    it('should return the same spacing when spacing is a string', () => {
        const spacing = '10px 20px 30px 40px';
        const result = resolveSpacingWithSides(spacing, meta);
        expect(result).toEqual({
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        });
    });

    it('should return the spacing with css variables when spacing is a variable', () => {
        const spacing = 'var(--spacing)';
        const result = resolveSpacingWithSides(spacing, meta);
        expect(result).toEqual({
            top: spacing,
            right: spacing,
            bottom: spacing,
            left: spacing
        });
    });
});

describe('resolveSpacingVariant', () => {
    const meta = createTestingResolverMeta({ path: ['spacing', 'variant'] });

    it('should return the same spacing when variant is a string', () => {
        const variant = '10px 20px 30px 40px';
        const result = resolveSpacingWithSidesVariant('spacing')(variant, meta);
        expect(result).toEqual({
            top: '10px',
            right: '20px',
            bottom: '30px',
            left: '40px'
        });
    });

    it('should return the spacing with css variables when variant is a variable', () => {
        const variant = 'var(--spacing-variant)';
        const result = resolveSpacingWithSidesVariant('spacing')(variant, meta);
        expect(result).toEqual({
            top: variant,
            right: variant,
            bottom: variant,
            left: variant
        });
    });

    it('should modify the spacing with modifiers when variant is an object with modifiers', () => {
        const variant = {
            top: '5px',
            right: '10px',
            bottom: '15px',
            left: '20px',
            add: '5px',
            subtract: '2px',
            multiply: '2',
            divide: '2'
        };
        const result = resolveSpacingWithSidesVariant('spacing')(variant, meta);
        expect(result).toEqual({
            top: 'calc(calc(calc(calc(5px + 5px) - 2px) * 2) / 2)',
            right: 'calc(calc(calc(calc(10px + 5px) - 2px) * 2) / 2)',
            bottom: 'calc(calc(calc(calc(15px + 5px) - 2px) * 2) / 2)',
            left: 'calc(calc(calc(calc(20px + 5px) - 2px) * 2) / 2)'
        });
    });
});

describe('spacingResolver', () => {
    describe('match', () => {
        it.each([
            ['spacing', false],
            ['spacing.default', true],
            ['spacing.default.left', false],
            ['components.button.default.spacing', true],
            ['other.spacing.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (spacingResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('marginResolver', () => {
    describe('match', () => {
        it.each([
            ['margin', false],
            ['margin.default', true],
            ['margin.default.left', false],
            ['components.button.default.margin', true],
            ['other.margin.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (marginResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('paddingResolver', () => {
    describe('match', () => {
        it.each([
            ['padding', false],
            ['padding.default', true],
            ['padding.default.left', false],
            ['components.button.default.padding', true],
            ['other.padding.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (paddingResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
