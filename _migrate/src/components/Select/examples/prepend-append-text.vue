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
    <Select v-model="selected" :options="options" placeholder="Choose something..">
        <template #prepend>
            <span>I choose</span>
        </template>
    </Select>

    <Select v-model="selected" :options="options" placeholder="Choose something..">
        <template #append>
            <span>as an example</span>
        </template>
    </Select>

    <Select v-model="selected" :options="options" placeholder="Choose something..">
        <template #prepend>
            <span>I choose</span>
        </template>
        <template #append>
            <span>as an example</span>
        </template>
    </Select>
</template>
