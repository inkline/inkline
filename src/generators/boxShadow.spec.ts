import { generateBoxShadow, boxShadowGenerator } from './boxShadow';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassifierType, ResolvedTheme } from '../types';

describe('generateBoxShadow', () => {
    const boxShadow = {
        offsetX: '10px',
        offsetY: '10px',
        blurRadius: '5px',
        spreadRadius: '2px',
        color: '#000'
    };

    it('should generate boxShadow css variables when boxShadow properties are strings', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                boxShadow: {
                    $type: ClassifierType.PrimitiveVariants,
                    default: boxShadow
                }
            } as unknown as ResolvedTheme,
            path: ['boxShadow', 'default']
        });
        const result = generateBoxShadow(boxShadow, meta);
        expect(result).toEqual([
            '--box-shadow-offset-x: 10px;',
            '--box-shadow-offset-y: 10px;',
            '--box-shadow-blur-radius: 5px;',
            '--box-shadow-spread-radius: 2px;',
            '--box-shadow-color: #000;',
            '--box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-color);'
        ]);
    });

    it('should generate boxShadow css variables for non-default variant "strong"', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                boxShadow: {
                    $type: ClassifierType.PrimitiveVariants,
                    strong: boxShadow
                }
            } as unknown as ResolvedTheme,
            path: ['boxShadow', 'strong']
        });
        const result = generateBoxShadow(boxShadow, meta);
        expect(result).toEqual([
            '--box-shadow-offset-x-strong: 10px;',
            '--box-shadow-offset-y-strong: 10px;',
            '--box-shadow-blur-radius-strong: 5px;',
            '--box-shadow-spread-radius-strong: 2px;',
            '--box-shadow-color-strong: #000;',
            '--box-shadow-strong: var(--box-shadow-offset-x-strong) var(--box-shadow-offset-y-strong) var(--box-shadow-blur-radius-strong) var(--box-shadow-spread-radius-strong) var(--box-shadow-color-strong);'
        ]);
    });
});

describe('boxShadowGenerator', () => {
    describe('match', () => {
        it.each([
            ['boxShadow', false],
            ['boxShadow.default', true],
            ['boxShadow.default.offsetX', false],
            ['components.button.default.boxShadow', true],
            ['other.boxShadow.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (boxShadowGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
