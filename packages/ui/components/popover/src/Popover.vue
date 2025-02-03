<script lang="ts">
import { PropType, toRef, watch } from 'vue';
import { ref, computed, defineComponent } from 'vue';
import { uid } from '@inkline/utils';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { Popup } from '@inkline/component-popup';
import type { Placement, ComputePositionConfig } from '@inkline/component-popup';
import { PopupTriggerListener } from '@inkline/types';

const componentName = 'Popover';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    components: {
        Popup
    },
    props: {
        /**
         * The color variant of the popover
         * @param {'light' | 'dark'} color
         * @default undefined
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The disabled state of the popover
         * @param {boolean} disabled
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Used to manually control the visibility of the popover
         * @param {boolean} visible
         * @default undefined
         */
        visible: {
            type: Boolean,
            default: undefined
        },
        /**
         * The identifier of the popover
         * @param {string} name
         * @default uid()
         */
        name: {
            type: String,
            default: () => {
                return uid('popover');
            }
        },
        /**
         * Displays an arrow on the popover pointing to the trigger element
         * @param {boolean} arrow
         * @default true
         */
        arrow: {
            type: Boolean,
            default: true
        },
        /**
         * The placement of the popover
         * @param {'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'} placement
         * @default 'top'
         */
        placement: {
            type: String as PropType<Placement>,
            default: 'top'
        },
        /**
         * The listener used to trigger the popover
         * @param {'hover' | 'focus' | 'click' | 'manual'} listener
         * @default [hover, focus]
         */
        listener: {
            type: [String, Array] as PropType<PopupTriggerListener | PopupTriggerListener[]>,
            default: (): string[] => ['hover', 'focus']
        },
        /**
         * The offset of the popover relative to the trigger element
         * @param {number} offset
         * @default 6
         */
        offset: {
            type: Number,
            default: 6
        },
        /**
         * Determines whether hover state should be transferred from trigger to popup
         * @param {boolean} interactable
         * @default false
         */
        interactable: {
            type: Boolean,
            default: false
        },
        /**
         * Used to override the floating-ui options used for creating the popover
         * @param {ComputePositionConfig} popupOptions
         * @default {}
         */
        popupOptions: {
            type: Object as PropType<Partial<ComputePositionConfig>>,
            default: () => ({})
        },
        /**
         * The size variant of the popover
         * @param {'sm' | 'md' | 'lg'} sizeMultiplier
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * Delay in milliseconds before the popover is hidden on hover
         * @param {number} hoverHideDelay
         * @default 300
         */
        hoverHideDelay: {
            type: Number,
            default: 300
        },
        /**
         * Animation duration in milliseconds
         * @param {number} animationDuration
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
    setup(props, { emit }) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const classes = computed(() => {
            return {
                [`-${color.value}`]: true,
                [`-${size.value}`]: true
            };
        });

        const isVisible = ref(props.visible);
        watch(
            () => props.visible,
            (value) => {
                isVisible.value = value;
            }
        );

        const triggerProps = computed(() => ({
            'aria-describedby': `${props.name}-popover`,
            'aria-disabled': props.disabled,
            'aria-expanded': isVisible.value ? 'true' : 'false',
            'data-popup-type': 'popover'
        }));

        function onUpdateVisible(visible: boolean) {
            emit('update:visible', visible);
        }

        return {
            classes,
            triggerProps,
            onUpdateVisible
        };
    }
});
</script>

<template>
    <Popup
        :visible="visible"
        :disabled="disabled"
        :listener="listener"
        :placement="placement"
        @update:visible="onUpdateVisible"
    >
        <template #trigger="{ props }">
            <!-- @slot default Slot for popover trigger -->
            <slot name="trigger" :props="{ ...props, ...triggerProps }">
                <div v-bind="{ ...props, ...triggerProps }" class="popover-trigger" role="button">
                    <slot />
                </div>
            </slot>
        </template>
        <template #popup="{ props, arrowProps, visible }">
            <div
                v-bind="props"
                v-show="visible"
                :id="`${name}-popover`"
                class="popover"
                :class="classes"
                role="popover"
                aria-live="polite"
                :aria-hidden="visible ? 'false' : 'true'"
            >
                <span v-if="arrow" v-bind="arrowProps" class="popover-arrow" />
                <div v-if="$slots.header" class="popover-header">
                    <!-- @slot header Slot for popover header content -->
                    <slot name="header" />
                </div>
                <div v-if="$slots.body" class="popover-body">
                    <!-- @slot body Slot for popover body content -->
                    <slot name="body" />
                </div>
                <div v-if="$slots.footer" class="popover-footer">
                    <!-- @slot footer Slot for popover footer content -->
                    <slot name="footer" />
                </div>
            </div>
        </template>
    </Popup>
</template>
