<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
const options = ref([
    { id: 'apple', fruit: { name: 'Apple' } },
    { id: 'banana', fruit: { name: 'Banana' } },
    { id: 'strawberry', fruit: { name: 'Strawberry' } },
    { id: 'mango', fruit: { name: 'Mango' } }
]);

const labelRenderString = '{{fruit.name}}';
</script>

<template>
    <RadioButtons v-model="checked" :options="options" :label="labelRenderString" />
</template>
