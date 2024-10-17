<script lang="ts">
import { Icon, useModal } from '@inkline/inkline';
import { defineComponent, h } from 'vue';

export default defineComponent({
    setup() {
        const modal = useModal();

        function showModalWithIcon() {
            modal.show({
                header: 'Modal title',
                body: 'Modal body text goes here',
                icon: h(Icon, { name: 'ink-info', size: 'xl' }),
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
    <Button @click="showModalWithIcon">Show modal with icon</Button>
    <Button @click="showModalWithEmoji">Show modal with emoji</Button>
</template>
