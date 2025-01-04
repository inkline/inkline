import { defaultDefinitionOptions, nsvariables, ref, selector } from '@inkline/core';
import { useSpacing, useTransitionBase } from '@inkline/theme';

const ns = 'toast-container';

export function useToastContainerThemeVariables(options = defaultDefinitionOptions) {
    const { spacing } = useSpacing();
    const { transitionDuration, transitionTimingFunction } = useTransitionBase();

    return {
        ...nsvariables(
            ns,
            {
                margin: {
                    top: ref(spacing),
                    right: ref(spacing),
                    bottom: ref(spacing),
                    left: ref(spacing)
                },
                width: '320px',
                zIndex: 2010
            },
            options
        ),
        ...nsvariables(
            [ns, 'toast'] as const,
            {
                margin: {
                    bottom: ref(spacing)
                },
                transition: {
                    property: 'transform, opacity',
                    duration: ref(transitionDuration),
                    timingFunction: ref(transitionTimingFunction)
                }
            },
            options
        )
    };
}

export function useToastContainerLayout() {
    const {
        toastContainerMargin,
        toastContainerWidth,
        toastContainerZIndex,
        toastContainerToastMargin,
        toastContainerToastTransition
    } = useToastContainerThemeVariables();

    selector('.toast-container', {
        margin: ref(toastContainerMargin),
        width: ref(toastContainerWidth),
        position: 'fixed',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'visible',
        zIndex: ref(toastContainerZIndex)
    });

    // .toast-container {

    selector('.toast-container.-top-left', {
        top: 0,
        left: 0
    });

    selector('.toast-container.-top', {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)'
    });

    selector('.toast-container.-top-right', {
        top: 0,
        right: 0
    });

    selector('.toast-container.-right', {
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)'
    });

    selector('.toast-container.-bottom-right', {
        bottom: 0,
        right: 0
    });

    selector('.toast-container.-bottom', {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)'
    });

    selector('.toast-container.-bottom-left', {
        bottom: 0,
        left: 0
    });

    selector('.toast-container.-left', {
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
    });

    selector('.toast-container > .toast', {
        margin: ref(toastContainerToastMargin),
        width: ref(toastContainerWidth),
        maxWidth: '100%',
        position: 'relative'
    });

    selector('.toast-container > .toast:last-of-type', {
        marginBottom: 0
    });

    selector(
        [
            '.toast-transition-move',
            '.toast-transition-enter-active',
            '.toast-transition-leave-active'
        ],
        {
            transition: ref(toastContainerToastTransition)
        }
    );

    selector(['.toast-transition-enter-from', '.toast-transition-leave-to'], {
        opacity: 0
    });

    // Ensure leaving items are taken out of layout flow so that moving
    // animations can be calculated correctly.
    selector('.toast-transition-leave-active', {
        position: 'absolute'
    });
}

export function useToastContainerTheme() {
    useToastContainerThemeVariables();
    useToastContainerLayout();
}
