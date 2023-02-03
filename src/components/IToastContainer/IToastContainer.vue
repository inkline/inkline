<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';
import { toastEventBus, ToastOptions, ToastPosition, ToastService } from '@inkline/inkline/plugins';
import { uid } from '@grozav/utils';
import { IToast } from '@inkline/inkline/components/IToast';

const componentName = 'IToast';

export default defineComponent({
    name: componentName,
    components: {
        IToast
    },
    inheritAttrs: false,
    setup() {
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

        const classes = computed(() => ({}));

        onMounted(() => {
            addEventListeners();
        });

        function addEventListeners() {
            toastEventBus.on('show', ((options) => {
                const color = options?.color || inkline.options.toast?.color || 'light';
                const duration = options?.duration || inkline.options.toast?.duration || null;
                const position: ToastPosition =
                    options?.position || inkline.options.toast?.position || 'top-right';

                toastPositions.value[position].push({
                    id: uid('toast'),
                    title: options.title!,
                    message: options.message!,
                    color,
                    duration,
                    position
                });
            }) as ToastService['show']);
        }

        return {
            toastPositions,
            classes
        };
    }
});
</script>

<template>
    <div v-bind="$attrs" class="toast-container" :class="classes">
        <div
            v-for="position in toastPositions"
            :key="position"
            :class="`toast-position ${position}`"
        >
            <i-toast
                v-for="toast in position"
                :key="toast.id"
                :color="toast.color"
                :duration="toast.duration"
                :position="toast.position"
            >
                <template #icon>
                    <i-icon name="ink-circle" />
                </template>
                <template #title>{{ toast.title }}</template>
                <p>{{ toast.message }}</p>
            </i-toast>
        </div>
    </div>
</template>
