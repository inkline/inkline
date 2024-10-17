<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['apple']);
const options = ref([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>

<template>
    <CheckboxButtons v-model="checked" color="light" :options="options" />
    <CheckboxButtons v-model="checked" color="dark" :options="options" />
</template>
