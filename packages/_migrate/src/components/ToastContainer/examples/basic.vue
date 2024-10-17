<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const toast = useToast();

        function showToast() {
            toast.show({
                title: 'Toast title',
                message: 'Toast message'
            });
        }

        return {
            showToast
        };
    }
});
</script>
<template>
    <Button @click="showToast">Show toast</Button>
</template>
