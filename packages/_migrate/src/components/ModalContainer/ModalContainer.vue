<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import { useInkline } from '@inkline/inkline/composables';
import type { ModalOptions } from '@inkline/inkline/types';
import { modalEventBus } from '@inkline/inkline/constants';
import { uid } from '@inkline/utils';
import type { EventBus } from '@inkline/utils';
import { Modal } from '@inkline/inkline/components/Modal';

const componentName = 'ModalContainer';

export default defineComponent({
    name: componentName,
    components: {
        Modal
    },
    inheritAttrs: false,
    props: {
        /**
         * The event bus to use for showing/hiding modals
         * @type EventBus
         * @default modalEventBus
         * @name eventBus
         */
        eventBus: {
            type: Object as PropType<EventBus>,
            default: () => modalEventBus
        }
    },
    setup(props) {
        const inkline = useInkline();

        const modals = ref<Array<Partial<ModalOptions> & { id: ModalOptions['id'] }>>([]);
        const modalsVisible = ref<Record<string, boolean>>({});
        const classes = computed(() => ({}));

        onMounted(() => {
            addEventListeners();
        });

        function addEventListeners() {
            props.eventBus.on('show', showModal);
            props.eventBus.on('hide', hideModal);
            props.eventBus.on('hideAll', hideAllModals);
        }

        function showModal(modal: Partial<ModalOptions>) {
            const id = modal.id || uid('modal');

            if (modalsVisible.value[id]) {
                console.log(`Modal with id "${id}" is already visible.`);
                return;
            }

            const color = modal?.color || inkline.options.modal?.color || 'light';
            const size = modal?.size || inkline.options.modal?.size || 'md';

            modals.value.push({
                ...modal,
                id,
                color,
                size
            });

            nextTick(() => {
                modalsVisible.value[id] = true;
            });
        }

        function hideModal({ id }: { id: ModalOptions['id'] }) {
            modalsVisible.value[id] = false;

            setTimeout(() => {
                removeModal({ id });
            }, 300);
        }

        function hideAllModals() {
            modals.value = [];
            modalsVisible.value = {};
        }

        function removeModal({ id }: { id: ModalOptions['id'] }) {
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
    <div v-bind="$attrs" class="modal-container" :class="classes">
        <Modal
            v-for="modal in modals"
            :key="modal.id"
            :name="modal.id"
            :class="modal.type ? `-${modal.type}` : undefined"
            :model-value="modalsVisible[modal.id]"
            v-bind="modal"
            @close="hideModal(modal)"
            @closed="removeModal(modal)"
        />
    </div>
</template>
