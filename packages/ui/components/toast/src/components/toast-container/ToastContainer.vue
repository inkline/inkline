<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, ref, TransitionGroup } from 'vue';
import { useOptions } from '@inkline/composables';
import { uid } from '@inkline/utils';
import type { EventBus } from '@inkline/utils';
import { Toast } from '../toast';
import { toastEventBus } from '../../instances';
import { ToastEventBusPayload, ToastOptions } from '../../types';
import type { ToastPosition } from '@inkline/types';

const componentName = 'ToastContainer';

export default defineComponent({
    name: componentName,
    components: {
        Toast,
        TransitionGroup
    },
    inheritAttrs: false,
    props: {
        /**
         * The event bus to use for showing/hiding toasts
         * @type EventBus
         * @default toastEventBus
         * @name eventBus
         */
        eventBus: {
            type: Object as PropType<EventBus<ToastEventBusPayload>>,
            default: () => toastEventBus
        },
        /**
         * The default duration for toasts in milliseconds, if not specified in the plugin or toast display options
         * @type number
         * @default undefined
         * @name duration
         */
        duration: {
            type: Number,
            default: undefined
        },
        /**
         * The default dismissible state for toasts, if not specified in the plugin or toast display options
         * @type Boolean
         * @default undefined
         * @name dismissible
         */
        dismissible: {
            type: Boolean,
            default: undefined
        },
        /**
         * The default option for showing the progress bar for toasts, if not specified in the plugin or toast display options
         * @type Boolean
         * @default undefined
         * @name showProgress
         */
        showProgress: {
            type: Boolean,
            default: undefined
        }
    },
    setup(props) {
        const { options } = useOptions();

        const toastPositions = ref<
            Record<
                ToastPosition,
                Array<Partial<Omit<ToastOptions, 'id'>> & { id: ToastOptions['id'] }>
            >
        >({
            'top-left': [],
            top: [],
            'top-right': [],
            right: [],
            'bottom-right': [],
            bottom: [],
            'bottom-left': [],
            left: []
        });
        const toastPositionKeys = ref<ToastPosition[]>(Object.keys(toastPositions.value));

        onMounted(() => {
            addEventListeners();
        });

        function addEventListeners() {
            props.eventBus.on('show', showToast);
            props.eventBus.on('hide', hideToast);
            props.eventBus.on('hideAll', hideAllToasts);
        }

        function showToast(toast: Partial<ToastOptions>) {
            const id = toast.id || uid('toast');

            const toastAlreadyVisible = toastPositionKeys.value.find((position) =>
                toastPositions.value[position].find((toast) => toast.id === id)
            );
            if (toastAlreadyVisible) {
                console.log(`Toast with id "${id}" is already visible.`);
                return;
            }

            const color = toast?.color || options.value.toast?.color || 'light';
            const size = toast?.size || options.value.toast?.size || 'md';
            const duration =
                [toast?.duration, props.duration, options.value.toast?.duration].find(
                    (duration) => typeof duration !== 'undefined'
                ) || 0;
            const dismissible = [toast?.dismissible, props.dismissible].find(
                (dismissible) => dismissible === true
            );
            const showProgress = [toast?.showProgress, props.showProgress].find(
                (showProgress) => showProgress === true
            );
            const position: ToastPosition =
                toast?.position || options.value.toast?.position || 'top-right';

            toastPositions.value[position].push({
                ...toast,
                id,
                color,
                size,
                duration,
                position,
                dismissible,
                showProgress
            });
        }

        function hideToast({ id }: { id: ToastOptions['id'] }) {
            toastPositionKeys.value.forEach((position) => {
                if (!toastPositions.value[position].find((toast) => toast.id === id)) {
                    return;
                }

                toastPositions.value[position] = toastPositions.value[position].filter(
                    (toast) => toast.id !== id
                );
            });
        }

        function hideAllToasts() {
            toastPositions.value = {
                'top-left': [],
                top: [],
                'top-right': [],
                right: [],
                'bottom-right': [],
                bottom: [],
                'bottom-left': [],
                left: []
            };
        }

        return {
            toastPositions,
            toastPositionKeys,
            hideToast
        };
    }
});
</script>

<template>
    <div
        v-for="position in toastPositionKeys"
        :key="position"
        :class="`toast-container -${position}`"
    >
        <TransitionGroup name="toast-transition">
            <Toast
                v-for="toast in toastPositions[position]"
                :key="toast.id"
                v-bind="toast"
                @update:model-value="hideToast(toast)"
            />
        </TransitionGroup>
    </div>
</template>
