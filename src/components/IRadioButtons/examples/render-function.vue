<script lang="ts" setup>
import { h, ref } from 'vue';

const checked = ref('apple');
const options = ref([
    { id: 1, label: () => h('strong', 'Apple'), value: 'apple' },
    { id: 2, label: () => h('strong', 'Banana'), value: 'banana' },
    { id: 3, label: () => h('strong', 'Strawberry'), value: 'strawberry' },
    { id: 4, label: () => h('strong', 'Mango'), value: 'mango' }
]);
</script>

<template>
    <IRadioButtons v-model="checked" :options="options" />
</template>
