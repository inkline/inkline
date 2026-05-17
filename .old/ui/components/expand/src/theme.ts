import {
    DefinitionOptions,
    defaultDefinitionOptions,
    selector,
    ref,
    nsvariables
} from '@inkline/core';
import { useTransition } from '@inkline/theme';

const ns = 'expand';

/**
 * Config
 */

export function useExpandThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration, transitionProperty, transitionTimingFunction } =
        useTransition(options);

    return {
        transition: {
            property: 'height, width',
            duration: ref(transitionDuration),
            timingFunction: ref(transitionTimingFunction)
        }
    };
}

/**
 * Variables
 */

export function useExpandThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useExpandThemeConfig(options), options);
}

/**
 * Selectors
 */

export function useExpandThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { expandTransitionDuration, expandTransitionProperty, expandTransitionTimingFunction } =
        useExpandThemeVariables(options);

    selector(
        [
            '.expand-x-enter-active',
            '.expand-x-leave-active',
            '.expand-y-enter-active',
            '.expand-y-leave-active'
        ],
        {
            transitionDuration: ref(expandTransitionDuration),
            transitionProperty: ref(expandTransitionProperty),
            transitionTimingFunction: ref(expandTransitionTimingFunction),
            overflow: 'hidden'
        },
        options
    );

    selector(
        ['.expand-x-enter', '.expand-x-leave-to'],
        {
            width: '0'
        },
        options
    );

    selector(
        ['.expand-y-enter', '.expand-y-leave-to'],
        {
            height: '0'
        },
        options
    );

    selector(
        [
            '.expand-x-enter-from',
            '.expand-x-enter-active',
            '.expand-x-leave-active',
            '.expand-x-leave-to',
            '.expand-y-enter-from',
            '.expand-y-enter-active',
            '.expand-y-leave-active',
            '.expand-y-leave-to'
        ],
        {
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
        },
        options
    );

    selector(
        [
            '.expand-x-enter-from',
            '.expand-x-enter-active',
            '.expand-x-leave-active',
            '.expand-x-leave-to'
        ],
        {
            willChange: 'width'
        },
        options
    );

    selector(
        [
            '.expand-y-enter-from',
            '.expand-y-enter-active',
            '.expand-y-leave-active',
            '.expand-y-leave-to'
        ],
        {
            willChange: 'height'
        },
        options
    );
}

/**
 * Composables
 */

export function useExpandTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useExpandThemeSelectors(options);
}
