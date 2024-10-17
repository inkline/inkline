<script lang="ts">
import { useModal } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const modal = useModal();

        function showModal() {
            modal.show({
                header: 'Modal title',
                body: 'Modal body text goes here',
                footer: 'Modal footer'
            });
        }

        return {
            showModal
        };
    }
});
</script>
<template>
    <Button @click="showModal">Show modal</Button>
</template>
