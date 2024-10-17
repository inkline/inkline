<script lang="ts" setup>
import { ref } from 'vue';
import type { CheckboxGroupOption } from '@inkline/inkline';

const checked = ref(['apple']);
const options = ref<CheckboxGroupOption[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>
<template>
    <div>
        <div class="_background:white _display:flex _align-items:center _padding:1">
            <CheckboxGroup v-model="checked" :options="options" color="light" />
        </div>

        <div class="_background:gray-90 _display:flex _align-items:center _padding:1">
            <CheckboxGroup v-model="checked" :options="options" color="dark" />
        </div>
    </div>
</template>
