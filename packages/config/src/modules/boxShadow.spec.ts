import {
    resolveBoxShadow,
    resolveBoxShadowVariant,
    boxShadowResolver,
    generateBoxShadow,
    boxShadowGenerator
} from './boxShadow';
import { createTestingResolverMeta, createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassificationType, ResolvedTheme } from '../types';

describe('resolveBoxShadow', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow', 'default'] });

    it('should return the same boxShadow when boxShadow is an object', () => {
        const boxShadow = {
            offsetX: '10px',
            offsetY: '20px',
            blurRadius: '30px',
            spreadRadius: '40px',
            color: '#000'
        };
        const result = resolveBoxShadow(boxShadow, meta);
        expect(result).toEqual(boxShadow);
    });

    it('should assign all properties with the same value when boxShadow is a single value string', () => {
        const result = resolveBoxShadow('10px 20px 30px 40px #000', meta);
        expect(result).toEqual({
            offsetX: '10px',
            offsetY: '20px',
            blurRadius: '30px',
            spreadRadius: '40px',
            color: '#000'
        });
    });
});

describe('resolveBoxShadowVariant', () => {
    const meta = createTestingResolverMeta({ path: ['boxShadow', 'variant'] });

    it('should return the same boxShadow when variant is a string', () => {
        const variant = '10px 20px 30px 40px #000';
        const result = resolveBoxShadowVariant(variant, meta);
        expect(result).toEqual({
            offsetX: '10px',
            offsetY: '20px',
            blurRadius: '30px',
            spreadRadius: '40px',
            color: '#000'
        });
    });

    it('should return the boxShadow with css variables when variant is an object', () => {
        const variant = {
            offsetX: 'var(--shadow-offset-x)',
            offsetY: 'var(--shadow-offset-y)',
            blurRadius: 'var(--shadow-blur-radius)',
            spreadRadius: 'var(--shadow-spread-radius)',
            color: 'var(--shadow-color)'
        };
        const result = resolveBoxShadowVariant(variant, meta);
        expect(result).toEqual(variant);
    });
});

describe('boxShadowResolver', () => {
    describe('match', () => {
        it.each([
            ['boxShadow.default', true],
            ['boxShadow.default.offsetX', false],
            ['components.button.default.boxShadow', true],
            ['other.boxShadow.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (boxShadowResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

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
                    __type: ClassificationType.Variable,
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
                    __type: ClassificationType.Variable,
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
