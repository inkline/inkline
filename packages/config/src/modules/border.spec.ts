import { borderResolver, resolveBorder, generateBorder, borderGenerator } from './border';
import { createTestingResolverMeta, createTestingGeneratorMeta } from '../__tests__/utils';
import type { BorderSide } from '../types';
import { matchKey } from '../utils';

describe('resolveBorder()', () => {
    const meta = createTestingResolverMeta();

    it('should handle a single string input by assigning the same border to all sides', () => {
        const border = '2px dashed blue';
        const resolved = resolveBorder(border, meta);
        const expectedBorder = { width: '2px', style: 'dashed', color: 'blue' };
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
            top: { width: '1px', style: 'solid', color: 'red' },
            right: { width: '2px', style: 'dotted', color: 'green' },
            bottom: { width: '3px', style: 'dashed', color: 'blue' },
            left: { width: '4px', style: 'double', color: 'yellow' }
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
            top: { width: '1px', style: 'solid', color: 'red' },
            right: borders.right,
            bottom: { width: '3px', style: 'dashed', color: 'blue' },
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
            top: { width: '1px', style: 'solid', color: 'red' },
            right: {},
            bottom: {},
            left: { width: '4px', style: 'double', color: 'yellow' }
        });
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

describe('generateBorder', () => {
    it('should generate border css variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['border', 'default'] });
        const border = {
            top: { width: '1px', style: 'solid', color: '#000' },
            right: { width: '1px', style: 'solid', color: '#000' },
            bottom: { width: '1px', style: 'solid', color: '#000' },
            left: { width: '1px', style: 'solid', color: '#000' }
        };
        const result = generateBorder(border, meta);
        expect(result).toEqual([
            '--border-top-width: 1px;',
            '--border-top-style: solid;',
            '--border-top-color: #000;',
            '--border-top: var(--border-top-width) var(--border-top-style) var(--border-top-color);',
            '--border-right-width: 1px;',
            '--border-right-style: solid;',
            '--border-right-color: #000;',
            '--border-right: var(--border-right-width) var(--border-right-style) var(--border-right-color);',
            '--border-bottom-width: 1px;',
            '--border-bottom-style: solid;',
            '--border-bottom-color: #000;',
            '--border-bottom: var(--border-bottom-width) var(--border-bottom-style) var(--border-bottom-color);',
            '--border-left-width: 1px;',
            '--border-left-style: solid;',
            '--border-left-color: #000;',
            '--border-left: var(--border-left-width) var(--border-left-style) var(--border-left-color);',
            '--border-width: var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width);',
            '--border-style: var(--border-top-style) var(--border-right-style) var(--border-bottom-style) var(--border-left-style);',
            '--border-color: var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color);',
            '--border: var(--border-top);'
        ]);
    });

    it('should generate border css variables for non-default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['border', 'dashed'] });
        const border = {
            top: { width: '2px', style: 'dashed', color: '#fff' },
            right: { width: '2px', style: 'dashed', color: '#fff' },
            bottom: { width: '2px', style: 'dashed', color: '#fff' },
            left: { width: '2px', style: 'dashed', color: '#fff' }
        };
        const result = generateBorder(border, meta);
        expect(result).toEqual([
            '--border-top-width-dashed: 2px;',
            '--border-top-style-dashed: dashed;',
            '--border-top-color-dashed: #fff;',
            '--border-top-dashed: var(--border-top-width-dashed) var(--border-top-style-dashed) var(--border-top-color-dashed);',
            '--border-right-width-dashed: 2px;',
            '--border-right-style-dashed: dashed;',
            '--border-right-color-dashed: #fff;',
            '--border-right-dashed: var(--border-right-width-dashed) var(--border-right-style-dashed) var(--border-right-color-dashed);',
            '--border-bottom-width-dashed: 2px;',
            '--border-bottom-style-dashed: dashed;',
            '--border-bottom-color-dashed: #fff;',
            '--border-bottom-dashed: var(--border-bottom-width-dashed) var(--border-bottom-style-dashed) var(--border-bottom-color-dashed);',
            '--border-left-width-dashed: 2px;',
            '--border-left-style-dashed: dashed;',
            '--border-left-color-dashed: #fff;',
            '--border-left-dashed: var(--border-left-width-dashed) var(--border-left-style-dashed) var(--border-left-color-dashed);',
            '--border-width-dashed: var(--border-top-width-dashed) var(--border-right-width-dashed) var(--border-bottom-width-dashed) var(--border-left-width-dashed);',
            '--border-style-dashed: var(--border-top-style-dashed) var(--border-right-style-dashed) var(--border-bottom-style-dashed) var(--border-left-style-dashed);',
            '--border-color-dashed: var(--border-top-color-dashed) var(--border-right-color-dashed) var(--border-bottom-color-dashed) var(--border-left-color-dashed);',
            '--border-dashed: var(--border-top-dashed);'
        ]);
    });
});

describe('borderGenerator', () => {
    describe('match', () => {
        it.each([
            ['border', false],
            ['border.default', true],
            ['border.default.width', false],
            ['components.button.default.border', true],
            ['other.border.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (borderGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
