import { borderRadiusGenerator, generateBorderRadius } from './borderRadius';
import { createTestingGeneratorMeta } from '../__tests__/utils';

describe('generateBorderRadius', () => {
    it('should generate correct border radius CSS variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['borderRadius', 'default'] });
        const borderRadius = {
            topLeft: '10px',
            topRight: '10px',
            bottomRight: '10px',
            bottomLeft: '10px'
        };

        const result = generateBorderRadius(borderRadius, meta);

        expect(result).toEqual([
            '--border-top-left-radius: 10px',
            '--border-top-right-radius: 10px',
            '--border-bottom-right-radius: 10px',
            '--border-bottom-left-radius: 10px',
            '--border-radius: var(--border-top-left-radius) var(--border-top-right-radius) var(--border-bottom-right-radius) var(--border-bottom-left-radius)'
        ]);
    });

    it('should generate correct border radius CSS variables for custom variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['borderRadius', 'custom'] });
        const borderRadius = {
            topLeft: '20px',
            topRight: '20px',
            bottomRight: '20px',
            bottomLeft: '20px'
        };

        const result = generateBorderRadius(borderRadius, meta);

        expect(result).toEqual([
            '--border-top-left-radius-custom: 20px',
            '--border-top-right-radius-custom: 20px',
            '--border-bottom-right-radius-custom: 20px',
            '--border-bottom-left-radius-custom: 20px',
            '--border-radius-custom: var(--border-top-left-radius-custom) var(--border-top-right-radius-custom) var(--border-bottom-right-radius-custom) var(--border-bottom-left-radius-custom)'
        ]);
    });
});

describe('borderRadiusGenerator', () => {
    const meta = createTestingGeneratorMeta({ path: ['borderRadius'] });

    it('should correctly generate borderRadius fields with variants', () => {
        const input = {
            default: {
                topLeft: '10px',
                topRight: '10px',
                bottomRight: '10px',
                bottomLeft: '10px'
            },
            custom: {
                topLeft: 'calc(var(--border-top-left-radius) * 2)',
                topRight: '20px',
                bottomRight: '20px',
                bottomLeft: '20px'
            }
        };

        const result = borderRadiusGenerator.generate(input, meta);

        expect(result).toEqual([
            '--border-top-left-radius: 10px',
            '--border-top-right-radius: 10px',
            '--border-bottom-right-radius: 10px',
            '--border-bottom-left-radius: 10px',
            '--border-radius: var(--border-top-left-radius) var(--border-top-right-radius) var(--border-bottom-right-radius) var(--border-bottom-left-radius)',
            '--border-top-left-radius-custom: calc(var(--border-top-left-radius) * 2)',
            '--border-top-right-radius-custom: 20px',
            '--border-bottom-right-radius-custom: 20px',
            '--border-bottom-left-radius-custom: 20px',
            '--border-radius-custom: var(--border-top-left-radius-custom) var(--border-top-right-radius-custom) var(--border-bottom-right-radius-custom) var(--border-bottom-left-radius-custom)'
        ]);
    });
});
