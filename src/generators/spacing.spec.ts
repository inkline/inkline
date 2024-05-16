import {
    generateMargin,
    marginGenerator,
    generatePadding,
    paddingGenerator,
    generateSpacing,
    spacingGenerator
} from './spacing';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

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
