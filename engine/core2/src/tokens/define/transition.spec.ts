import { defineTransition } from './transition';
import { nsvariable } from '../variable';
import { ref } from '../ref';
import { createContext } from '../../context';

const options = { context: createContext() };

describe('defineTransition', () => {
    it('should create default transition variables when no value is provided', () => {
        const result = defineTransition('namespace', '', options);
        expect(result).toEqual({
            namespaceTransitionProperty: nsvariable(
                'namespace',
                'transition-property',
                'none',
                options
            ),
            namespaceTransitionDuration: nsvariable('namespace', 'transition-duration', 0, options),
            namespaceTransitionTimingFunction: nsvariable(
                'namespace',
                'transition-timing-function',
                'ease',
                options
            ),
            namespaceTransition: nsvariable(
                'namespace',
                'transition',
                [
                    ref(nsvariable('namespace', 'transition-property', 'none', options)),
                    ref(nsvariable('namespace', 'transition-duration', 0, options)),
                    ref(nsvariable('namespace', 'transition-timing-function', 'ease', options))
                ],
                options
            )
        });
    });

    it('should set transition properties from TransitionProperty object', () => {
        const value = { property: 'opacity', duration: '2s', timingFunction: 'linear' };
        const result = defineTransition('namespace', value, options);
        expect(result).toEqual({
            namespaceTransitionProperty: nsvariable(
                'namespace',
                'transition-property',
                'opacity',
                options
            ),
            namespaceTransitionDuration: nsvariable(
                'namespace',
                'transition-duration',
                '2s',
                options
            ),
            namespaceTransitionTimingFunction: nsvariable(
                'namespace',
                'transition-timing-function',
                'linear',
                options
            ),
            namespaceTransition: nsvariable(
                'namespace',
                'transition',
                [
                    ref(nsvariable('namespace', 'transition-property', 'opacity', options)),
                    ref(nsvariable('namespace', 'transition-duration', '2s', options)),
                    ref(nsvariable('namespace', 'transition-timing-function', 'linear', options))
                ],
                options
            )
        });
    });

    it('should set transition properties from string value', () => {
        const value = 'opacity 2s linear';
        const result = defineTransition('namespace', value, options);
        expect(result).toEqual({
            namespaceTransitionProperty: nsvariable(
                'namespace',
                'transition-property',
                'opacity',
                options
            ),
            namespaceTransitionDuration: nsvariable(
                'namespace',
                'transition-duration',
                '2s',
                options
            ),
            namespaceTransitionTimingFunction: nsvariable(
                'namespace',
                'transition-timing-function',
                'linear',
                options
            ),
            namespaceTransition: nsvariable(
                'namespace',
                'transition',
                [
                    ref(nsvariable('namespace', 'transition-property', 'opacity', options)),
                    ref(nsvariable('namespace', 'transition-duration', '2s', options)),
                    ref(nsvariable('namespace', 'transition-timing-function', 'linear', options))
                ],
                options
            )
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineTransition('namespace', 'opacity 2s linear', options);

        const {
            namespaceTransitionProperty,
            namespaceTransitionDuration,
            namespaceTransitionTimingFunction,
            namespaceTransition
        } = result;

        expect(namespaceTransitionProperty).toBeDefined();
        expect(namespaceTransitionDuration).toBeDefined();
        expect(namespaceTransitionTimingFunction).toBeDefined();
        expect(namespaceTransition).toBeDefined();
    });

    it('should return object with non-namespaced properties', () => {
        const result = defineTransition('', '', options);

        const { transitionProperty, transitionDuration, transitionTimingFunction, transition } =
            result;

        expect(transitionProperty).toBeDefined();
        expect(transitionDuration).toBeDefined();
        expect(transitionTimingFunction).toBeDefined();
        expect(transition).toBeDefined();
    });
});
