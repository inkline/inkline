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

const componentName = 'IPopover';

export default defineComponent({
    name: componentName,
    props: {
        /**
         * The color variant of the popover
         * @name color
         * @type light | dark
         * @default
         */
        color: {
            type: String,
            default: undefined
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
         * @name visible
         * @type Boolean
         * @default undefined
         */
        visible: {
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
            default(): string {
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
         * @default
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
         * Event emitted when clicking outside the popover
         * @event click:outside
         */
        'click:outside'
    ],
    setup(props, { emit, slots }) {
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

        const classes = computed(() => {
            return {
                [`-${color.value}`]: true,
                [`-${size.value}`]: true
            };
        });

        useClickOutside({ elementRef: wrapperRef, fn: onClickOutside });

        function hasSlot(name: string) {
            return !!slots[name];
        }

        return {
            wrapperRef,
            triggerRef,
            popupRef,
            arrowRef,
            visible,
            hasSlot,
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
                <span v-if="arrow" ref="arrowRef" class="arrow" />
                <div v-if="hasSlot('header')" class="popover-header">
                    <!-- @slot header Slot for popover header content -->
                    <slot name="header" />
                </div>
                <div v-if="hasSlot('body')" class="popover-body">
                    <!-- @slot body Slot for popover body content -->
                    <slot name="body" />
                </div>
                <div v-if="hasSlot('footer')" class="popover-footer">
                    <!-- @slot footer Slot for popover footer content -->
                    <slot name="footer" />
                </div>
            </div>
        </transition>
    </div>
</template>
