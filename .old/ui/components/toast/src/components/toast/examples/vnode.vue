<script lang="ts" setup>
import { h } from 'vue';
import { Icon } from 'inkline';

const icon = h(Icon, { name: 'ink:circle' });
const title = h('span', 'Toast title');
const message = h('p', 'Toast icon, message, and title rendered using VNode');
</script>
<template>
    <Toast :icon="icon" :title="title" :message="message" />
</template>
