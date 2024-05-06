import { generateAnimation, animationGenerator } from './animation';
import { createTestingGeneratorMeta } from '../__tests__/utils';
import { matchKey } from '../utils';
import { ClassifierType, ResolvedTheme } from '../types';

describe('generateAnimation', () => {
    const animation = {
        property: 'all',
        duration: '1s',
        timingFunction: 'ease-in-out'
    };

    it('should generate animation css variables for default variant', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                animation: {
                    $type: ClassifierType.PrimitiveVariants,
                    default: animation
                }
            } as unknown as ResolvedTheme,
            path: ['animation', 'default']
        });
        const result = generateAnimation(animation, meta);
        expect(result).toEqual([
            '--animation-property: all;',
            '--animation-duration: 1s;',
            '--animation-timing-function: ease-in-out;',
            '--animation: var(--animation-property) var(--animation-duration) var(--animation-timing-function);'
        ]);
    });

    it('should generate animation css variables for non-default variant', () => {
        const meta = createTestingGeneratorMeta({
            theme: {
                animation: {
                    $type: ClassifierType.PrimitiveVariants,
                    slow: animation
                }
            } as unknown as ResolvedTheme,
            path: ['animation', 'slow']
        });
        const result = generateAnimation(animation, meta);
        expect(result).toEqual([
            '--animation-property-slow: all;',
            '--animation-duration-slow: 1s;',
            '--animation-timing-function-slow: ease-in-out;',
            '--animation-slow: var(--animation-property-slow) var(--animation-duration-slow) var(--animation-timing-function-slow);'
        ]);
    });
});

describe('animationGenerator', () => {
    describe('match', () => {
        it.each([
            ['animation', false],
            ['animation.default', true],
            ['animation.default.property', false],
            ['components.button.default.animation', true],
            ['other.animation.value', false]
        ])('should match "%s" path', (path, result) => {
            const match = (animationGenerator.key as RegExp[]).some((key) => matchKey(path, key));
            expect(match).toBe(result);
        });
    });
});
