<script lang="ts" setup>
import { ref } from 'vue';
import type { CheckboxGroupOption } from '@inkline/inkline';

const checked = ref(['apple']);
const options = ref<CheckboxGroupOption[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>

<template>
    <ICheckboxGroup v-model="checked" :options="options" size="sm" />

    <ICheckboxGroup v-model="checked" :options="options" size="md" />

    <ICheckboxGroup v-model="checked" :options="options" size="lg" />
</template>
