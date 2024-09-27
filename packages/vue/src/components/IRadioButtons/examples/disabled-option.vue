<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
const options = ref([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry', disabled: true },
    { id: 'mango', label: 'Mango' }
]);
</script>

<template>
    <IRadioButtons v-model="checked" :options="options" />
</template>
