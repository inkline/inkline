import {
    defaultDefinitionOptions,
    DefinitionOptions,
    nsvariables,
    ref,
    selector
} from '@inkline/core';
import { useSpacing, useTransition } from '@inkline/theme';

const ns = 'toast-container';

/**
 * Config
 */

export function useToastContainerThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);
    const { transitionDuration, transitionTimingFunction } = useTransition(options);

    return {
        margin: {
            top: ref(spacing),
            right: ref(spacing),
            bottom: ref(spacing),
            left: ref(spacing)
        },
        width: '320px',
        zIndex: 2010,
        /**
         * @element toast
         */
        toast: {
            margin: {
                bottom: ref(spacing)
            },
            transition: {
                property: 'transform, opacity',
                duration: ref(transitionDuration),
                timingFunction: ref(transitionTimingFunction)
            }
        }
    };
}

/**
 * Variables
 */

export function useToastContainerThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useToastContainerThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useToastContainerLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        toastContainerMargin,
        toastContainerWidth,
        toastContainerZIndex,
        toastContainerToastMargin,
        toastContainerToastTransition
    } = useToastContainerThemeVariables(options);

    selector(
        '.toast-container',
        {
            margin: ref(toastContainerMargin),
            width: ref(toastContainerWidth),
            position: 'fixed',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'visible',
            zIndex: ref(toastContainerZIndex)
        },
        options
    );

    // .toast-container {

    selector(
        '.toast-container.-top-left',
        {
            top: 0,
            left: 0
        },
        options
    );

    selector(
        '.toast-container.-top',
        {
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)'
        },
        options
    );

    selector(
        '.toast-container.-top-right',
        {
            top: 0,
            right: 0
        },
        options
    );

    selector(
        '.toast-container.-right',
        {
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)'
        },
        options
    );

    selector(
        '.toast-container.-bottom-right',
        {
            bottom: 0,
            right: 0
        },
        options
    );

    selector(
        '.toast-container.-bottom',
        {
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)'
        },
        options
    );

    selector(
        '.toast-container.-bottom-left',
        {
            bottom: 0,
            left: 0
        },
        options
    );

    selector(
        '.toast-container.-left',
        {
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)'
        },
        options
    );

    selector(
        '.toast-container > .toast',
        {
            margin: ref(toastContainerToastMargin),
            width: ref(toastContainerWidth),
            maxWidth: '100%',
            position: 'relative'
        },
        options
    );

    selector(
        '.toast-container > .toast:last-of-type',
        {
            marginBottom: 0
        },
        options
    );

    selector(
        [
            '.toast-transition-move',
            '.toast-transition-enter-active',
            '.toast-transition-leave-active'
        ],
        {
            transition: ref(toastContainerToastTransition)
        },
        options
    );

    selector(
        ['.toast-transition-enter-from', '.toast-transition-leave-to'],
        {
            opacity: 0
        },
        options
    );

    // Ensure leaving items are taken out of layout flow so that moving
    // animations can be calculated correctly.
    selector(
        '.toast-transition-leave-active',
        {
            position: 'absolute'
        },
        options
    );
}

/**
 * Composables
 */

export function useToastContainerTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useToastContainerThemeVariables(options);
    useToastContainerLayoutSelectors(options);
}
