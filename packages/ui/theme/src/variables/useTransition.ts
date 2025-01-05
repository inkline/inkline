import { DefinitionOptions, ref, variable } from '@inkline/core';

export function useTransition(options: DefinitionOptions) {
    const transitionProperty = variable(
        'transition-property',
        'color, background-color, border-color',
        options
    );
    const transitionDuration = variable('transition-duration', '300ms', options);
    const transitionTimingFunction = variable('transition-timing-function', 'ease', options);
    const transition = variable(
        'transition',
        [ref(transitionProperty), ref(transitionDuration), ref(transitionTimingFunction)],
        options
    );

    return {
        transitionProperty,
        transitionDuration,
        transitionTimingFunction,
        transition
    };
}
