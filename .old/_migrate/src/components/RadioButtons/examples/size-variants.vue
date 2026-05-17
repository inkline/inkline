<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('strawberry');
const options = ref([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>

<template>
    <RadioButtons v-model="checked" :options="options" size="sm" />
    <RadioButtons v-model="checked" :options="options" size="md" />
    <RadioButtons v-model="checked" :options="options" size="lg" />
</template>
