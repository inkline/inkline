import { defaultDefinitionOptions, ref, selector, variable } from '@inkline/core';
import { useTransitionBase } from '../../variables';

export function useExpandTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration, transitionTimingFunction } = useTransitionBase();

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

export function useExpandTransitionTheme() {
    const { expandTransitionProperty, expandTransitionDuration, expandTransitionTimingFunction } =
        useExpandTransitionThemeVariables();

    selector('.expand-enter-active, .expand-leave-active', {
        transitionProperty: ref(expandTransitionProperty),
        transitionDuration: ref(expandTransitionDuration),
        transitionTimingFunction: ref(expandTransitionTimingFunction),
        overflow: 'hidden'
    });

    selector('.expand-enter-from, .expand-leave-to', {
        height: 0
    });
}

export function useFadeInTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useFadeInTransitionTheme() {
    const { fadeInTransitionProperty, fadeInTransitionDuration, fadeInTransitionTimingFunction } =
        useFadeInTransitionThemeVariables();

    selector('.fade-in-transition-enter-active, .fade-in-transition-leave-active', {
        transitionProperty: ref(fadeInTransitionProperty),
        transitionDuration: ref(fadeInTransitionDuration),
        transitionTimingFunction: ref(fadeInTransitionTimingFunction)
    });

    selector('.fade-in-transition-enter-from, .fade-in-transition-leave-active', {
        opacity: 0
    });
}

export function useFadeInLinearTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useFadeInLinearTransitionTheme() {
    const {
        fadeInLinearTransitionProperty,
        fadeInLinearTransitionDuration,
        fadeInLinearTransitionTimingFunction
    } = useFadeInLinearTransitionThemeVariables();

    selector('.fade-in-linear-transition-enter-active, .fade-in-linear-transition-leave-active', {
        transitionProperty: ref(fadeInLinearTransitionProperty),
        transitionDuration: ref(fadeInLinearTransitionDuration),
        transitionTimingFunction: ref(fadeInLinearTransitionTimingFunction)
    });

    selector(
        '.fade-in-linear-transition-enter-from, .fade-in-linear-transition-leave-from, .fade-in-linear-transition-leave-active',
        {
            opacity: 0
        }
    );
}

export function useSlideInRightTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useSlideInRightTransitionTheme() {
    const {
        slideInRightTransitionProperty,
        slideInRightTransitionDuration,
        slideInRightTransitionTimingFunction
    } = useSlideInRightTransitionThemeVariables();

    selector('.slide-in-right-transition-enter-active, .slide-in-right-transition-leave-active', {
        transitionProperty: ref(slideInRightTransitionProperty),
        transitionDuration: ref(slideInRightTransitionDuration),
        transitionTimingFunction: ref(slideInRightTransitionTimingFunction),
        transformOrigin: 'left'
    });

    selector('.slide-in-right-transition-enter-from, .slide-in-right-transition-leave-to', {
        transform: 'translateX(-100%)'
    });

    selector('.slide-in-right-transition-enter-to, .slide-in-right-transition-leave-from', {
        transform: 'translateX(0)'
    });
}

export function useZoomInCenterTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useZoomInCenterTransitionTheme() {
    const {
        zoomInCenterTransitionProperty,
        zoomInCenterTransitionDuration,
        zoomInCenterTransitionTimingFunction
    } = useZoomInCenterTransitionThemeVariables();

    selector('.zoom-in-center-transition-enter-active, .zoom-in-center-transition-leave-active', {
        transitionProperty: ref(zoomInCenterTransitionProperty),
        transitionDuration: ref(zoomInCenterTransitionDuration),
        transitionTimingFunction: ref(zoomInCenterTransitionTimingFunction),
        opacity: 1,
        transformOrigin: 'center center'
    });

    selector('.zoom-in-center-transition-enter-from, .zoom-in-center-transition-leave-active', {
        opacity: 0,
        transform: 'scale(0, 0)'
    });
}

export function useZoomInTopTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useZoomInTopTransitionTheme() {
    const {
        zoomInTopTransitionProperty,
        zoomInTopTransitionDuration,
        zoomInTopTransitionTimingFunction
    } = useZoomInTopTransitionThemeVariables();

    selector('.zoom-in-top-transition-enter-active, .zoom-in-top-transition-leave-active', {
        transitionProperty: ref(zoomInTopTransitionProperty),
        transitionDuration: ref(zoomInTopTransitionDuration),
        transitionTimingFunction: ref(zoomInTopTransitionTimingFunction),
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: 'center top'
    });

    selector('.zoom-in-top-transition-enter-from, .zoom-in-top-transition-leave-active', {
        opacity: 0,
        transform: 'scaleY(0)'
    });
}

export function useZoomInRightTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useZoomInRightTransitionTheme() {
    const {
        zoomInRightTransitionProperty,
        zoomInRightTransitionDuration,
        zoomInRightTransitionTimingFunction
    } = useZoomInRightTransitionThemeVariables();

    selector('.zoom-in-right-transition-enter-active, .zoom-in-right-transition-leave-active', {
        transitionProperty: ref(zoomInRightTransitionProperty),
        transitionDuration: ref(zoomInRightTransitionDuration),
        transitionTimingFunction: ref(zoomInRightTransitionTimingFunction),
        opacity: 1,
        transform: 'scale(1, 1)',
        transformOrigin: 'top right'
    });

    selector('.zoom-in-right-transition-enter-from, .zoom-in-right-transition-leave-active', {
        opacity: 0,
        transform: 'scale(0.45, 0.45)'
    });
}

export function useZoomInBottomTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useZoomInBottomTransitionTheme() {
    const {
        zoomInBottomTransitionProperty,
        zoomInBottomTransitionDuration,
        zoomInBottomTransitionTimingFunction
    } = useZoomInBottomTransitionThemeVariables();

    selector('.zoom-in-bottom-transition-enter-active, .zoom-in-bottom-transition-leave-active', {
        transitionProperty: ref(zoomInBottomTransitionProperty),
        transitionDuration: ref(zoomInBottomTransitionDuration),
        transitionTimingFunction: ref(zoomInBottomTransitionTimingFunction),
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: 'center bottom'
    });

    selector('.zoom-in-bottom-transition-enter-from, .zoom-in-bottom-transition-leave-active', {
        opacity: 0,
        transform: 'scaleY(0)'
    });
}

export function useZoomInLeftTransitionThemeVariables(options = defaultDefinitionOptions) {
    const { transitionDuration } = useTransitionBase();

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

export function useZoomInLeftTransitionTheme() {
    const {
        zoomInLeftTransitionProperty,
        zoomInLeftTransitionDuration,
        zoomInLeftTransitionTimingFunction
    } = useZoomInLeftTransitionThemeVariables();

    selector('.zoom-in-left-transition-enter-active, .zoom-in-left-transition-leave-active', {
        transitionProperty: ref(zoomInLeftTransitionProperty),
        transitionDuration: ref(zoomInLeftTransitionDuration),
        transitionTimingFunction: ref(zoomInLeftTransitionTimingFunction),
        opacity: 1,
        transform: 'scale(1, 1)',
        transformOrigin: 'top left'
    });

    selector('.zoom-in-left-transition-enter-from, .zoom-in-left-transition-leave-active', {
        opacity: 0,
        transform: 'scale(0.45, 0.45)'
    });
}

export function useTransitionsTheme() {
    useExpandTransitionThemeVariables();
    useExpandTransitionTheme();
    useFadeInTransitionThemeVariables();
    useFadeInTransitionTheme();
    useFadeInLinearTransitionThemeVariables();
    useFadeInLinearTransitionTheme();
    useSlideInRightTransitionThemeVariables();
    useSlideInRightTransitionTheme();
    useZoomInCenterTransitionThemeVariables();
    useZoomInCenterTransitionTheme();
    useZoomInTopTransitionThemeVariables();
    useZoomInTopTransitionTheme();
    useZoomInRightTransitionThemeVariables();
    useZoomInRightTransitionTheme();
    useZoomInBottomTransitionThemeVariables();
    useZoomInBottomTransitionTheme();
    useZoomInLeftTransitionThemeVariables();
    useZoomInLeftTransitionTheme();
}
