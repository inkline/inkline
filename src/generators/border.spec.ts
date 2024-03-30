import { borderGenerator, generateBorder } from './border';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('generateBorder', () => {
    it('should generate correct border CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['border', 'default'] });
        const border = {
            top: { width: '1px', style: 'solid', color: '#000' },
            right: { width: '1px', style: 'solid', color: '#000' },
            bottom: { width: '1px', style: 'solid', color: '#000' },
            left: { width: '1px', style: 'solid', color: '#000' }
        };

        const result = generateBorder(border, meta);

        expect(result).toEqual([
            '--border-top-width: 1px',
            '--border-top-style: solid',
            '--border-top-color: #000',
            '--border-top: var(--border-top-width) var(--border-top-style) var(--border-top-color)',
            '--border-right-width: 1px',
            '--border-right-style: solid',
            '--border-right-color: #000',
            '--border-right: var(--border-right-width) var(--border-right-style) var(--border-right-color)',
            '--border-bottom-width: 1px',
            '--border-bottom-style: solid',
            '--border-bottom-color: #000',
            '--border-bottom: var(--border-bottom-width) var(--border-bottom-style) var(--border-bottom-color)',
            '--border-left-width: 1px',
            '--border-left-style: solid',
            '--border-left-color: #000',
            '--border-left: var(--border-left-width) var(--border-left-style) var(--border-left-color)',
            '--border-width: var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width)',
            '--border-style: var(--border-top-style) var(--border-right-style) var(--border-bottom-style) var(--border-left-style)',
            '--border-color: var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color)',
            '--border: var(--border-top)'
        ]);
    });

    it('should generate correct border CSS variables for custom variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['border', 'custom'] });
        const border = {
            top: { width: '2px', style: 'dashed', color: '#fff' },
            right: { width: '2px', style: 'dashed', color: '#fff' },
            bottom: { width: '2px', style: 'dashed', color: '#fff' },
            left: { width: '2px', style: 'dashed', color: '#fff' }
        };

        const result = generateBorder(border, meta);

        expect(result).toEqual([
            '--border-top-width-custom: 2px',
            '--border-top-style-custom: dashed',
            '--border-top-color-custom: #fff',
            '--border-top-custom: var(--border-top-width-custom) var(--border-top-style-custom) var(--border-top-color-custom)',
            '--border-right-width-custom: 2px',
            '--border-right-style-custom: dashed',
            '--border-right-color-custom: #fff',
            '--border-right-custom: var(--border-right-width-custom) var(--border-right-style-custom) var(--border-right-color-custom)',
            '--border-bottom-width-custom: 2px',
            '--border-bottom-style-custom: dashed',
            '--border-bottom-color-custom: #fff',
            '--border-bottom-custom: var(--border-bottom-width-custom) var(--border-bottom-style-custom) var(--border-bottom-color-custom)',
            '--border-left-width-custom: 2px',
            '--border-left-style-custom: dashed',
            '--border-left-color-custom: #fff',
            '--border-left-custom: var(--border-left-width-custom) var(--border-left-style-custom) var(--border-left-color-custom)',
            '--border-width-custom: var(--border-top-width-custom) var(--border-right-width-custom) var(--border-bottom-width-custom) var(--border-left-width-custom)',
            '--border-style-custom: var(--border-top-style-custom) var(--border-right-style-custom) var(--border-bottom-style-custom) var(--border-left-style-custom)',
            '--border-color-custom: var(--border-top-color-custom) var(--border-right-color-custom) var(--border-bottom-color-custom) var(--border-left-color-custom)',
            '--border-custom: var(--border-top-custom)'
        ]);
    });
});

describe('borderGenerator', () => {
    it('should generate correct border CSS variables for border with variants', () => {
        const meta = createTestingGeneratorMeta({ path: ['border'] });
        const border = {
            default: {
                top: { width: '1px', style: 'solid', color: '#000' },
                right: { width: '1px', style: 'solid', color: '#000' },
                bottom: { width: '1px', style: 'solid', color: '#000' },
                left: { width: '1px', style: 'solid', color: '#000' }
            },
            custom: {
                top: { width: '2px', style: 'dashed', color: '#fff' },
                right: { width: '2px', style: 'dashed', color: '#fff' },
                bottom: { width: '2px', style: 'dashed', color: '#fff' },
                left: { width: '2px', style: 'dashed', color: '#fff' }
            }
        };

        const result = borderGenerator.generate(border, meta);

        expect(result).toEqual([
            '--border-top-width: 1px',
            '--border-top-style: solid',
            '--border-top-color: #000',
            '--border-top: var(--border-top-width) var(--border-top-style) var(--border-top-color)',
            '--border-right-width: 1px',
            '--border-right-style: solid',
            '--border-right-color: #000',
            '--border-right: var(--border-right-width) var(--border-right-style) var(--border-right-color)',
            '--border-bottom-width: 1px',
            '--border-bottom-style: solid',
            '--border-bottom-color: #000',
            '--border-bottom: var(--border-bottom-width) var(--border-bottom-style) var(--border-bottom-color)',
            '--border-left-width: 1px',
            '--border-left-style: solid',
            '--border-left-color: #000',
            '--border-left: var(--border-left-width) var(--border-left-style) var(--border-left-color)',
            '--border-width: var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width)',
            '--border-style: var(--border-top-style) var(--border-right-style) var(--border-bottom-style) var(--border-left-style)',
            '--border-color: var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color)',
            '--border: var(--border-top)',
            '--border-top-width-custom: 2px',
            '--border-top-style-custom: dashed',
            '--border-top-color-custom: #fff',
            '--border-top-custom: var(--border-top-width-custom) var(--border-top-style-custom) var(--border-top-color-custom)',
            '--border-right-width-custom: 2px',
            '--border-right-style-custom: dashed',
            '--border-right-color-custom: #fff',
            '--border-right-custom: var(--border-right-width-custom) var(--border-right-style-custom) var(--border-right-color-custom)',
            '--border-bottom-width-custom: 2px',
            '--border-bottom-style-custom: dashed',
            '--border-bottom-color-custom: #fff',
            '--border-bottom-custom: var(--border-bottom-width-custom) var(--border-bottom-style-custom) var(--border-bottom-color-custom)',
            '--border-left-width-custom: 2px',
            '--border-left-style-custom: dashed',
            '--border-left-color-custom: #fff',
            '--border-left-custom: var(--border-left-width-custom) var(--border-left-style-custom) var(--border-left-color-custom)',
            '--border-width-custom: var(--border-top-width-custom) var(--border-right-width-custom) var(--border-bottom-width-custom) var(--border-left-width-custom)',
            '--border-style-custom: var(--border-top-style-custom) var(--border-right-style-custom) var(--border-bottom-style-custom) var(--border-left-style-custom)',
            '--border-color-custom: var(--border-top-color-custom) var(--border-right-color-custom) var(--border-bottom-color-custom) var(--border-left-color-custom)',
            '--border-custom: var(--border-top-custom)'
        ]);
    });
});
