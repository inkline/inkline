<script lang="ts" setup>
import { h, ref } from 'vue';

const checked = ref('apple');
const options = ref([
    { id: 'apple', label: () => h('strong', { class: '_color:green' }, 'Apple') },
    { id: 'banana', label: () => h('strong', { class: '_color:yellow' }, 'Banana') },
    { id: 'strawberry', label: () => h('strong', { class: '_color:red' }, 'Strawberry') },
    { id: 'mango', label: () => h('strong', { class: '_color:orange' }, 'Mango') }
]);
</script>

<template>
    <RadioButtons v-model="checked" :options="options" />
</template>
