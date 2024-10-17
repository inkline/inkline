<script lang="ts">
import { useToast } from '@inkline/inkline';
import { defineComponent, h } from 'vue';

export default defineComponent({
    setup() {
        const toastService = useToast();

        function onClickShowToast() {
            toastService.show({
                icon: h('span', 'CON'),
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
    <Button @click="onClickShowToast">Show toast</Button>
</template>
