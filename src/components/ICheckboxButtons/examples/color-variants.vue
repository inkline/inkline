<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['apple']);
const options = ref([
    { id: 1, label: 'Apple', value: 'apple' },
    { id: 2, label: 'Banana', value: 'banana' },
    { id: 3, label: 'Strawberry', value: 'strawberry' },
    { id: 4, label: 'Mango', value: 'mango' }
]);
</script>

<template>
    <ICheckboxButtons v-model="checked" color="light" :options="options" />
    <ICheckboxButtons v-model="checked" color="dark" :options="options" />
</template>
