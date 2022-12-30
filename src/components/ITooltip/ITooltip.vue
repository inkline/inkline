<script lang="ts">
import { PropType, ref, computed, defineComponent } from 'vue';
import { uid } from '@grozav/utils';
import {
    PopupEvent,
    usePopupControl,
    useClickOutside,
    useComponentColor,
    useComponentSize
} from '@inkline/inkline/composables';
import { Placement } from '@floating-ui/dom';

const componentName = 'ITooltip';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the tooltip
         * @name color
         * @type light | dark
         * @default
         */
        color: {
            type: String,
            default: undefined
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
            default(): string {
                return uid('tooltip');
            }
        },
        /**
         * Displays an arrow on the tooltip pointing to the trigger element
         * @name arrow
         * @type Boolean
         * @default true
         */
        arrow: {
            type: Boolean,
            default: true
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
         * The events used to trigger the tooltip
         * @name events
         * @type hover | focus | click | manual
         * @default [hover, focus]
         */
        events: {
            type: [String, Array] as PropType<PopupEvent | PopupEvent[]>,
            default: (): string[] => ['hover', 'focus']
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
         * @name interactable
         * @type Boolean
         * @default false
         */
        interactable: {
            type: Boolean,
            default: false
        },
        /**
         * Used to override the floating-ui options used for creating the tooltip
         * @name popupOptions
         * @type Object
         * @default {}
         */
        popupOptions: {
            type: Object,
            default: (): any => ({})
        },
        /**
         * The size variant of the tooltip
         * @name size
         * @type sm | md | lg
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Delay in milliseconds before the tooltip is hidden on hover
         * @name hoverHideDelay
         * @type Number
         * @default 300
         */
        hoverHideDelay: {
            type: Number,
            default: 300
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
        const triggerRef = ref<HTMLElement | null>(null);
        const popupRef = ref<HTMLElement | null>(null);
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
        const { visible, onKeyEscape, onClickOutside } = usePopupControl({
            triggerRef,
            popupRef,
            arrowRef,
            componentProps,
            emit
        });

        useClickOutside({ elementRef: wrapperRef, fn: onClickOutside });

        const classes = computed(() => {
            return {
                [`-${color.value}`]: true,
                [`-${size.value}`]: true
            };
        });

        return {
            wrapperRef,
            triggerRef,
            popupRef,
            arrowRef,
            visible,
            onKeyEscape,
            classes
        };
    }
});
</script>

<template>
    <div
        :id="name"
        ref="wrapperRef"
        class="tooltip-wrapper"
        :class="classes"
        @keyup.esc="onKeyEscape"
    >
        <div
            ref="triggerRef"
            class="tooltip-trigger"
            :aria-describedby="`${name}-popup`"
            :aria-disabled="disabled ? 'true' : null"
            :aria-expanded="visible ? 'true' : 'false'"
        >
            <!-- @slot default Slot for tooltip trigger -->
            <slot />
        </div>

        <transition name="zoom-in-top-transition">
            <div
                v-show="visible"
                :id="`${name}-popup`"
                ref="popupRef"
                class="tooltip"
                role="tooltip"
                aria-live="polite"
                :aria-hidden="visible ? 'false' : 'true'"
            >
                <span v-if="arrow" ref="arrowRef" class="arrow" />
                <!-- @slot body Slot for tooltip body content -->
                <slot name="body" />
            </div>
        </transition>
    </div>
</template>
