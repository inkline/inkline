<script lang="ts" setup>
import { h } from 'vue';
import { IIcon } from '@inkline/inkline/components';

const icon = h(IIcon, { name: 'ink-circle' });
const title = h('span', 'Toast title');
const message = h('p', 'Toast icon, message, and title rendered using VNode');
</script>
<template>
    <IToast :icon="icon" :title="title" :message="message" />
</template>
