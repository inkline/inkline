import { onMounted, onUnmounted, ref, Ref, watch } from 'vue';
import { off, on } from '@grozav/utils';
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
    disabled?: Ref<boolean>;
    readonly?: Ref<boolean>;
    events: Ref<PopupEvent | PopupEvent[]>;
    placement: Ref<Placement>;
    interactable: Ref<boolean>;
    modelValue: Ref<boolean | undefined>;
    hoverHideDelay: Ref<number>;
    offset: Ref<number>;
    emit: (event: 'update:modelValue' | 'click:outside', ...args: any[]) => void;
}) {
    const visible = ref(props.modelValue.value);
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
        () => props.modelValue.value,
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

        ([] as PopupEvent[]).concat(props.events.value).forEach((trigger) => {
            switch (trigger) {
                case 'hover':
                    on(
                        props.triggerRef.value as HTMLElement,
                        'mouseenter',
                        props.interactable.value ? hoverShow : show
                    );
                    on(
                        props.triggerRef.value as HTMLElement,
                        'mouseleave',
                        props.interactable.value ? hoverHide : hide
                    );

                    if (props.interactable.value) {
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

        ([] as PopupEvent[]).concat(props.events.value).forEach((trigger) => {
            switch (trigger) {
                case 'hover':
                    off(
                        props.triggerRef.value as HTMLElement,
                        'mouseenter',
                        props.interactable.value ? hoverShow : show
                    );
                    off(
                        props.triggerRef.value as HTMLElement,
                        'mouseleave',
                        props.interactable.value ? hoverHide : hide
                    );

                    if (props.interactable.value) {
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
        if (props.disabled?.value || props.readonly?.value || visible.value) {
            return;
        }

        triggerStack.value += 1;
        visible.value = true;

        createPopup();

        props.emit('update:modelValue', true);
    }

    function hide() {
        if (props.disabled?.value || props.readonly?.value || !visible.value) {
            return;
        }

        triggerStack.value -= 1;

        if (triggerStack.value <= 0) {
            triggerStack.value = 0;
            visible.value = false;

            props.emit('update:modelValue', false);

            // Destroyed by <transition> component after transition is finished
            // destroyPopup();
        }
    }

    function hoverShow() {
        animating.value = false;
        show();
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

        if (props.modelValue) return;

        hide();
    }

    function hoverHide() {
        animating.value = true;
        setTimeout(() => {
            if (animating.value) {
                hide();
            }
        }, props.hoverHideDelay.value);
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
                placement: props.placement.value,
                strategy: 'fixed',
                middleware: [offset(props.offset.value), flip(), shift({ padding: 6 })].concat(
                    arrowRef ? [arrow({ element: arrowRef })] : []
                )
            }).then(({ x, y, placement, middlewareData }) => {
                console.log(x, y);

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

    return { visible, show, hide, createPopup, destroyPopup };
}
