<script lang="ts">
import { PropType, toRef, watch } from 'vue';
import { ref, computed, defineComponent } from 'vue';
import { uid } from '@inkline/utils';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { Popup, Placement, ComputePositionConfig } from '@inkline/component-popup';
import { PopupTriggerListener } from '@inkline/types';

const componentName = 'Tooltip';

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    components: {
        Popup
    },
    props: {
        /**
         * The content of the tooltip, if not using the content slot
         * @name content
         * @type string
         * @default ''
         */
        content: {
            type: String,
            default: ''
        },
        /**
         * The color variant of the tooltip
         * @name color
         * @type 'light' | 'dark' | undefined
         * @default undefined
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
            default: () => {
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
         * The listener used to trigger the tooltip
         * @name listener
         * @type hover | focus | click | manual
         * @default [hover, focus]
         */
        listener: {
            type: [String, Array] as PropType<PopupTriggerListener | PopupTriggerListener[]>,
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
            type: Object as PropType<Partial<ComputePositionConfig>>,
            default: () => ({})
        },
        /**
         * The size variant of the tooltip
         * @name sizeMultiplier
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
         * @type event
         * @name update:visible
         */
        'update:visible',
        /**
         * Event emitted when clicking outside the tooltip
         * @type event
         * @name click:outside
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
            'aria-describedby': `${props.name}-tooltip`,
            'aria-disabled': props.disabled,
            'aria-expanded': isVisible.value ? 'true' : 'false',
            'data-popup-type': 'tooltip'
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
            <!-- @slot default Slot for tooltip trigger -->
            <slot name="trigger" :props="{ ...props, ...triggerProps }">
                <div v-bind="{ ...props, ...triggerProps }" class="tooltip-trigger" role="button">
                    <slot />
                </div>
            </slot>
        </template>
        <template #popup="{ props, arrowProps, visible }">
            <div
                v-bind="props"
                v-show="visible"
                :id="`${name}-tooltip`"
                class="tooltip"
                :class="classes"
                role="tooltip"
                aria-live="polite"
                :aria-hidden="visible ? 'false' : 'true'"
            >
                <span v-if="arrow" v-bind="arrowProps" class="tooltip-arrow" />
                <div class="tooltip-content">
                    <!-- @slot content Slot for tooltip content -->
                    <slot name="content">
                        {{ content }}
                    </slot>
                </div>
            </div>
        </template>
    </Popup>
</template>
