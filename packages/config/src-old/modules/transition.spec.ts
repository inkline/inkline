import {
    generateTransition,
    transitionGenerator,
    resolveTransition,
    transitionResolver
} from './transition';
import { createTestingResolverMeta, createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassificationType } from '../types';
import type { ResolvedTheme } from '../types';

describe('resolveTransition', () => {
    const meta = createTestingResolverMeta({ path: ['transition', 'default'] });

    it('should return the same transition when transition is a string', () => {
        const transition = 'all 2s ease';
        const result = resolveTransition(transition, meta);
        expect(result).toEqual({
            property: 'all',
            duration: '2s',
            timingFunction: 'ease'
        });
    });

    it('should return the transition when transition is an object', () => {
        const transition = {
            property: 'opacity',
            duration: '1s',
            timingFunction: 'linear'
        };
        const result = resolveTransition(transition, meta);
        expect(result).toEqual(transition);
    });
});

describe('transitionResolver', () => {
    describe('match', () => {
        it.each([
            ['transition', false],
            ['transition.default', true],
            ['transition.default.property', false],
            ['components.button.default.transition', true],
            ['other.transition.value', false]
        ])('should match "%s" path => %s', (path, result) => {
            const match = (transitionResolver.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});

describe('generateTransition', () => {
    const transition = {
        property: 'all',
        duration: '1s',
        timingFunction: 'ease-in-out'
    };

    it('should generate transition css variables for default variant', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                transition: {
                    __type: ClassificationType.Variable,
                    default: transition
                }
            } as unknown as ResolvedTheme,
            path: ['transition', 'default']
        });
        const result = generateTransition(transition, meta);
        expect(result).toEqual([
            '--transition-property: all;',
            '--transition-duration: 1s;',
            '--transition-timing-function: ease-in-out;',
            '--transition: var(--transition-property) var(--transition-duration) var(--transition-timing-function);'
        ]);
    });

    it('should generate transition css variables for non-default variant', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                transition: {
                    __type: ClassificationType.Variable,
                    slow: transition
                }
            } as unknown as ResolvedTheme,
            path: ['transition', 'slow']
        });
        const result = generateTransition(transition, meta);
        expect(result).toEqual([
            '--transition-property-slow: all;',
            '--transition-duration-slow: 1s;',
            '--transition-timing-function-slow: ease-in-out;',
            '--transition-slow: var(--transition-property-slow) var(--transition-duration-slow) var(--transition-timing-function-slow);'
        ]);
    });
});

describe('transitionGenerator', () => {
    describe('match', () => {
        it.each([
            ['transition', false],
            ['transition.default', true],
            ['transition.default.property', false],
            ['components.button.default.transition', true],
            ['other.transition.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = (transitionGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
