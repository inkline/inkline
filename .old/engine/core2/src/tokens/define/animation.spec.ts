import { nsvariable, variable } from '../variable';
import { ref } from '../ref';
import { defineAnimation } from './animation';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineAnimation', () => {
    it('should create default animation variables when no value is provided', () => {
        const result = defineAnimation('namespace', '', options);
        expect(result).toEqual({
            namespaceAnimationName: nsvariable('namespace', 'animation-name', 'none', options),
            namespaceAnimationDuration: nsvariable('namespace', 'animation-duration', 0, options),
            namespaceAnimationIterationCount: nsvariable(
                'namespace',
                'animation-iteration-count',
                1,
                options
            ),
            namespaceAnimationDirection: nsvariable(
                'namespace',
                'animation-direction',
                'normal',
                options
            ),
            namespaceAnimationDelay: nsvariable('namespace', 'animation-delay', 0, options),
            namespaceAnimationFillMode: nsvariable(
                'namespace',
                'animation-fill-mode',
                'none',
                options
            ),
            namespaceAnimationPlayState: nsvariable(
                'namespace',
                'animation-play-state',
                'running',
                options
            ),
            namespaceAnimationTimingFunction: nsvariable(
                'namespace',
                'animation-timing-function',
                'linear',
                options
            ),
            namespaceAnimation: nsvariable(
                'namespace',
                'animation',
                [
                    ref(nsvariable('namespace', 'animation-name', 'none', options)),
                    ref(nsvariable('namespace', 'animation-duration', 0, options)),
                    ref(nsvariable('namespace', 'animation-iteration-count', 1, options)),
                    ref(nsvariable('namespace', 'animation-direction', 'normal', options))
                ],
                options
            )
        });
    });

    it('should set animation properties from object', () => {
        const value = {
            name: 'fade',
            delay: '0s',
            fillMode: 'forwards',
            playState: 'running',
            duration: '2s',
            iterationCount: 3,
            direction: 'reverse',
            timingFunction: 'ease'
        };
        const result = defineAnimation('namespace', value, options);
        expect(result).toEqual({
            namespaceAnimationName: nsvariable('namespace', 'animation-name', 'fade', options),
            namespaceAnimationDuration: nsvariable(
                'namespace',
                'animation-duration',
                '2s',
                options
            ),
            namespaceAnimationIterationCount: nsvariable(
                'namespace',
                'animation-iteration-count',
                3,
                options
            ),
            namespaceAnimationDirection: nsvariable(
                'namespace',
                'animation-direction',
                'reverse',
                options
            ),
            namespaceAnimationDelay: nsvariable('namespace', 'animation-delay', '0s', options),
            namespaceAnimationFillMode: nsvariable(
                'namespace',
                'animation-fill-mode',
                'forwards',
                options
            ),
            namespaceAnimationPlayState: nsvariable(
                'namespace',
                'animation-play-state',
                'running',
                options
            ),
            namespaceAnimationTimingFunction: nsvariable(
                'namespace',
                'animation-timing-function',
                'ease',
                options
            ),
            namespaceAnimation: nsvariable(
                'namespace',
                'animation',
                [
                    ref(nsvariable('namespace', 'animation-name', 'fade', options)),
                    ref(nsvariable('namespace', 'animation-duration', '2s', options)),
                    ref(nsvariable('namespace', 'animation-iteration-count', 3, options)),
                    ref(nsvariable('namespace', 'animation-direction', 'reverse', options))
                ],
                options
            )
        });
    });

    it('should set animation properties from string value', () => {
        const value = '3s ease-in 1s 2 reverse both paused slide-in';
        const result = defineAnimation('namespace', value, options);
        expect(result).toEqual({
            namespaceAnimationName: nsvariable('namespace', 'animation-name', 'slide-in', options),
            namespaceAnimationDuration: nsvariable(
                'namespace',
                'animation-duration',
                '3s',
                options
            ),
            namespaceAnimationIterationCount: nsvariable(
                'namespace',
                'animation-iteration-count',
                '2',
                options
            ),
            namespaceAnimationDelay: nsvariable('namespace', 'animation-delay', '1s', options),
            namespaceAnimationFillMode: nsvariable(
                'namespace',
                'animation-fill-mode',
                'both',
                options
            ),
            namespaceAnimationDirection: nsvariable(
                'namespace',
                'animation-direction',
                'reverse',
                options
            ),
            namespaceAnimationPlayState: nsvariable(
                'namespace',
                'animation-play-state',
                'paused',
                options
            ),
            namespaceAnimationTimingFunction: nsvariable(
                'namespace',
                'animation-timing-function',
                'ease-in',
                options
            ),
            namespaceAnimation: nsvariable(
                'namespace',
                'animation',
                [
                    ref(nsvariable('namespace', 'animation-name', 'fade', options)),
                    ref(nsvariable('namespace', 'animation-duration', '2s', options)),
                    ref(nsvariable('namespace', 'animation-iteration-count', '3', options)),
                    ref(nsvariable('namespace', 'animation-direction', 'reverse', options))
                ],
                options
            )
        });
    });

    it('should handle empty namespace', () => {
        const result = defineAnimation('', '', options);
        expect(result).toEqual({
            animationName: variable('animation-name', 'none', options),
            animationDelay: variable('animation-delay', 0, options),
            animationDuration: variable('animation-duration', 0, options),
            animationFillMode: variable('animation-fill-mode', 'none', options),
            animationIterationCount: variable('animation-iteration-count', 1, options),
            animationDirection: variable('animation-direction', 'normal', options),
            animationPlayState: variable('animation-play-state', 'running', options),
            animationTimingFunction: variable('animation-timing-function', 'linear', options),
            animation: variable(
                'animation',
                [
                    ref(variable('animation-name', 'none', options)),
                    ref(variable('animation-duration', 0, options)),
                    ref(variable('animation-iteration-count', 1, options)),
                    ref(variable('animation-direction', 'normal', options))
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineAnimation('namespace', '', options);

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
        const result = defineAnimation('', '', options);

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
