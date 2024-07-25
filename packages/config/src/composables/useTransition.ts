import { ref, variable } from '../tokens';
import { defaultDefinitionOptions } from '../constants';

export function useTransitionBase(options = defaultDefinitionOptions) {
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

export function useTransitionVariants(options = defaultDefinitionOptions) {
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
        expandTransitionProperty,
        expandTransitionDuration,
        expandTransitionTimingFunction,
        expandTransition,
        fadeInTransitionProperty,
        fadeInTransitionDuration,
        fadeInTransitionTimingFunction,
        fadeInTransition,
        fadeInLinearTransitionProperty,
        fadeInLinearTransitionDuration,
        fadeInLinearTransitionTimingFunction,
        fadeInLinearTransition,
        slideInRightTransitionProperty,
        slideInRightTransitionDuration,
        slideInRightTransitionTimingFunction,
        slideInRightTransition,
        zoomInCenterTransitionProperty,
        zoomInCenterTransitionDuration,
        zoomInCenterTransitionTimingFunction,
        zoomInCenterTransition,
        zoomInTopTransitionProperty,
        zoomInTopTransitionDuration,
        zoomInTopTransitionTimingFunction,
        zoomInTopTransition,
        zoomInRightTransitionProperty,
        zoomInRightTransitionDuration,
        zoomInRightTransitionTimingFunction,
        zoomInRightTransition,
        zoomInBottomTransitionProperty,
        zoomInBottomTransitionDuration,
        zoomInBottomTransitionTimingFunction,
        zoomInBottomTransition,
        zoomInLeftTransitionProperty,
        zoomInLeftTransitionDuration,
        zoomInLeftTransitionTimingFunction,
        zoomInLeftTransition
    };
}

export function useTransition(options = defaultDefinitionOptions) {
    return {
        ...useTransitionBase(options),
        ...useTransitionVariants(options)
    };
}
