<script lang="ts">
import { PropType, toRef, watch } from 'vue';
import { ref, computed, defineComponent } from 'vue';
import { uid } from '@inkline/utils';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { Popup, Placement, ComputePositionConfig } from '@inkline/component-popup';
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
            default: () => {
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
         * The listener used to trigger the popover
         * @name listener
         * @type hover | focus | click | manual
         * @default [hover, focus]
         */
        listener: {
            type: [String, Array] as PropType<PopupTriggerListener | PopupTriggerListener[]>,
            default: (): string[] => ['hover', 'focus']
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
            type: Object as PropType<Partial<ComputePositionConfig>>,
            default: () => ({})
        },
        /**
         * The size variant of the popover
         * @name sizeMultiplier
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
            ariaDescribedby: `${props.name}-popover`,
            ariaDisabled: props.disabled,
            ariaExpanded: isVisible.value ? 'true' : 'false'
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
                <div v-bind="{ ...props, ...triggerProps }" class="popover-trigger">
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
