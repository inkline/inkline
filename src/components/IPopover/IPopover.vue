<script lang="ts" setup>
import {PropType, ref, computed, useSlots} from 'vue';
import { uid } from '@grozav/utils';
import {PopupEvent, usePopupControl} from "@inkline/inkline/composables/popup";
import {useClickOutside, useComponentColor, useComponentSize} from "@inkline/inkline/composables";
import {Placement} from "@floating-ui/dom";

const componentName = 'IPopover';

const props = defineProps({
    /**
     * The color variant of the popover
     * @name color
     * @type light | dark
     * @default light
     */
    color: {
        type: String,
        default: ''
    },
    /**
     * The disabled state of the popover
     * @name disabled
     * @type Boolean
     * @default false
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * Used to manually control the visibility of the popover
     * @name modelValue
     * @type Boolean
     * @default undefined
     */
    modelValue: {
        type: Boolean,
        default: undefined
    },
    /**
     * The identifier of the popover
     * @name name
     * @type String
     * @default uid()
     */
    name: {
        type: String,
        default (): string {
            return uid('popover');
        }
    },
    /**
     * Displays an arrow on the popover pointing to the trigger element
     * @name arrow
     * @type Boolean
     * @default true
     */
    arrow: {
        type: Boolean,
        default: true
    },
    /**
     * The placement of the popover
     * @name placement
     * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
     * @default false
     */
    placement: {
        type: String as PropType<Placement>,
        default: 'top'
    },
    /**
     * The events used to trigger the popover
     * @name events
     * @type hover | focus | click | manual
     * @default [hover, focus]
     */
    events: {
        type: [String, Array] as PropType<PopupEvent | PopupEvent[]>,
        default: (): string[] => ['click']
    },
    /**
     * The offset of the popover relative to the trigger element
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
     * Used to override the floating-ui options used for creating the popover
     * @name popupOptions
     * @type Object
     * @default {}
     */
    popupOptions: {
        type: Object,
        default: (): any => ({})
    },
    /**
     * The size variant of the popover
     * @name size
     * @type sm | md | lg
     * @default md
     */
    size: {
        type: String,
        default: ''
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
});

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue',
    /**
     * Event emitted when clicking outside the popover
     * @event click:outside
     */
    'click:outside'
]);

const wrapperRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const popupRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);

const currentColor = computed(() => props.color);
const currentSize = computed(() => props.size);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const componentProps = computed(() => props);
const { visible, onKeyEscape, onClickOutside } = usePopupControl({
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
        [`-${size.value}`]: true,
    };
});

useClickOutside({ elementRef: wrapperRef, fn: onClickOutside });
</script>

<template>
    <div
        :id="name"
        ref="wrapperRef"
        class="popover-wrapper"
        :class="classes"
        @keyup.esc="onKeyEscape"
    >
        <div
            ref="triggerRef"
            class="popover-trigger"
            :aria-describedby="`${name}-popup`"
            :aria-disabled="disabled ? 'true' : 'false'"
            :aria-expanded="visible ? 'true' : 'false'"
        >
            <!-- @slot default Slot for popover trigger -->
            <slot />
        </div>

        <transition name="zoom-in-top-transition">
            <div
                v-show="visible"
                :id="`${name}-popup`"
                ref="popupRef"
                class="popover"
                role="tooltip"
                aria-live="polite"
                :aria-hidden="visible ? 'false' : 'true'"
            >
                <span v-if="props.arrow" ref="arrowRef" class="arrow" />
                <div v-if="slots.header" class="popover-header">
                    <!-- @slot header Slot for popover header content -->
                    <slot name="header" />
                </div>
                <div v-if="slots.body" class="popover-body">
                    <!-- @slot body Slot for popover body content -->
                    <slot name="body" />
                </div>
                <div v-if="slots.footer" class="popover-footer">
                    <!-- @slot footer Slot for popover footer content -->
                    <slot name="footer" />
                </div>
            </div>
        </transition>
    </div>
</template>
