import { onMounted, onUnmounted, ref, Ref, watch } from 'vue';
import { focusFirstDescendant, off, on } from '@grozav/utils';
import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
    Placement
} from '@floating-ui/dom';

export type PopupEvent = 'hover' | 'click' | 'focus' | 'manual';

export function usePopupControl(props: {
    triggerRef: Ref<HTMLElement | null>;
    popupRef: Ref<HTMLElement | null>;
    arrowRef: Ref<HTMLElement | null>;
    componentProps: Ref<{
        disabled?: boolean;
        readonly?: boolean;
        events: PopupEvent | PopupEvent[];
        placement: Placement;
        interactable: boolean;
        visible?: boolean;
        animationDuration: number;
        hoverHideDelay: number;
        offset: number;
    }>;
    emit: (event: any, ...args: any[]) => void;
}) {
    const visible = ref(props.componentProps.value.visible);
    const instance = ref<() => void>();
    const animating = ref(false);
    const triggerStack = ref(0);

    onMounted(() => {
        addEventListeners();
    });

    onUnmounted(() => {
        removeEventListeners();
    });

    watch(
        () => props.componentProps.value.visible,
        (value) => {
            if (value) {
                show();
            } else {
                hide();
            }
        }
    );

    function addEventListeners() {
        if (!props.triggerRef.value || !props.popupRef.value) {
            return;
        }

        console.log(props.triggerRef, props.popupRef.value);

        ([] as PopupEvent[]).concat(props.componentProps.value.events).forEach((trigger) => {
            switch (trigger) {
                case 'hover':
                    on(
                        props.triggerRef.value as HTMLElement,
                        'mouseenter',
                        props.componentProps.value.interactable ? hoverShow : show
                    );
                    on(
                        props.triggerRef.value as HTMLElement,
                        'mouseleave',
                        props.componentProps.value.interactable ? hoverHide : hide
                    );

                    if (props.componentProps.value.interactable) {
                        on(props.popupRef.value as HTMLElement, 'mouseenter', hoverShow);
                        on(props.popupRef.value as HTMLElement, 'mouseleave', hoverHide);
                    }
                    break;
                case 'click':
                    on(props.triggerRef.value as HTMLElement, 'click', onClick);
                    break;
                case 'focus':
                    for (const child of props.triggerRef.value!.children) {
                        on(child as HTMLElement, 'focus', show);
                        on(child as HTMLElement, 'blur', hide);
                    }
                    break;
                default:
                    break;
            }
        });
    }

    function removeEventListeners() {
        if (!props.triggerRef.value || !props.popupRef.value) {
            return;
        }

        ([] as PopupEvent[]).concat(props.componentProps.value.events).forEach((trigger) => {
            switch (trigger) {
                case 'hover':
                    off(
                        props.triggerRef.value as HTMLElement,
                        'mouseenter',
                        props.componentProps.value.interactable ? hoverShow : show
                    );
                    off(
                        props.triggerRef.value as HTMLElement,
                        'mouseleave',
                        props.componentProps.value.interactable ? hoverHide : hide
                    );

                    if (props.componentProps.value.interactable) {
                        off(props.popupRef.value as HTMLElement, 'mouseenter', hoverShow);
                        off(props.popupRef.value as HTMLElement, 'mouseleave', hoverHide);
                    }
                    break;
                case 'click':
                    off(props.triggerRef.value as HTMLElement, 'click', onClick);
                    break;
                case 'focus':
                    for (const child of props.triggerRef.value!.children) {
                        off(child as HTMLElement, 'focus', show);
                        off(child as HTMLElement, 'blur', hide);
                    }
                    break;
                default:
                    break;
            }
        });
    }

    function show() {
        if (
            props.componentProps.value.disabled ||
            props.componentProps.value.readonly ||
            visible.value
        ) {
            return;
        }

        triggerStack.value += 1;
        visible.value = true;

        createPopup();

        props.emit('update:visible', true);
    }

    function hide() {
        if (
            props.componentProps.value.disabled ||
            props.componentProps.value.readonly ||
            !visible.value
        ) {
            return;
        }

        triggerStack.value -= 1;

        if (triggerStack.value <= 0) {
            triggerStack.value = 0;
            visible.value = false;

            props.emit('update:visible', false);

            setTimeout(() => destroyPopup(), props.componentProps.value.animationDuration);
        }
    }

    function onClick() {
        if (visible.value) {
            hide();
        } else {
            show();
        }
    }

    function onClickOutside() {
        props.emit('click:outside');

        if (!props.componentProps.value.visible) {
            hide();
        }
    }

    function onKeyEscape() {
        hide();
    }

    function hoverShow() {
        animating.value = false;
        show();
    }

    function hoverHide() {
        animating.value = true;
        setTimeout(() => {
            if (animating.value) {
                hide();
            }
        }, props.componentProps.value.hoverHideDelay);
    }

    function createPopup() {
        if (typeof window === 'undefined') {
            return;
        }

        if (!props.triggerRef.value || !props.popupRef.value) {
            throw new Error('Trigger and popup elements are required.');
        }

        const triggerRef = props.triggerRef.value;
        const popupRef = props.popupRef.value;
        const arrowRef = props.arrowRef.value;

        instance.value = autoUpdate(triggerRef, popupRef, () => {
            computePosition(triggerRef, popupRef, {
                placement: props.componentProps.value.placement,
                strategy: 'fixed',
                middleware: [
                    offset(props.componentProps.value.offset),
                    flip(),
                    shift({ padding: 6 })
                ].concat(arrowRef ? [arrow({ element: arrowRef })] : [])
            }).then(({ x, y, placement, middlewareData }) => {
                Object.assign(popupRef.style, {
                    left: `${x}px`,
                    top: `${y}px`
                });

                popupRef?.setAttribute('data-popup-placement', placement);

                // Accessing the data
                if (arrowRef) {
                    const { x: arrowX, y: arrowY } = middlewareData.arrow as {
                        x: number;
                        y: number;
                    };

                    const staticSide = {
                        top: 'bottom',
                        right: 'left',
                        bottom: 'top',
                        left: 'right'
                    }[placement.split('-')[0]];

                    Object.assign(arrowRef.style, {
                        left: arrowX !== null ? `${arrowX}px` : '',
                        top: arrowY !== null ? `${arrowY}px` : '',
                        right: '',
                        bottom: '',
                        [staticSide as string]: '-6px'
                    });
                }
            });
        });
    }

    function destroyPopup() {
        if (instance.value) {
            instance.value();
            instance.value = undefined;
        }
    }

    function focusTrigger() {
        if (!props.triggerRef.value) {
            return;
        }

        for (const child of props.triggerRef.value.children) {
            if (focusFirstDescendant(child as HTMLElement)) {
                (child as HTMLElement).focus();
                break;
            }
        }
    }

    return {
        visible,
        show,
        hide,
        onClick,
        onClickOutside,
        onKeyEscape,
        focusTrigger,
        createPopup,
        destroyPopup
    };
}
