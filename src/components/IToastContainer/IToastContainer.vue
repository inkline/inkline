<script lang="ts">
import { computed, defineComponent, onMounted, ref, TransitionGroup } from 'vue';
import { useInkline } from '@inkline/inkline/composables';
import { toastEventBus, ToastOptions, ToastPosition } from '@inkline/inkline/plugins';
import { uid } from '@grozav/utils';
import { IToast } from '@inkline/inkline/components/IToast';

const componentName = 'IToastContainer';

export default defineComponent({
    name: componentName,
    components: {
        IToast,
        TransitionGroup
    },
    inheritAttrs: false,
    props: {
        eventBus: {
            type: Object,
            default: () => toastEventBus
        },
        duration: {
            type: Number,
            default: undefined
        },
        dismissible: {
            type: Boolean,
            default: undefined
        },
        showProgress: {
            type: Boolean,
            default: undefined
        }
    },
    setup(props) {
        const inkline = useInkline();

        const toastPositions = ref<Record<ToastPosition, ToastOptions[]>>({
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

        const classes = computed(() => ({}));

        onMounted(() => {
            addEventListeners();
        });

        function addEventListeners() {
            props.eventBus.on('show', showToast);
            props.eventBus.on('hide', hideToast);
            props.eventBus.on('hideAll', hideAllToasts);
        }

        function showToast(toast: ToastOptions) {
            const id = toast.id || uid('toast');

            const toastAlreadyVisible = toastPositionKeys.value.find((position) =>
                toastPositions.value[position].find((toast) => toast.id === id)
            );
            if (toastAlreadyVisible) {
                console.log(`Toast with id "${id}" is already visible.`);
                return;
            }

            const color = toast?.color || inkline.options.toast?.color || 'light';
            const size = toast?.size || inkline.options.toast?.size || 'md';
            const duration =
                [toast?.duration, props.duration, inkline.options.toast?.duration].find(
                    (duration) => typeof duration !== 'undefined'
                ) || 0;
            const dismissible = [toast?.dismissible, props.dismissible].find(
                (dismissible) => dismissible === true
            );
            const showProgress = [toast?.showProgress, props.showProgress].find(
                (showProgress) => showProgress === true
            );
            const position: ToastPosition =
                toast?.position || inkline.options.toast?.position || 'top-right';

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

        function hideToast({ id }: { id: string }) {
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
            classes,
            hideToast
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="toast-container" :class="classes">
        <div
            v-for="position in toastPositionKeys"
            :key="position"
            :class="`toast-position -${position}`"
        >
            <TransitionGroup name="toast-transition">
                <IToast
                    v-for="toast in toastPositions[position]"
                    :key="toast.id"
                    v-bind="toast"
                    @update:modelValue="hideToast(toast)"
                />
            </TransitionGroup>
        </div>
    </div>
</template>
