<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['primary']);
const options = ref([
    { id: 1, label: 'Primary', value: 'primary', buttonProps: { color: 'primary' } },
    { id: 1, label: 'Secondary', value: 'secondary', buttonProps: { color: 'secondary' } },
    { id: 1, label: 'Info', value: 'info', buttonProps: { color: 'info' } },
    { id: 1, label: 'Success', value: 'success', buttonProps: { color: 'success' } },
    { id: 1, label: 'Warning', value: 'warning', buttonProps: { color: 'warning' } },
    { id: 1, label: 'Warning', value: 'danger', buttonProps: { color: 'danger' } }
]);
</script>

<template>
    <ICheckboxButtons v-model="checked" :options="options" />
</template>
