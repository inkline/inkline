<script lang="ts">
import { useModal } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const modal = useModal();

        function showSmallModal() {
            modal.show({
                header: 'Small Modal',
                body: 'This modal is small',
                footer: 'Modal footer',
                size: 'sm'
            });
        }

        function showMediumModal() {
            modal.show({
                header: 'Medium Modal',
                body: 'This modal is medium',
                footer: 'Modal footer',
                size: 'md'
            });
        }

        function showLargeModal() {
            modal.show({
                header: 'Large Modal',
                body: 'This modal is large',
                footer: 'Modal footer',
                size: 'lg'
            });
        }

        return {
            showSmallModal,
            showMediumModal,
            showLargeModal
        };
    }
});
</script>
<template>
    <IButton size="sm" @click="showSmallModal">Show small modal</IButton>
    <IButton size="md" @click="showMediumModal">Show medium modal</IButton>
    <IButton size="lg" @click="showLargeModal">Show large modal</IButton>
</template>
