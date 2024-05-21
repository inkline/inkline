import { generateBorder, borderGenerator } from './border';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

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
