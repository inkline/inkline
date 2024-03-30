import { createTestingGeneratorMeta } from '../__tests__/utils';
import { generateSpacing, spacingGenerator } from './spacing';

describe('generateSpacing', () => {
    it('should generate correct spacing CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['spacing', 'default'] });
        const spacing = { top: '10px', right: '20px', bottom: '10px', left: '20px' };

        const result = generateSpacing(spacing, meta);

        expect(result).toEqual([
            '--spacing-top: 10px',
            '--spacing-right: 20px',
            '--spacing-bottom: 10px',
            '--spacing-left: 20px',
            '--spacing: var(--spacing-top) var(--spacing-right) var(--spacing-bottom) var(--spacing-left)',
            '--margin-top: var(--spacing-top)',
            '--margin-right: var(--spacing-right)',
            '--margin-bottom: var(--spacing-bottom)',
            '--margin-left: var(--spacing-left)',
            '--margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left)',
            '--padding-top: var(--spacing-top)',
            '--padding-right: var(--spacing-right)',
            '--padding-bottom: var(--spacing-bottom)',
            '--padding-left: var(--spacing-left)',
            '--padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left)'
        ]);
    });

    it('should generate correct spacing CSS variables for custom variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['spacing', 'custom'] });
        const spacing = { top: '15px', right: '25px', bottom: '15px', left: '25px' };

        const result = generateSpacing(spacing, meta);

        expect(result).toEqual([
            '--spacing-top-custom: 15px',
            '--spacing-right-custom: 25px',
            '--spacing-bottom-custom: 15px',
            '--spacing-left-custom: 25px',
            '--spacing-custom: var(--spacing-top-custom) var(--spacing-right-custom) var(--spacing-bottom-custom) var(--spacing-left-custom)',
            '--margin-top-custom: var(--spacing-top-custom)',
            '--margin-right-custom: var(--spacing-right-custom)',
            '--margin-bottom-custom: var(--spacing-bottom-custom)',
            '--margin-left-custom: var(--spacing-left-custom)',
            '--margin-custom: var(--margin-top-custom) var(--margin-right-custom) var(--margin-bottom-custom) var(--margin-left-custom)',
            '--padding-top-custom: var(--spacing-top-custom)',
            '--padding-right-custom: var(--spacing-right-custom)',
            '--padding-bottom-custom: var(--spacing-bottom-custom)',
            '--padding-left-custom: var(--spacing-left-custom)',
            '--padding-custom: var(--padding-top-custom) var(--padding-right-custom) var(--padding-bottom-custom) var(--padding-left-custom)'
        ]);
    });

    it('should handle spacing as number correctly', () => {
        const meta = createTestingGeneratorMeta({ path: ['spacing', 'default'] });
        const spacing = { top: 10, right: 20, bottom: 10, left: 20 };

        const result = generateSpacing(spacing, meta);

        expect(result).toContain('--spacing-top: 10px');
        expect(result).toContain('--spacing-right: 20px');
        expect(result).toContain('--spacing-bottom: 10px');
        expect(result).toContain('--spacing-left: 20px');
        expect(result).toContain(
            '--spacing: var(--spacing-top) var(--spacing-right) var(--spacing-bottom) var(--spacing-left)'
        );
    });
});

describe('spacingGenerator', () => {
    it('should generate correct spacing CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['spacing'] });
        const spacing = {
            default: { top: '10px', right: '20px', bottom: '10px', left: '20px' },
            custom: {
                top: 'calc(var(--spacing-top) * 1.5)',
                right: '25px',
                bottom: 'calc(var(--spacing-bottom) * 1.5)',
                left: '25px'
            }
        };

        const result = spacingGenerator.generate(spacing, meta);

        expect(result).toEqual([
            '--spacing-top: 10px',
            '--spacing-right: 20px',
            '--spacing-bottom: 10px',
            '--spacing-left: 20px',
            '--spacing: var(--spacing-top) var(--spacing-right) var(--spacing-bottom) var(--spacing-left)',
            '--margin-top: var(--spacing-top)',
            '--margin-right: var(--spacing-right)',
            '--margin-bottom: var(--spacing-bottom)',
            '--margin-left: var(--spacing-left)',
            '--margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left)',
            '--padding-top: var(--spacing-top)',
            '--padding-right: var(--spacing-right)',
            '--padding-bottom: var(--spacing-bottom)',
            '--padding-left: var(--spacing-left)',
            '--padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left)',
            '--spacing-top-custom: calc(var(--spacing-top) * 1.5)',
            '--spacing-right-custom: 25px',
            '--spacing-bottom-custom: calc(var(--spacing-bottom) * 1.5)',
            '--spacing-left-custom: 25px',
            '--spacing-custom: var(--spacing-top-custom) var(--spacing-right-custom) var(--spacing-bottom-custom) var(--spacing-left-custom)',
            '--margin-top-custom: var(--spacing-top-custom)',
            '--margin-right-custom: var(--spacing-right-custom)',
            '--margin-bottom-custom: var(--spacing-bottom-custom)',
            '--margin-left-custom: var(--spacing-left-custom)',
            '--margin-custom: var(--margin-top-custom) var(--margin-right-custom) var(--margin-bottom-custom) var(--margin-left-custom)',
            '--padding-top-custom: var(--spacing-top-custom)',
            '--padding-right-custom: var(--spacing-right-custom)',
            '--padding-bottom-custom: var(--spacing-bottom-custom)',
            '--padding-left-custom: var(--spacing-left-custom)',
            '--padding-custom: var(--padding-top-custom) var(--padding-right-custom) var(--padding-bottom-custom) var(--padding-left-custom)'
        ]);
    });
});
