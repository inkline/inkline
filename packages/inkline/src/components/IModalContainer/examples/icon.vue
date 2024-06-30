<script lang="ts">
import { IIcon, useModal } from '@inkline/inkline';
import { defineComponent, h } from 'vue';

export default defineComponent({
    setup() {
        const modal = useModal();

        function showModalWithIcon() {
            modal.show({
                header: 'Modal title',
                body: 'Modal body text goes here',
                icon: h(IIcon, { name: 'ink-info', size: 'xl' }),
                footer: 'Modal footer'
            });
        }

        function showModalWithEmoji() {
            modal.show({
                header: 'Modal title',
                body: 'Modal body text goes here',
                icon: '👍',
                footer: 'Modal footer'
            });
        }

        return {
            showModalWithIcon,
            showModalWithEmoji
        };
    }
});
</script>
<template>
    <IButton @click="showModalWithIcon">Show modal with icon</IButton>
    <IButton @click="showModalWithEmoji">Show modal with emoji</IButton>
</template>
