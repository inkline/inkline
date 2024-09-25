import {
    resolveSpacing,
    resolveSpacingWithSides,
    spacingResolver,
    marginResolver,
    paddingResolver,
    resolveSpacingVariant,
    resolveSpacingWithSidesVariant,
    spacingGenerator,
    generateSpacing,
    paddingGenerator,
    generatePadding,
    marginGenerator,
    generateMargin
} from './spacing';
import { createTestingGeneratorMeta, createTestingResolverMeta } from '../__tests__/utils';
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

describe('generateMargin', () => {
    it('should generate css variables for default margin variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['margin', 'default'] });
        const margin = { top: '1rem', right: '2rem', bottom: '1rem', left: '2rem' };
        const result = generateMargin(margin, meta);
        expect(result).toEqual([
            '--margin-top: 1rem;',
            '--margin-right: 2rem;',
            '--margin-bottom: 1rem;',
            '--margin-left: 2rem;',
            '--margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);'
        ]);
    });

    it('should generate css variables for non-default margin variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['margin', 'md'] });
        const margin = { top: '1rem', right: '2rem', bottom: '1rem', left: '2rem' };
        const result = generateMargin(margin, meta);
        expect(result).toEqual([
            '--margin-top-md: 1rem;',
            '--margin-right-md: 2rem;',
            '--margin-bottom-md: 1rem;',
            '--margin-left-md: 2rem;',
            '--margin-md: var(--margin-top-md) var(--margin-right-md) var(--margin-bottom-md) var(--margin-left-md);'
        ]);
    });
});

describe('marginGenerator', () => {
    describe('match', () => {
        it.each([
            ['margin', false],
            ['margin.md', true],
            ['padding.md', false],
            ['spacing.md', false],
            ['components.button.default.margin', true],
            ['other.margin.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (marginGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('generatePadding', () => {
    it('should generate css variables for default padding variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['padding', 'default'] });
        const padding = { top: '1rem', right: '2rem', bottom: '1rem', left: '2rem' };
        const result = generatePadding(padding, meta);
        expect(result).toEqual([
            '--padding-top: 1rem;',
            '--padding-right: 2rem;',
            '--padding-bottom: 1rem;',
            '--padding-left: 2rem;',
            '--padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);'
        ]);
    });

    it('should generate css variables for non-default padding variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['padding', 'md'] });
        const padding = { top: '1rem', right: '2rem', bottom: '1rem', left: '2rem' };
        const result = generatePadding(padding, meta);
        expect(result).toEqual([
            '--padding-top-md: 1rem;',
            '--padding-right-md: 2rem;',
            '--padding-bottom-md: 1rem;',
            '--padding-left-md: 2rem;',
            '--padding-md: var(--padding-top-md) var(--padding-right-md) var(--padding-bottom-md) var(--padding-left-md);'
        ]);
    });
});

describe('paddingGenerator', () => {
    describe('match', () => {
        it.each([
            ['padding', false],
            ['padding.md', true],
            ['margin.md', false],
            ['spacing.md', false],
            ['components.button.default.padding', true],
            ['other.padding.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (paddingGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('generateSpacing', () => {
    it('should generate css variables for default spacing variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['spacing', 'default'] });
        const result = generateSpacing('1rem', meta);
        expect(result).toEqual(['--spacing: 1rem;']);
    });

    it('should generate css variables for non-default spacing variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['spacing', 'md'] });
        const result = generateSpacing('1rem', meta);
        expect(result).toEqual(['--spacing-md: 1rem;']);
    });
});

describe('spacingGenerator', () => {
    describe('match', () => {
        it.each([
            ['spacing', false],
            ['spacing.md', true],
            ['margin.md', false],
            ['padding.md', false],
            ['components.button.default.spacing', true],
            ['other.spacing.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (spacingGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
