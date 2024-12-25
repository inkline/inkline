<script setup lang="ts">
import { useToast } from 'inkline';
import { h } from 'vue';

const toastService = useToast();

function onClickShowToast() {
    toastService.show({
        icon: h('span', 'CON'),
        title: h('strong', 'Toast heading'),
        message: h('p', 'This message is a VNode')
    });
}
</script>
<template>
    <Button @click="onClickShowToast">Show toast</Button>
</template>
