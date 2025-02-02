<script lang="ts">
import { PropType, toRef, VNode } from 'vue';
import { computed, defineComponent, h, onBeforeUpdate, onMounted, ref } from 'vue';
import { useComponentColor, useComponentSize } from '@inkline/composables';
import { Icon } from '@inkline/component-icon';
import type { StringOrRenderableType } from '@inkline/types';

const componentName = 'Toast';

const iconByType: Record<string, VNode> = {
    light: h(Icon, { name: 'ink:circle' }),
    dark: h(Icon, { name: 'ink:circle' }),
    info: h(Icon, { name: 'ink:info' }),
    success: h(Icon, { name: 'ink:check' }),
    warning: h(Icon, { name: 'ink:warning' }),
    danger: h(Icon, { name: 'ink:danger' })
};

export default defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: {
        /**
         * The size variant of the toast
         * @param {'sm' | 'md' | 'lg'} size
         * @default
         */
        size: {
            type: String,
            default: undefined
        },
        /**
         * The color variant of the toast
         * @param {light | dark | info | success | warning | danger} color
         * @default light
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely.
         * @param {number} duration
         * @default 0
         */
        duration: {
            type: Number,
            default: 0
        },
        /**
         * Show progress bar for the duration of the toast
         * @param {boolean} showProgress
         * @default true
         */
        showProgress: {
            type: Boolean,
            default: true
        },
        /**
         * The icon to be rendered in the toast
         * @param {string | VNode | VNode[]} icon
         * @default undefined
         */
        icon: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        },
        /**
         * The title to be rendered in the toast
         * @param {string | VNode | VNode[]} title
         * @default undefined
         */
        title: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        },
        /**
         * The message to be rendered in the toast
         * @param {string | VNode | VNode[]} message
         * @default undefined
         */
        message: {
            type: [String, Object] as PropType<StringOrRenderableType>,
            default: undefined
        },
        /**
         * Used to show or hide a dismissible toast
         * @param {boolean} modelValue
         * @default true
         */
        modelValue: {
            type: Boolean,
            default: true
        },
        /**
         * Used to set the position of the toast
         * @param {'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'} position
         * @default top-right
         */
        position: {
            type: String,
            default: 'top-right'
        },
        /**
         * Shows a dismiss icon on the toast
         * @param {boolean} dismissible
         * @default false
         */
        dismissible: {
            type: Boolean,
            default: false
        },
        /**
         * The aria-label to use for the dismiss button
         * @param {string} dismissAriaLabel
         * @default Dismiss
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
    setup(props, { emit, slots }) {
        const rawColor = toRef(props, 'color');
        const rawSize = toRef(props, 'size');
        const { color } = useComponentColor(componentName, rawColor);
        const { size } = useComponentSize(componentName, rawSize);

        const slotsClasses = ref(getSlotsClasses());
        const classes = computed(() => ({
            [`-${color.value}`]: Boolean(color.value),
            [`-${size.value}`]: Boolean(size.value),
            '-dismissible': props.dismissible,
            ...slotsClasses.value
        }));

        const styles = computed(() => ({
            '--toast--duration': `${props.duration}ms`
        }));

        const resolvedIcon = computed(() =>
            typeof props.icon !== 'undefined' ? props.icon : iconByType[color.value]
        );

        const progressVisible = computed(
            () => props.showProgress && props.duration && props.duration !== 0
        );

        const isVNodeIcon = computed(() => typeof resolvedIcon.value === 'object');
        const isVNodeTitle = computed(() => typeof props.title === 'object');
        const isVNodeMessage = computed(() => typeof props.message === 'object');

        onMounted(() => {
            if (props.duration && props.duration !== 0) {
                setTimeout(() => {
                    emit('update:modelValue', false);
                }, props.duration);
            }
        });

        onBeforeUpdate(() => {
            slotsClasses.value = getSlotsClasses();
        });

        function getSlotsClasses() {
            return {
                '-with-icon': Boolean(slots.icon)
            };
        }

        function dismiss() {
            emit('update:modelValue', false);
        }

        return {
            classes,
            styles,
            resolvedIcon,
            isVNodeIcon,
            isVNodeTitle,
            isVNodeMessage,
            progressVisible,
            dismiss
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="toast" :class="classes" :style="styles">
        <span v-if="resolvedIcon || $slots.icon" class="toast-icon" role="img" aria-hidden="true">
            <!-- @slot icon Slot for toast icon -->
            <slot name="icon">
                <component :is="resolvedIcon" v-if="isVNodeIcon" />
                <span v-else>{{ resolvedIcon }}</span>
            </slot>
        </span>
        <div class="toast-content">
            <div v-if="title || $slots.title" class="toast-title">
                <!-- @slot title Slot for toast title -->
                <slot name="title">
                    <component :is="title" v-if="title && isVNodeTitle" />
                    <span v-else>{{ title }}</span>
                </slot>
            </div>
            <!-- @slot default Slot for default toast content -->
            <slot>
                <component :is="message" v-if="message && isVNodeMessage" />
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
