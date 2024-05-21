import { generateBorderRadius, borderRadiusGenerator } from './borderRadius';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';

describe('generateBorderRadius', () => {
    it('should generate borderRadius css variables for default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['borderRadius', 'default'] });
        const borderRadius = {
            topLeft: '10px',
            topRight: '10px',
            bottomRight: '10px',
            bottomLeft: '10px'
        };
        const result = generateBorderRadius(borderRadius, meta);
        expect(result).toEqual([
            '--border-top-left-radius: 10px;',
            '--border-top-right-radius: 10px;',
            '--border-bottom-right-radius: 10px;',
            '--border-bottom-left-radius: 10px;',
            '--border-radius: var(--border-top-left-radius) var(--border-top-right-radius) var(--border-bottom-right-radius) var(--border-bottom-left-radius);'
        ]);
    });

    it('should generate borderRadius css variables for non-default variant', () => {
        const meta = createTestingGeneratorMeta({ path: ['borderRadius', 'lg'] });
        const borderRadius = {
            topLeft: '20px',
            topRight: '20px',
            bottomRight: '20px',
            bottomLeft: '20px'
        };
        const result = generateBorderRadius(borderRadius, meta);
        expect(result).toEqual([
            '--border-top-left-radius-lg: 20px;',
            '--border-top-right-radius-lg: 20px;',
            '--border-bottom-right-radius-lg: 20px;',
            '--border-bottom-left-radius-lg: 20px;',
            '--border-radius-lg: var(--border-top-left-radius-lg) var(--border-top-right-radius-lg) var(--border-bottom-right-radius-lg) var(--border-bottom-left-radius-lg);'
        ]);
    });
});

describe('borderRadiusGenerator', () => {
    describe('match', () => {
        it.each([
            ['borderRadius', false],
            ['borderRadius.default', true],
            ['borderRadius.default.topLeft', false],
            ['components.button.default.borderRadius', true],
            ['other.borderRadius.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (borderRadiusGenerator.key as RegExp[]).some((key) =>
                matchKey(path, key)
            );
            expect(match).toBe(result);
        });
    });
});
