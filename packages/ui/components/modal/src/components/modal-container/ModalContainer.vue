<script lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import { modalEventBus } from '../../instances';
import { EventBus, uid } from '@inkline/utils';
import { Modal } from '../modal';
import type { ModalEventBusPayload, ModalOptions } from '../../types';
import { useOptions } from '@inkline/composables';

const componentName = 'ModalContainer';

type ModalEntry = Pick<ModalOptions, 'type' | 'color' | 'size'> &
    Required<Pick<ModalOptions, 'id'>>;

export default defineComponent({
    name: componentName,
    components: {
        Modal
    },
    props: {
        /**
         * The event bus to use for showing/hiding modals
         * @param {EventBus} eventBus
         * @default modalEventBus
         */
        eventBus: {
            type: Object as PropType<EventBus<ModalEventBusPayload>>,
            default: () => modalEventBus
        }
    },
    setup(props) {
        const { options } = useOptions();

        const modals = ref<ModalEntry[]>([]);
        const modalsVisible = ref<Record<string, boolean>>({});
        const classes = computed(() => ({}));

        onMounted(() => {
            addEventListeners();
        });

        onBeforeUnmount(() => {
            removeEventListeners();
        });

        function addEventListeners() {
            props.eventBus.on('show', showModal);
            props.eventBus.on('hide', hideModal);
            props.eventBus.on('hideAll', hideAllModals);
        }

        function removeEventListeners() {
            props.eventBus.off('show', showModal);
            props.eventBus.off('hide', hideModal);
            props.eventBus.off('hideAll', hideAllModals);
        }

        function showModal(modal: Partial<ModalEntry>) {
            const id = modal.id || uid('modal');

            if (modalsVisible.value[id]) {
                console.log(`Modal with id "${id}" is already visible.`);
                return;
            }

            const color = modal?.color ?? (options.value.modal?.color || 'light');
            const size = modal?.size ?? (options.value.modal?.size || 'md');
            const type = modal?.type ?? '';

            modals.value.push({
                ...modal,
                id,
                color,
                size,
                type
            });

            nextTick(() => {
                modalsVisible.value[id] = true;
            });
        }

        function hideModal({ id }: Partial<ModalEntry>) {
            if (!id) return;

            modalsVisible.value[id] = false;

            setTimeout(() => {
                removeModal({ id });
            }, 300);
        }

        function hideAllModals() {
            modals.value = [];
            modalsVisible.value = {};
        }

        function removeModal({ id }: Partial<ModalEntry>) {
            modals.value = modals.value.filter((modal) => modal.id !== id);
        }

        return {
            modals,
            modalsVisible,
            classes,
            hideModal,
            removeModal
        };
    }
});
</script>

<template>
    <div class="modal-container" :class="classes">
        <Modal
            v-for="modal in modals"
            v-bind="modal"
            :key="modal.id"
            :model-value="modalsVisible[modal.id ?? '']"
            :name="modal.id"
            :class="modal.type ? `-${modal.type}` : undefined"
            @close="hideModal(modal)"
            @closed="removeModal(modal)"
        />
    </div>
</template>
