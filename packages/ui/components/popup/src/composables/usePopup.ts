import { computed, HTMLAttributes, Ref } from 'vue';
import { ref, watch } from 'vue';
import { focusFirstDescendant } from '@inkline/utils';
import type { Placement, Strategy } from '@floating-ui/dom';
import {
    autoUpdate,
    computePosition,
    arrow as arrowModifier,
    flip as flipModifier,
    offset as offsetModifier,
    shift as shiftModifier
} from '@floating-ui/dom';
import type { PopupTriggerListener } from '@inkline/types';
import { useClickOutside, useKeyDown, unrefHTMLElement } from '@inkline/composables';

export type UsePopupOptions = {
    disabled: Ref<boolean | undefined>;
    listener: Ref<PopupTriggerListener | PopupTriggerListener[]>;
    placement: Ref<Placement>;
    interactive: Ref<boolean>;
    interactiveDelay: Ref<number>;
    visible: Ref<boolean | undefined>;
    animationDuration: Ref<number>;
    hideOnClickOutside: Ref<boolean>;
    offset: Ref<number>;
    popupOptions: Ref<{
        strategy?: Strategy;
    }>;
    onClickOutside: (event: MouseEvent, ...args: any[]) => void;
    onUpdateModelValue: (visible: boolean) => void;
};

export type UsePopupProps = HTMLAttributes & {
    'data-popup-placement': Placement;
    ref: Ref<HTMLElement | null>;
};

const arrowSideByPlacement: Record<string, 'top' | 'right' | 'bottom' | 'left'> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
};

export function usePopup({
    disabled,
    listener,
    placement,
    interactive,
    interactiveDelay,
    visible: visibleProp,
    animationDuration,
    hideOnClickOutside,
    offset,
    popupOptions,
    ...callbacks
}: UsePopupOptions) {
    const triggerRef = ref<HTMLElement | null>(null);
    const popupRef = ref<HTMLElement | null>(null);
    const arrowRef = ref<HTMLElement | null>(null);

    const unregisterOnClickOutside = useClickOutside([triggerRef, popupRef], onClickOutside);
    const unregisterOnKeyDown = useKeyDown(triggerRef, { Escape: onKeyEscape });

    const isVisible = ref(visibleProp.value);
    const isAnimating = ref(false);

    const triggerStack = ref(0);
    const popupCleanup = ref<() => void>();

    const popupStyles = ref({});
    const arrowStyles = ref({});

    const listenerTypes = computed(() =>
        Array.isArray(listener.value) ? listener.value : [listener.value]
    );

    watch(visibleProp, (value) => {
        if (value === isVisible.value) return;

        if (value) {
            show();
        } else {
            hide();
        }
    });

    const triggerProps = computed(() =>
        listenerTypes.value.reduce<UsePopupProps>(
            (acc, listenerType) => {
                switch (listenerType) {
                    case 'hover':
                        acc.onMouseenter = interactive.value ? interactiveShow : show;
                        acc.onMouseleave = interactive.value ? interactiveHide : hide;
                        break;
                    case 'click':
                        acc.onClick = onClick;
                        break;
                    case 'focus':
                        acc.onFocus = show;
                        acc.onBlur = hide;
                        break;
                    default:
                        break;
                }

                return acc;
            },
            {
                'data-popup-placement': placement.value,
                ref: triggerRef
            }
        )
    );

    const popupProps = computed(() =>
        listenerTypes.value.reduce<UsePopupProps>(
            (acc, listenerType) => {
                switch (listenerType) {
                    case 'hover':
                        if (interactive.value) {
                            acc.onMouseenter = interactiveShow;
                            acc.onMouseleave = interactiveHide;
                        }
                        break;
                    default:
                        break;
                }

                return acc;
            },
            {
                'data-popup-placement': placement.value,
                ref: popupRef,
                style: popupStyles.value
            }
        )
    );

    const arrowProps = computed(() => ({
        ref: arrowRef,
        style: arrowStyles.value
    }));

    function show() {
        if (disabled.value || isVisible.value) {
            return;
        }

        triggerStack.value += 1;
        isVisible.value = true;

        createPopup();

        callbacks.onUpdateModelValue(true);
    }

    function hide() {
        if (disabled.value || !isVisible.value) {
            return;
        }

        triggerStack.value -= 1;

        if (triggerStack.value <= 0) {
            triggerStack.value = 0;
            isVisible.value = false;

            callbacks.onUpdateModelValue(false);

            setTimeout(() => destroyPopup(), animationDuration.value);
        }
    }

    function onClick() {
        if (isVisible.value) {
            hide();
        } else {
            show();
        }
    }

    function onClickOutside(event: MouseEvent) {
        if (!hideOnClickOutside.value) {
            return;
        }

        callbacks.onClickOutside(event);

        if (!visibleProp.value) {
            hide();
        }
    }

    function onKeyEscape() {
        hide();
    }

    function interactiveShow() {
        isAnimating.value = false;
        show();
    }

    function interactiveHide() {
        isAnimating.value = true;
        setTimeout(() => {
            if (isAnimating.value) {
                hide();
            }
        }, interactiveDelay.value);
    }

    async function updatePosition() {
        const triggerElement = unrefHTMLElement(triggerRef);
        const popupElement = unrefHTMLElement(popupRef);
        const arrowElement = unrefHTMLElement(arrowRef);

        if (!triggerElement || !popupElement) {
            return;
        }

        const {
            x,
            y,
            placement: placementData,
            middlewareData
        } = await computePosition(triggerElement, popupElement, {
            strategy: 'absolute',
            placement: placement.value,
            middleware: [
                offsetModifier(offset.value),
                flipModifier(),
                shiftModifier({ padding: 6 })
            ].concat(arrowElement ? [arrowModifier({ element: arrowElement })] : []),
            ...popupOptions.value
        });

        popupStyles.value = {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`
        };

        popupElement?.setAttribute('data-popup-placement', placementData);

        // Accessing the data
        if (arrowElement) {
            const placementSide = placementData.split('-')[0];
            const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};

            const arrowSide = arrowSideByPlacement[placementSide];
            const arrowOffset = Math.min(arrowElement.offsetHeight, arrowElement.offsetWidth) - 1;

            arrowStyles.value = {
                ...(arrowSide === 'top' || arrowSide === 'bottom' ? { left: `${arrowX}px` } : {}),
                ...(arrowSide === 'left' || arrowSide === 'right' ? { top: `${arrowY}px` } : {}),
                [arrowSide as string]: `-${arrowOffset}px`
            };
        }
    }

    function createPopup() {
        if (typeof window === 'undefined') {
            return;
        }

        const triggerElement = unrefHTMLElement(triggerRef);
        const popupElement = unrefHTMLElement(popupRef);

        if (!triggerElement || !popupElement) {
            console.error('Trigger and popup elements are required.');
            return;
        }

        popupCleanup.value = autoUpdate(triggerElement, popupElement, () => void updatePosition());
    }

    function destroyPopup() {
        if (popupCleanup.value) {
            popupCleanup.value();
            popupCleanup.value = undefined;
        }
    }

    function focusTrigger() {
        const triggerElement = unrefHTMLElement(triggerRef);

        if (!triggerElement) {
            return;
        }

        for (const child of triggerElement.children) {
            if (focusFirstDescendant(child as HTMLElement)) {
                (child as HTMLElement).focus();
                break;
            }
        }
    }

    function cleanup() {
        unregisterOnClickOutside();
        unregisterOnKeyDown();
    }

    return {
        isVisible,
        triggerProps,
        arrowStyles,
        arrowProps,
        popupStyles,
        popupProps,
        show,
        hide,
        onClick,
        onClickOutside,
        onKeyEscape,
        focusTrigger,
        createPopup,
        destroyPopup,
        cleanup
    };
}
