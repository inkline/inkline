<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['strawberry']);
const options = ref([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>

<template>
    <ICheckboxButtons v-model="checked" :options="options" size="sm" />
    <ICheckboxButtons v-model="checked" :options="options" size="md" />
    <ICheckboxButtons v-model="checked" :options="options" size="lg" />
</template>
