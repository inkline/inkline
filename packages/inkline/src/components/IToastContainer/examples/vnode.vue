<script lang="ts">
import { useToast } from '@inkline/inkline/composables';
import { defineComponent, h } from 'vue';

export default defineComponent({
    setup() {
        const toastService = useToast();

        function onClickShowToast() {
            toastService.show({
                icon: h('span', 'ICON'),
                title: h('strong', 'Toast heading'),
                message: h('p', 'This message is a VNode')
            });
        }

        return {
            onClickShowToast
        };
    }
});
</script>
<template>
    <IButton @click="onClickShowToast">Show toast</IButton>
</template>
