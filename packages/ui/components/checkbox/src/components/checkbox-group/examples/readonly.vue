<script lang="ts" setup>
import { ref } from 'vue';
import type { CheckboxGroupOption } from 'inkline';

const checked = ref(['apple']);
const options = ref<CheckboxGroupOption[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>

<template>
    <CheckboxGroup v-model="checked" :options="options" readonly />
</template>
