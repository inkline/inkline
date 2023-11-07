<script lang="ts">
import type { PropType } from 'vue';
import {
    toRef,
    provide,
    computed,
    inject,
    ref,
    useSlots,
    onMounted,
    onBeforeUnmount,
    defineComponent
} from 'vue';
import { on, off, isFocusable, isKey } from '@grozav/utils';
import { DropdownKey, NavbarKey, SidebarKey } from '@inkline/inkline/constants';
import type { PopupEvent } from '@inkline/inkline/composables';
import {
    useClickOutside,
    useComponentColor,
    useComponentSize,
    usePopupControl
} from '@inkline/inkline/composables';
import type { Placement } from '@floating-ui/dom';
import type { ComputePositionConfig } from '@floating-ui/core';

const componentName = 'IDropdown';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The duration of the hide and show animation
         * @type Number
         * @default 300
         * @name animationDuration
         */
        animationDuration: {
            type: Number,
            default: 300
        },
        /**
         * The color variant of the dropdown
         * @type light | dark
         * @default
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the dropdown
         * @type Boolean
         * @default false
         * @name disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to hide the dropdown when clicking or selecting a dropdown item
         * @type Boolean
         * @default false
         * @name hideOnItemClick
         */
        hideOnItemClick: {
            type: Boolean,
            default: true
        },
        /**
         * The keydown events bound to the trigger element
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         * @name triggerKeyBindings
         */
        triggerKeyBindings: {
            type: Array,
            default: (): string[] => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * The keydown events bound to the dropdown item elements
         * @type string[]
         * @default [up, down, enter, space, tab, esc]
         * @name itemKeyBindings
         */
        itemKeyBindings: {
            type: Array,
            default: (): string[] => ['up', 'down', 'enter', 'space', 'tab', 'esc']
        },
        /**
         * Used to manually control the visibility of the dropdown
         * @type Boolean
         * @default false
         * @name visible
         */
        visible: {
            type: Boolean,
            default: false
        },
        /**
         * Displays an arrow on the dropdown pointing to the trigger element
         * @type Boolean
         * @default true
         * @name arrow
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * The placement of the dropdown
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         * @name placement
         */
        placement: {
            type: String as PropType<Placement>,
            default: 'bottom'
        },
        /**
         * The events used to trigger the dropdown
         * @type hover | focus | click | manual
         * @default [click]
         * @name trigger
         */
        events: {
            type: [String, Array] as PropType<PopupEvent | PopupEvent[]>,
            default: (): string[] => ['click']
        },
        /**
         * The offset of the dropdown relative to the trigger element
         * @type Number
         * @default 6
         * @name offset
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * Determines whether hover state should be transferred from trigger to popup
         * @type Boolean
         * @default true
         * @name interactable
         */
        interactable: {
            type: Boolean,
            default: true
        },
        /**
         * Used to override the floating-ui options used for creating the dropdown
         * @type Object
         * @default {}
         * @name popupOptions
         */
        popupOptions: {
            type: Object as PropType<Partial<ComputePositionConfig>>,
            default: () => ({})
        },
        /**
         * The size variant of the dropdown
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Delay in milliseconds before the popover is hidden on hover
         * @name hoverHideDelay
         * @type Number
         * @default 300
         */
        hoverHideDelay: {
            type: Number,
            default: 300
        }
    },
    emits: [
        /**
         * Event emitted when clicking outside the dropdown elements
         * @event click:outside
         */
        'click:outside',
        /**
         * Event emitted for setting the visible
         * @event update:visible
         */
        'update:visible'
    ],
    setup(props, { emit }) {
        const navbar = inject(NavbarKey, null);
        const sidebar = inject(SidebarKey, null);

        const wrapperRef = ref<HTMLElement | null>(null);
        const triggerRef = ref<HTMLElement | null>(null);
        const popupRef = ref<HTMLElement | null>(null);
        const bodyRef = ref<HTMLElement | null>(null);
        const arrowRef = ref<HTMLElement | null>(null);

        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const componentProps = computed(() => ({
            disabled: props.disabled,
            events: props.events,
            placement: props.placement,
            interactable: props.interactable,
            visible: props.visible,
            animationDuration: props.animationDuration,
            hoverHideDelay: props.hoverHideDelay,
            offset: props.offset
        }));
        const { visible, hide, show, onKeyEscape, focusTrigger, onClick, onClickOutside } =
            usePopupControl({
                triggerRef,
                popupRef,
                arrowRef,
                componentProps,
                emit
            });

        const slots = useSlots();

        const classes = computed(() => {
            return {
                [`-${color.value}`]: true,
                [`-${size.value}`]: true
            };
        });

        useClickOutside({ elementRef: wrapperRef, fn: onClickOutside });

        const disabled = toRef(props, 'disabled');
        provide(DropdownKey, {
            disabled,
            onItemClick
        });

        onMounted(() => {
            if (!triggerRef.value || !popupRef.value) {
                return;
            }

            for (const child of triggerRef.value.children) {
                on(child as HTMLElement, 'keydown', onTriggerKeyDown);
            }

            on(popupRef.value, 'keydown', onItemKeyDown);
        });

        onBeforeUnmount(() => {
            if (!triggerRef.value || !popupRef.value) {
                return;
            }

            for (const child of triggerRef.value.children) {
                off(child as HTMLElement, 'keydown', onTriggerKeyDown);
            }

            off(popupRef.value, 'keydown', onItemKeyDown);
        });

        function getFocusableItems(): HTMLElement[] {
            if (!bodyRef.value) {
                return [];
            }

            const focusableItems = [];

            for (const child of bodyRef.value.children) {
                if (isFocusable(child as HTMLElement)) {
                    focusableItems.push(child as HTMLElement);
                }
            }

            return focusableItems;
        }

        function onTriggerKeyDown(event: KeyboardEvent) {
            if (props.triggerKeyBindings.length === 0) {
                return;
            }

            const focusableItems = getFocusableItems();
            const activeIndex = focusableItems.findIndex((item: any) => item.active);
            const initialIndex = activeIndex > -1 ? activeIndex : 0;
            const focusTarget = focusableItems[initialIndex];

            switch (true) {
                case isKey('up', event) && props.triggerKeyBindings.includes('up'):
                case isKey('down', event) && props.triggerKeyBindings.includes('down'):
                    show();

                    setTimeout(
                        () => {
                            focusTarget.focus();
                        },
                        visible.value ? 0 : props.animationDuration
                    );

                    event.preventDefault();
                    event.stopPropagation();
                    break;

                case isKey('enter', event) && props.triggerKeyBindings.includes('enter'):
                case isKey('space', event) && props.triggerKeyBindings.includes('space'):
                    onClick();

                    if (!visible.value) {
                        setTimeout(() => {
                            focusTarget.focus();
                        }, props.animationDuration);
                    }

                    event.preventDefault();
                    break;

                case isKey('tab', event) && props.triggerKeyBindings.includes('tab'):
                case isKey('esc', event) && props.triggerKeyBindings.includes('esc'):
                    hide();
                    break;
            }
        }

        function onItemKeyDown(event: KeyboardEvent) {
            if (props.itemKeyBindings.length === 0) {
                return;
            }

            switch (true) {
                case isKey('up', event) && props.itemKeyBindings.includes('up'):
                case isKey('down', event) && props.itemKeyBindings.includes('down'):
                    const focusableItems = getFocusableItems();

                    const currentIndex = focusableItems.findIndex((item) => item === event.target);
                    const maxIndex = focusableItems.length - 1;
                    let nextIndex;

                    if (isKey('up', event)) {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                    } else {
                        nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
                    }

                    focusableItems[nextIndex].focus();

                    event.preventDefault();
                    event.stopPropagation();
                    break;

                case isKey('enter', event) && props.itemKeyBindings.includes('enter'):
                case isKey('space', event) && props.itemKeyBindings.includes('space'):
                    (event as any).target.click();

                    if (props.hideOnItemClick) {
                        hide();
                    }
                    focusTrigger();

                    event.preventDefault();
                    break;

                case isKey('tab', event) && props.itemKeyBindings.includes('tab'):
                case isKey('esc', event) && props.itemKeyBindings.includes('esc'):
                    hide();
                    focusTrigger();

                    event.preventDefault();
                    break;
            }
        }

        function onItemClick(event: Event) {
            if (props.hideOnItemClick) {
                hide();
            }

            [navbar, sidebar].forEach((parent) => {
                parent?.onItemClick(event);
            });
        }

        return {
            wrapperRef,
            triggerRef,
            popupRef,
            bodyRef,
            arrowRef,
            visible,
            hide,
            show,
            onKeyEscape,
            focusTrigger,
            onClick,
            classes,
            slots
        };
    }
});
</script>

<template>
    <div
        v-bind="$attrs"
        ref="wrapperRef"
        class="dropdown-wrapper"
        aria-haspopup="true"
        @keyup.esc="onKeyEscape"
    >
        <div ref="triggerRef" class="dropdown-trigger">
            <!-- @slot default Slot for dropdown trigger -->
            <slot />
        </div>

        <transition name="zoom-in-top-transition">
            <div
                v-show="visible"
                ref="popupRef"
                class="dropdown"
                :class="classes"
                role="menu"
                :aria-hidden="visible ? 'false' : 'true'"
            >
                <span v-if="arrow" ref="arrowRef" class="arrow" />
                <div v-if="$slots.header" class="dropdown-header">
                    <!-- @slot header Slot for dropdown header content -->
                    <slot name="header" />
                </div>
                <div v-if="$slots.body" ref="bodyRef" class="dropdown-body">
                    <!-- @slot body Slot for dropdown body content -->
                    <slot name="body" />
                </div>
                <div v-if="$slots.footer" class="dropdown-footer">
                    <!-- @slot footer Slot for dropdown footer content -->
                    <slot name="footer" />
                </div>
            </div>
        </transition>
    </div>
</template>
