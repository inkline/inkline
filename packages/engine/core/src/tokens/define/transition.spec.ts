import { defineTransition } from './transition';
import { nsvariable } from '../variable';
import { ref } from '../ref';

describe('defineTransition', () => {
    it('should create default transition variables when no value is provided', () => {
        const result = defineTransition('namespace', '');
        expect(result).toEqual({
            namespaceTransitionProperty: nsvariable('namespace', 'transition-property', 'none'),
            namespaceTransitionDuration: nsvariable('namespace', 'transition-duration', 0),
            namespaceTransitionTimingFunction: nsvariable(
                'namespace',
                'transition-timing-function',
                'ease'
            ),
            namespaceTransition: nsvariable('namespace', 'transition', [
                ref(nsvariable('namespace', 'transition-property', 'none')),
                ref(nsvariable('namespace', 'transition-duration', 0)),
                ref(nsvariable('namespace', 'transition-timing-function', 'ease'))
            ])
        });
    });

    it('should set transition properties from TransitionProperty object', () => {
        const value = { property: 'opacity', duration: '2s', timingFunction: 'linear' };
        const result = defineTransition('namespace', value);
        expect(result).toEqual({
            namespaceTransitionProperty: nsvariable('namespace', 'transition-property', 'opacity'),
            namespaceTransitionDuration: nsvariable('namespace', 'transition-duration', '2s'),
            namespaceTransitionTimingFunction: nsvariable(
                'namespace',
                'transition-timing-function',
                'linear'
            ),
            namespaceTransition: nsvariable('namespace', 'transition', [
                ref(nsvariable('namespace', 'transition-property', 'opacity')),
                ref(nsvariable('namespace', 'transition-duration', '2s')),
                ref(nsvariable('namespace', 'transition-timing-function', 'linear'))
            ])
        });
    });

    it('should set transition properties from string value', () => {
        const value = 'opacity 2s linear';
        const result = defineTransition('namespace', value);
        expect(result).toEqual({
            namespaceTransitionProperty: nsvariable('namespace', 'transition-property', 'opacity'),
            namespaceTransitionDuration: nsvariable('namespace', 'transition-duration', '2s'),
            namespaceTransitionTimingFunction: nsvariable(
                'namespace',
                'transition-timing-function',
                'linear'
            ),
            namespaceTransition: nsvariable('namespace', 'transition', [
                ref(nsvariable('namespace', 'transition-property', 'opacity')),
                ref(nsvariable('namespace', 'transition-duration', '2s')),
                ref(nsvariable('namespace', 'transition-timing-function', 'linear'))
            ])
        });
    });

    it('should return object with namespaced properties', () => {
        const result = defineTransition('namespace', 'opacity 2s linear');

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
        const result = defineTransition('', '');

        const { transitionProperty, transitionDuration, transitionTimingFunction, transition } =
            result;

        expect(transitionProperty).toBeDefined();
        expect(transitionDuration).toBeDefined();
        expect(transitionTimingFunction).toBeDefined();
        expect(transition).toBeDefined();
    });
});
