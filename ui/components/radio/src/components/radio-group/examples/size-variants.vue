<script lang="ts" setup>
import { ref } from 'vue';
import type { RadioGroupOption } from 'inkline';

const checked = ref(['apple']);
const options = ref<RadioGroupOption[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>
<template>
    <RadioGroup v-model="checked" :options="options" size="sm" />

    <RadioGroup v-model="checked" :options="options" size="md" />

    <RadioGroup v-model="checked" :options="options" size="lg" />
</template>
