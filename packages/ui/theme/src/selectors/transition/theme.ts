import { defaultDefinitionOptions, DefinitionOptions, ref, selector, variable } from '@inkline/core';
import { useTransition } from '../../variables';

export function useExpandTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration, transitionTimingFunction } = useTransition(options);

    const expandTransitionProperty = variable('expand-transition-property', 'height', options);
    const expandTransitionDuration = variable(
        'expand-transition-duration',
        ref(transitionDuration),
        options
    );
    const expandTransitionTimingFunction = variable(
        'expand-transition-timing-function',
        ref(transitionTimingFunction),
        options
    );
    const expandTransition = variable(
        'expand-transition',
        [
            ref(expandTransitionProperty),
            ref(expandTransitionDuration),
            ref(expandTransitionTimingFunction)
        ],
        options
    );

    return {
        expandTransitionProperty,
        expandTransitionDuration,
        expandTransitionTimingFunction,
        expandTransition
    };
}

export function useExpandTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { expandTransitionProperty, expandTransitionDuration, expandTransitionTimingFunction } =
        useExpandTransitionThemeVariables(options);

    selector('.expand-enter-active, .expand-leave-active', {
        transitionProperty: ref(expandTransitionProperty),
        transitionDuration: ref(expandTransitionDuration),
        transitionTimingFunction: ref(expandTransitionTimingFunction),
        overflow: 'hidden'
    }, options);

    selector('.expand-enter-from, .expand-leave-to', {
        height: 0
    }, options);
}

export function useFadeInTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const fadeInTransitionProperty = variable('fade-in-transition-property', 'opacity', options);
    const fadeInTransitionDuration = variable(
        'fade-in-transition-duration',
        ref(transitionDuration),
        options
    );
    const fadeInTransitionTimingFunction = variable(
        'fade-in-transition-timing-function',
        'cubic-bezier(0.55, 0, 0.1, 1)',
        options
    );
    const fadeInTransition = variable(
        'fade-in-transition',
        [
            ref(fadeInTransitionProperty),
            ref(fadeInTransitionDuration),
            ref(fadeInTransitionTimingFunction)
        ],
        options
    );

    return {
        fadeInTransitionProperty,
        fadeInTransitionDuration,
        fadeInTransitionTimingFunction,
        fadeInTransition
    };
}

export function useFadeInTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fadeInTransitionProperty, fadeInTransitionDuration, fadeInTransitionTimingFunction } =
        useFadeInTransitionThemeVariables(options);

    selector('.fade-in-transition-enter-active, .fade-in-transition-leave-active', {
        transitionProperty: ref(fadeInTransitionProperty),
        transitionDuration: ref(fadeInTransitionDuration),
        transitionTimingFunction: ref(fadeInTransitionTimingFunction)
    }, options);

    selector('.fade-in-transition-enter-from, .fade-in-transition-leave-active', {
        opacity: 0
    }, options);
}

export function useFadeInLinearTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const fadeInLinearTransitionProperty = variable(
        'fade-in-linear-transition-property',
        'opacity',
        options
    );
    const fadeInLinearTransitionDuration = variable(
        'fade-in-linear-transition-duration',
        ref(transitionDuration),
        options
    );
    const fadeInLinearTransitionTimingFunction = variable(
        'fade-in-linear-transition-timing-function',
        'cubic-bezier(0.23, 1, 0.32, 1)',
        options
    );
    const fadeInLinearTransition = variable(
        'fade-in-linear-transition',
        [
            ref(fadeInLinearTransitionProperty),
            ref(fadeInLinearTransitionDuration),
            ref(fadeInLinearTransitionTimingFunction)
        ],
        options
    );

    return {
        fadeInLinearTransitionProperty,
        fadeInLinearTransitionDuration,
        fadeInLinearTransitionTimingFunction,
        fadeInLinearTransition
    };
}

export function useFadeInLinearTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        fadeInLinearTransitionProperty,
        fadeInLinearTransitionDuration,
        fadeInLinearTransitionTimingFunction
    } = useFadeInLinearTransitionThemeVariables(options);

    selector('.fade-in-linear-transition-enter-active, .fade-in-linear-transition-leave-active', {
        transitionProperty: ref(fadeInLinearTransitionProperty),
        transitionDuration: ref(fadeInLinearTransitionDuration),
        transitionTimingFunction: ref(fadeInLinearTransitionTimingFunction)
    }, options);

    selector(
        '.fade-in-linear-transition-enter-from, .fade-in-linear-transition-leave-from, .fade-in-linear-transition-leave-active',
        {
            opacity: 0
        }, options
    );
}

export function useSlideInRightTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const slideInRightTransitionProperty = variable(
        'slide-in-right-transition-property',
        'transform',
        options
    );
    const slideInRightTransitionDuration = variable(
        'slide-in-right-transition-duration',
        ref(transitionDuration),
        options
    );
    const slideInRightTransitionTimingFunction = variable(
        'slide-in-right-transition-timing-function',
        'ease',
        options
    );
    const slideInRightTransition = variable(
        'slide-in-right-transition',
        [
            ref(slideInRightTransitionProperty),
            ref(slideInRightTransitionDuration),
            ref(slideInRightTransitionTimingFunction)
        ],
        options
    );

    return {
        slideInRightTransitionProperty,
        slideInRightTransitionDuration,
        slideInRightTransitionTimingFunction,
        slideInRightTransition
    };
}

export function useSlideInRightTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        slideInRightTransitionProperty,
        slideInRightTransitionDuration,
        slideInRightTransitionTimingFunction
    } = useSlideInRightTransitionThemeVariables(options);

    selector('.slide-in-right-transition-enter-active, .slide-in-right-transition-leave-active', {
        transitionProperty: ref(slideInRightTransitionProperty),
        transitionDuration: ref(slideInRightTransitionDuration),
        transitionTimingFunction: ref(slideInRightTransitionTimingFunction),
        transformOrigin: 'left'
    }, options);

    selector('.slide-in-right-transition-enter-from, .slide-in-right-transition-leave-to', {
        transform: 'translateX(-100%)'
    }, options);

    selector('.slide-in-right-transition-enter-to, .slide-in-right-transition-leave-from', {
        transform: 'translateX(0)'
    }, options);
}

export function useZoomInCenterTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const zoomInCenterTransitionProperty = variable(
        'zoom-in-center-transition-property',
        'transform, opacity',
        options
    );
    const zoomInCenterTransitionDuration = variable(
        'zoom-in-center-transition-duration',
        ref(transitionDuration),
        options
    );
    const zoomInCenterTransitionTimingFunction = variable(
        'zoom-in-center-transition-timing-function',
        'cubic-bezier(0.55, 0, 0.1, 1)',
        options
    );
    const zoomInCenterTransition = variable(
        'zoom-in-center-transition',
        [
            ref(zoomInCenterTransitionProperty),
            ref(zoomInCenterTransitionDuration),
            ref(zoomInCenterTransitionTimingFunction)
        ],
        options
    );

    return {
        zoomInCenterTransitionProperty,
        zoomInCenterTransitionDuration,
        zoomInCenterTransitionTimingFunction,
        zoomInCenterTransition
    };
}

export function useZoomInCenterTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        zoomInCenterTransitionProperty,
        zoomInCenterTransitionDuration,
        zoomInCenterTransitionTimingFunction
    } = useZoomInCenterTransitionThemeVariables(options);

    selector('.zoom-in-center-transition-enter-active, .zoom-in-center-transition-leave-active', {
        transitionProperty: ref(zoomInCenterTransitionProperty),
        transitionDuration: ref(zoomInCenterTransitionDuration),
        transitionTimingFunction: ref(zoomInCenterTransitionTimingFunction),
        opacity: 1,
        transformOrigin: 'center center'
    }, options);

    selector('.zoom-in-center-transition-enter-from, .zoom-in-center-transition-leave-active', {
        opacity: 0,
        transform: 'scale(0, 0)'
    }, options);
}

export function useZoomInTopTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const zoomInTopTransitionProperty = variable(
        'zoom-in-top-transition-property',
        'transform, opacity',
        options
    );
    const zoomInTopTransitionDuration = variable(
        'zoom-in-top-transition-duration',
        ref(transitionDuration),
        options
    );
    const zoomInTopTransitionTimingFunction = variable(
        'zoom-in-top-transition-timing-function',
        'cubic-bezier(0.23, 1, 0.32, 1)',
        options
    );
    const zoomInTopTransition = variable(
        'zoom-in-top-transition',
        [
            ref(zoomInTopTransitionProperty),
            ref(zoomInTopTransitionDuration),
            ref(zoomInTopTransitionTimingFunction)
        ],
        options
    );

    return {
        zoomInTopTransitionProperty,
        zoomInTopTransitionDuration,
        zoomInTopTransitionTimingFunction,
        zoomInTopTransition
    };
}

export function useZoomInTopTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        zoomInTopTransitionProperty,
        zoomInTopTransitionDuration,
        zoomInTopTransitionTimingFunction
    } = useZoomInTopTransitionThemeVariables(options);

    selector('.zoom-in-top-transition-enter-active, .zoom-in-top-transition-leave-active', {
        transitionProperty: ref(zoomInTopTransitionProperty),
        transitionDuration: ref(zoomInTopTransitionDuration),
        transitionTimingFunction: ref(zoomInTopTransitionTimingFunction),
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: 'center top'
    }, options);

    selector('.zoom-in-top-transition-enter-from, .zoom-in-top-transition-leave-active', {
        opacity: 0,
        transform: 'scaleY(0)'
    }, options);
}

export function useZoomInRightTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const zoomInRightTransitionProperty = variable(
        'zoom-in-right-transition-property',
        'transform, opacity',
        options
    );
    const zoomInRightTransitionDuration = variable(
        'zoom-in-right-transition-duration',
        ref(transitionDuration),
        options
    );
    const zoomInRightTransitionTimingFunction = variable(
        'zoom-in-right-transition-timing-function',
        'cubic-bezier(0.23, 1, 0.32, 1)',
        options
    );
    const zoomInRightTransition = variable(
        'zoom-in-right-transition',
        [
            ref(zoomInRightTransitionProperty),
            ref(zoomInRightTransitionDuration),
            ref(zoomInRightTransitionTimingFunction)
        ],
        options
    );

    return {
        zoomInRightTransitionProperty,
        zoomInRightTransitionDuration,
        zoomInRightTransitionTimingFunction,
        zoomInRightTransition
    };
}

export function useZoomInRightTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        zoomInRightTransitionProperty,
        zoomInRightTransitionDuration,
        zoomInRightTransitionTimingFunction
    } = useZoomInRightTransitionThemeVariables(options);

    selector('.zoom-in-right-transition-enter-active, .zoom-in-right-transition-leave-active', {
        transitionProperty: ref(zoomInRightTransitionProperty),
        transitionDuration: ref(zoomInRightTransitionDuration),
        transitionTimingFunction: ref(zoomInRightTransitionTimingFunction),
        opacity: 1,
        transform: 'scale(1, 1)',
        transformOrigin: 'top right'
    }, options);

    selector('.zoom-in-right-transition-enter-from, .zoom-in-right-transition-leave-active', {
        opacity: 0,
        transform: 'scale(0.45, 0.45)'
    }, options);
}

export function useZoomInBottomTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const zoomInBottomTransitionProperty = variable(
        'zoom-in-bottom-transition-property',
        'transform, opacity',
        options
    );
    const zoomInBottomTransitionDuration = variable(
        'zoom-in-bottom-transition-duration',
        ref(transitionDuration),
        options
    );
    const zoomInBottomTransitionTimingFunction = variable(
        'zoom-in-bottom-transition-timing-function',
        'cubic-bezier(0.23, 1, 0.32, 1)',
        options
    );
    const zoomInBottomTransition = variable(
        'zoom-in-bottom-transition',
        [
            ref(zoomInBottomTransitionProperty),
            ref(zoomInBottomTransitionDuration),
            ref(zoomInBottomTransitionTimingFunction)
        ],
        options
    );

    return {
        zoomInBottomTransitionProperty,
        zoomInBottomTransitionDuration,
        zoomInBottomTransitionTimingFunction,
        zoomInBottomTransition
    };
}

export function useZoomInBottomTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        zoomInBottomTransitionProperty,
        zoomInBottomTransitionDuration,
        zoomInBottomTransitionTimingFunction
    } = useZoomInBottomTransitionThemeVariables(options);

    selector('.zoom-in-bottom-transition-enter-active, .zoom-in-bottom-transition-leave-active', {
        transitionProperty: ref(zoomInBottomTransitionProperty),
        transitionDuration: ref(zoomInBottomTransitionDuration),
        transitionTimingFunction: ref(zoomInBottomTransitionTimingFunction),
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: 'center bottom'
    }, options);

    selector('.zoom-in-bottom-transition-enter-from, .zoom-in-bottom-transition-leave-active', {
        opacity: 0,
        transform: 'scaleY(0)'
    }, options);
}

export function useZoomInLeftTransitionThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { transitionDuration } = useTransition(options);

    const zoomInLeftTransitionProperty = variable(
        'zoom-in-left-transition-property',
        'transform, opacity',
        options
    );
    const zoomInLeftTransitionDuration = variable(
        'zoom-in-left-transition-duration',
        ref(transitionDuration),
        options
    );
    const zoomInLeftTransitionTimingFunction = variable(
        'zoom-in-left-transition-timing-function',
        'cubic-bezier(0.23, 1, 0.32, 1)',
        options
    );
    const zoomInLeftTransition = variable(
        'zoom-in-left-transition',
        [
            ref(zoomInLeftTransitionProperty),
            ref(zoomInLeftTransitionDuration),
            ref(zoomInLeftTransitionTimingFunction)
        ],
        options
    );

    return {
        zoomInLeftTransitionProperty,
        zoomInLeftTransitionDuration,
        zoomInLeftTransitionTimingFunction,
        zoomInLeftTransition
    };
}

export function useZoomInLeftTransitionTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        zoomInLeftTransitionProperty,
        zoomInLeftTransitionDuration,
        zoomInLeftTransitionTimingFunction
    } = useZoomInLeftTransitionThemeVariables(options);

    selector('.zoom-in-left-transition-enter-active, .zoom-in-left-transition-leave-active', {
        transitionProperty: ref(zoomInLeftTransitionProperty),
        transitionDuration: ref(zoomInLeftTransitionDuration),
        transitionTimingFunction: ref(zoomInLeftTransitionTimingFunction),
        opacity: 1,
        transform: 'scale(1, 1)',
        transformOrigin: 'top left'
    }, options);

    selector('.zoom-in-left-transition-enter-from, .zoom-in-left-transition-leave-active', {
        opacity: 0,
        transform: 'scale(0.45, 0.45)'
    }, options);
}

export function useTransitionsTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useExpandTransitionThemeVariables(options);
    useExpandTransitionTheme(options);
    useFadeInTransitionThemeVariables(options);
    useFadeInTransitionTheme(options);
    useFadeInLinearTransitionThemeVariables(options);
    useFadeInLinearTransitionTheme(options);
    useSlideInRightTransitionThemeVariables(options);
    useSlideInRightTransitionTheme(options);
    useZoomInCenterTransitionThemeVariables(options);
    useZoomInCenterTransitionTheme(options);
    useZoomInTopTransitionThemeVariables(options);
    useZoomInTopTransitionTheme(options);
    useZoomInRightTransitionThemeVariables(options);
    useZoomInRightTransitionTheme(options);
    useZoomInBottomTransitionThemeVariables(options);
    useZoomInBottomTransitionTheme(options);
    useZoomInLeftTransitionThemeVariables(options);
    useZoomInLeftTransitionTheme(options);
}
