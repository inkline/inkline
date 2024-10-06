<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['primary']);
const options = ref([
    { id: 'primary', label: 'Primary', buttonProps: { color: 'primary' } },
    { id: 'secondary', label: 'Secondary', buttonProps: { color: 'secondary' } },
    { id: 'info', label: 'Info', buttonProps: { color: 'info' } },
    { id: 'success', label: 'Success', buttonProps: { color: 'success' } },
    { id: 'warning', label: 'Warning', buttonProps: { color: 'warning' } },
    { id: 'danger', label: 'Warning', buttonProps: { color: 'danger' } }
]);
</script>

<template>
    <ICheckboxButtons v-model="checked" :options="options" />
</template>
