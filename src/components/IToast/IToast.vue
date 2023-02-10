<script lang="ts">
import { computed, defineComponent, h, onMounted, PropType, VNode } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/inkline/composables';
import { IIcon } from '@inkline/inkline/components';

const componentName = 'IToast';

const iconByType: Record<string, VNode> = {
    light: h(IIcon, { name: 'ink-circle' }),
    dark: h(IIcon, { name: 'ink-circle' }),
    info: h(IIcon, { name: 'ink-info' }),
    success: h(IIcon, { name: 'ink-danger' }),
    warning: h(IIcon, { name: 'ink-warning' }),
    danger: h(IIcon, { name: 'ink-danger' })
};

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The size variant of the toast
         * @type sm | md | lg
         * @default
         * @name size
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The color variant of the toast
         * @type light | dark | info | success | warning | danger
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely.
         * @type Number
         * @default 0
         * @name duration
         */
        duration: {
            type: Number,
            default: 0
        },
        /**
         * Show progress bar for the duration of the toast
         * @type Boolean
         * @default true
         * @name duration
         */
        showProgress: {
            type: Boolean,
            default: true
        },
        /**
         * The icon to be rendered in the toast
         * @type string | VNode | VNode[]
         * @default undefined
         * @name icon
         */
        icon: {
            type: [String, Object] as PropType<string | VNode | VNode[]>,
            default: undefined
        },
        /**
         * The title to be rendered in the toast
         * @type string | VNode | VNode[]
         * @default undefined
         * @name title
         */
        title: {
            type: [String, Object] as PropType<string | VNode | VNode[]>,
            default: undefined
        },
        /**
         * The message to be rendered in the toast
         * @type string | VNode | VNode[]
         * @default undefined
         * @name message
         */
        message: {
            type: [String, Object] as PropType<string | VNode | VNode[]>,
            default: undefined
        },
        /**
         * Used to show or hide a dismissible toast
         * @type Boolean
         * @default true
         * @name modelValue
         */
        modelValue: {
            type: Boolean,
            default: true
        },
        /**
         * Shows a dismiss icon on the toast
         * @type Boolean
         * @default false
         * @name dismissible
         */
        dismissible: {
            type: Boolean,
            default: false
        },
        /**
         * The aria-label to use for the dismiss button
         * @type String
         * @default Dismiss
         * @name dismissAriaLabel
         */
        dismissAriaLabel: {
            type: String,
            default: 'Dismiss'
        }
    },
    emits: [
        /**
         * Event emitted when the toast is dismissed
         * @event dismiss
         */
        'update:modelValue'
    ],
    setup(props, { emit }) {
        const currentColor = computed(() => props.color);
        const currentSize = computed(() => props.size);
        const { color } = useComponentColor({ componentName, currentColor });
        const { size } = useComponentSize({ componentName, currentSize });

        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-dismissible': props.dismissible
        }));

        const styles = computed(() => ({
            '--toast--duration': `${props.duration}ms`
        }));

        const icon = computed(() =>
            typeof props.icon !== 'undefined' ? props.icon : iconByType[color.value]
        );

        const progressVisible = computed(
            () => props.showProgress && props.duration && props.duration !== 0
        );

        const isVNode = computed(() => ({
            icon: typeof icon.value === 'object',
            title: typeof props.title === 'object',
            message: typeof props.message === 'object'
        }));

        onMounted(() => {
            if (props.duration && props.duration !== 0) {
                setTimeout(() => {
                    emit('update:modelValue', false);
                }, props.duration);
            }
        });

        function dismiss() {
            emit('update:modelValue', false);
        }

        return {
            classes,
            styles,
            icon,
            isVNode,
            progressVisible,
            dismiss
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="toast" :class="classes" :style="styles">
        <span v-if="icon || $slots.icon" class="toast-icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for toast icon -->
            <slot name="icon">
                <component :is="icon" v-if="isVNode.icon" />
            </slot>
        </span>
        <div class="toast-content">
            <div v-if="title || $slots.title" class="toast-title">
                <!-- @slot default Slot for toast title -->
                <slot name="title">
                    <component :is="title" v-if="title && isVNode.title" />
                    <span v-else>{{ title }}</span>
                </slot>
            </div>
            <!-- @slot default Slot for default toast content -->
            <slot>
                <component :is="message" v-if="message && isVNode.message" />
                <span v-else>{{ message }}</span>
            </slot>
        </div>
        <span
            v-if="dismissible"
            class="toast-dismiss"
            role="button"
            :aria-label="dismissAriaLabel"
            @click="dismiss"
        >
            <!-- @slot dismiss Slot for toast dismiss button -->
            <slot name="dismiss">&times;</slot>
        </span>
        <div v-if="progressVisible" class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    </div>
</template>
