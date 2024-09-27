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
    <IRadioButtons v-model="checked" :options="options" size="sm" />
    <IRadioButtons v-model="checked" :options="options" size="md" />
    <IRadioButtons v-model="checked" :options="options" size="lg" />
</template>
