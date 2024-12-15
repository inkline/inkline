<script lang="ts">
import { onBeforeUnmount, PropType, toRef } from 'vue';
import { ref, defineComponent } from 'vue';
import { uid } from '@inkline/utils';
import type { PopupTriggerListener } from '@inkline/types';
import type { Placement } from '@floating-ui/dom';
import type { ComputePositionConfig } from '@floating-ui/core';
import { usePopup } from './composables';

const componentName = 'Popup';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The animation to be used when showing the tooltip
         * @name animation
         * @type String
         * @default zoom-in-top-transition
         */
        animation: {
            type: String,
            default: 'zoom-in-top-transition'
        },
        /**
         * Animation duration in milliseconds
         * @name animationDuration
         * @type Number
         * @default 300
         */
        animationDuration: {
            type: Number,
            default: 300
        },
        /**
         * The disabled state of the tooltip
         * @name disabled
         * @type Boolean
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to manually control the visibility of the tooltip
         * @name visible
         * @type Boolean
         * @default undefined
         */
        visible: {
            type: Boolean,
            default: undefined
        },
        /**
         * The identifier of the tooltip
         * @name name
         * @type String
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('popup');
            }
        },
        /**
         * The placement of the tooltip
         * @name placement
         * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
         * @default false
         */
        placement: {
            type: String as PropType<Placement>,
            default: 'top'
        },
        /**
         * The listener used to trigger the tooltip
         * @name listener
         * @type hover | focus | click | manual
         * @default [hover, focus]
         */
        listener: {
            type: [String, Array] as PropType<PopupTriggerListener | PopupTriggerListener[]>,
            default: (): PopupTriggerListener[] => ['hover', 'focus']
        },
        /**
         * The offset of the tooltip relative to the trigger element
         * @name offset
         * @type Number
         * @default 6
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * Determines whether hover state should be transferred from trigger to popup
         * @name interactive
         * @type Boolean
         * @default true
         */
        interactive: {
            type: Boolean,
            default: true
        },
        /**
         * Used to override the floating-ui options used for creating the tooltip
         * @name popupOptions
         * @type Object
         * @default {}
         */
        popupOptions: {
            type: Object as PropType<Partial<ComputePositionConfig>>,
            default: () => ({})
        },
        /**
         * Delay in milliseconds before the tooltip is hidden on hover
         * @name interactiveDelay
         * @type Number
         * @default 300
         */
        interactiveDelay: {
            type: Number,
            default: 300
        },
        /**
         * Determines whether the tooltip should hide when clicking outside
         * @name hideOnClickOutside
         * @type Boolean
         * @default true
         */
        hideOnClickOutside: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        /**
         * Event emitted for setting the visible
         * @event update:visible
         */
        'update:visible',
        /**
         * Event emitted when clicking outside the tooltip
         * @event click:outside
         */
        'click:outside'
    ],
    setup(props, { emit }) {
        const wrapperRef = ref<HTMLElement | null>(null);

        const animation = toRef(props, 'animation');
        const disabled = toRef(props, 'disabled');
        const listener = toRef(props, 'listener');
        const placement = toRef(props, 'placement');
        const interactive = toRef(props, 'interactive');
        const visible = toRef(props, 'visible');
        const animationDuration = toRef(props, 'animationDuration');
        const interactiveDelay = toRef(props, 'interactiveDelay');
        const hideOnClickOutside = toRef(props, 'hideOnClickOutside');
        const offset = toRef(props, 'offset');
        const popupOptions = toRef(props, 'popupOptions');

        const { isVisible, popupProps, arrowProps, triggerProps, onKeyEscape, cleanup } = usePopup({
            disabled,
            listener,
            placement,
            interactive,
            interactiveDelay,
            visible,
            animationDuration,
            hideOnClickOutside,
            offset,
            popupOptions,
            onUpdateModelValue,
            onClickOutside
        });

        onBeforeUnmount(() => {
            cleanup();
        });

        function onUpdateModelValue(value: boolean) {
            emit('update:visible', value);
        }

        function onClickOutside(event: MouseEvent) {
            emit('click:outside', event);
        }

        return {
            animation,
            wrapperRef,
            isVisible,
            triggerProps,
            popupProps,
            arrowProps,
            onKeyEscape
        };
    }
});
</script>

<template>
    <!-- @slot default Slot for trigger element -->
    <slot name="trigger" :props="triggerProps" :visible="isVisible" />
    <transition :name="animation">
        <!-- @slot body Slot for popup element -->
        <slot name="popup" :visible="isVisible" :props="popupProps" :arrowProps="arrowProps" />
    </transition>
</template>
