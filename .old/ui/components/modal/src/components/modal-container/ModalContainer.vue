<script lang="ts">
import { nextTick, defineComponent, ref, h, onBeforeUnmount, onMounted } from 'vue';
import type { PropType } from 'vue';
import type { ModalEventBusPayload, ModalOptions } from '../../types';
import { modalEventBus } from '../../instances';
import { EventBus, uid } from '@inkline/utils';
import { useOptions } from '@inkline/composables';
import { Modal } from '../modal';
import { ModalHeader } from '../modal-header';
import { ModalFooter } from '../modal-footer';
import { DynamicRenderer } from '@inkline/component-dynamic-renderer';
import { RenderableNode } from '@inkline/types';

const componentName = 'ModalContainer';

type ModalEntry = Required<Pick<ModalOptions, 'id'>> &
    Pick<ModalOptions, 'color' | 'size' | 'type'> & { content?: RenderableNode };

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

        function showModal(modal: ModalOptions) {
            const id = modal.id || uid('modal');

            if (modalsVisible.value[id]) {
                console.log(`Modal with id "${id}" is already visible.`);
                return;
            }

            const { header, body, footer, color, size, type, ...rest } = modal;

            modals.value.push({
                ...rest,
                id,
                content: h(DynamicRenderer, {
                    render: [
                        h(ModalHeader, h(DynamicRenderer, { render: header })),
                        h(DynamicRenderer, { render: body }),
                        h(ModalFooter, h(DynamicRenderer, { render: footer }))
                    ]
                }),
                color: color ?? options.value.modal?.color ?? 'light',
                size: size ?? options.value.modal?.size ?? 'md',
                type: type ?? ''
            });

            nextTick(() => {
                modalsVisible.value[id] = true;
            });
        }

        function hideModal({ id }: ModalEntry) {
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

        function removeModal({ id }: ModalEntry) {
            modals.value = modals.value.filter((modal) => modal.id !== id);
        }

        return {
            modals,
            modalsVisible,
            hideModal,
            removeModal
        };
    }
});
</script>

<template>
    <div class="modal-container">
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
