<script lang="ts" setup>
import { ref } from 'vue';
import type { SelectOption } from '@inkline/inkline';

const selected = ref(null);
const options = ref<SelectOption[]>([
    { id: 1, label: 'Richard Hendricks' },
    { id: 2, label: 'Bertram Gilfoyle' },
    { id: 3, label: 'Dinesh Chugtai' },
    { id: 4, label: 'Jared Dunn' },
    { id: 5, label: 'Erlich Bachman' }
]);
</script>
<template>
    <Select v-model="selected" :options="options" placeholder="Choose something.." size="sm" />

    <Select v-model="selected" :options="options" placeholder="Choose something.." size="md" />

    <Select v-model="selected" :options="options" placeholder="Choose something.." size="lg" />
</template>
