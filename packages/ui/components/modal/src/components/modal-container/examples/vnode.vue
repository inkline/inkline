<script lang="ts" setup>
import { useToast, useModal, Button } from 'inkline';
import { h } from 'vue';

const toast = useToast();
const modal = useModal();
const modalId = 'custom-modal-id';

function showModal() {
    modal.show({
        id: modalId,
        header: h('strong', 'Modal heading'),
        body: h('div', [
            h('p', 'This message is a VNode'),
            h('ul', [h('li', 'List item 1'), h('li', 'List item 2'), h('li', 'List item 3')])
        ]),
        footer: h('div', { class: '_display:flex _justify-content:flex-end' }, [
            h(Button, { onClick: cancelModal, class: '_margin-right:1' }, () => 'Cancel'),
            h(Button, { onClick: confirmModal, color: 'primary' }, () => 'Confirm')
        ])
    });
}

function cancelModal() {
    modal.hide({ id: modalId });
}

function confirmModal() {
    toast.show({
        message: 'Confirmed',
        color: 'success'
    });
    modal.hide({ id: modalId });
}
</script>
<template>
    <Button @click="showModal">Show modal</Button>
</template>
