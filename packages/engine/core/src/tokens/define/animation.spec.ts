import { nsvariable, variable } from '../variable';
import { ref } from '../ref';
import { defineAnimation } from './animation';

describe('defineAnimation', () => {
    it('should create default animation variables when no value is provided', () => {
        const result = defineAnimation('namespace', '');
        expect(result).toEqual({
            namespaceAnimationName: nsvariable('namespace', 'animation-name', 'none'),
            namespaceAnimationDuration: nsvariable('namespace', 'animation-duration', 0),
            namespaceAnimationIterationCount: nsvariable(
                'namespace',
                'animation-iteration-count',
                1
            ),
            namespaceAnimationDirection: nsvariable('namespace', 'animation-direction', 'normal'),
            namespaceAnimation: nsvariable('namespace', 'animation', [
                ref(nsvariable('namespace', 'animation-name', 'none')),
                ref(nsvariable('namespace', 'animation-duration', 0)),
                ref(nsvariable('namespace', 'animation-iteration-count', 1)),
                ref(nsvariable('namespace', 'animation-direction', 'normal'))
            ])
        });
    });

    it('should set animation properties from object', () => {
        const value = { name: 'fade', duration: '2s', iterationCount: 3, direction: 'reverse' };
        const result = defineAnimation('namespace', value);
        expect(result).toEqual({
            namespaceAnimationName: nsvariable('namespace', 'animation-name', 'fade'),
            namespaceAnimationDuration: nsvariable('namespace', 'animation-duration', '2s'),
            namespaceAnimationIterationCount: nsvariable(
                'namespace',
                'animation-iteration-count',
                3
            ),
            namespaceAnimationDirection: nsvariable('namespace', 'animation-direction', 'reverse'),
            namespaceAnimation: nsvariable('namespace', 'animation', [
                ref(nsvariable('namespace', 'animation-name', 'fade')),
                ref(nsvariable('namespace', 'animation-duration', '2s')),
                ref(nsvariable('namespace', 'animation-iteration-count', 3)),
                ref(nsvariable('namespace', 'animation-direction', 'reverse'))
            ])
        });
    });

    it('should set animation properties from string value', () => {
        const value = 'fade 2s 3 reverse';
        const result = defineAnimation('namespace', value);
        expect(result).toEqual({
            namespaceAnimationName: nsvariable('namespace', 'animation-name', 'fade'),
            namespaceAnimationDuration: nsvariable('namespace', 'animation-duration', '2s'),
            namespaceAnimationIterationCount: nsvariable(
                'namespace',
                'animation-iteration-count',
                '3'
            ),
            namespaceAnimationDirection: nsvariable('namespace', 'animation-direction', 'reverse'),
            namespaceAnimation: nsvariable('namespace', 'animation', [
                ref(nsvariable('namespace', 'animation-name', 'fade')),
                ref(nsvariable('namespace', 'animation-duration', '2s')),
                ref(nsvariable('namespace', 'animation-iteration-count', '3')),
                ref(nsvariable('namespace', 'animation-direction', 'reverse'))
            ])
        });
    });

    it('should handle empty namespace', () => {
        const result = defineAnimation('', '');
        expect(result).toEqual({
            animationName: variable('animation-name', 'none'),
            animationDuration: variable('animation-duration', 0),
            animationIterationCount: variable('animation-iteration-count', 1),
            animationDirection: variable('animation-direction', 'normal'),
            animation: variable('animation', [
                ref(variable('animation-name', 'none')),
                ref(variable('animation-duration', 0)),
                ref(variable('animation-iteration-count', 1)),
                ref(variable('animation-direction', 'normal'))
            ])
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineAnimation('namespace', '');

        const {
            namespaceAnimationName,
            namespaceAnimationDuration,
            namespaceAnimationIterationCount,
            namespaceAnimationDirection,
            namespaceAnimation
        } = result;

        expect(namespaceAnimationName).toBeDefined();
        expect(namespaceAnimationDuration).toBeDefined();
        expect(namespaceAnimationIterationCount).toBeDefined();
        expect(namespaceAnimationDirection).toBeDefined();
        expect(namespaceAnimation).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineAnimation('', '');

        const {
            animationName,
            animationDuration,
            animationIterationCount,
            animationDirection,
            animation
        } = result;

        expect(animationName).toBeDefined();
        expect(animationDuration).toBeDefined();
        expect(animationIterationCount).toBeDefined();
        expect(animationDirection).toBeDefined();
        expect(animation).toBeDefined();
    });
});
