<script lang="ts" setup>
import { h, ref } from 'vue';
import type { RenderFunction, RadioGroupOption } from 'inkline';

const checked = ref('apple');

const options = ref<RadioGroupOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);

const labelRenderFunction: RenderFunction<RadioGroupOption> = (option) => h('strong', option.id);
</script>

<template>
    <RadioGroup v-model="checked" :options="options" :label="labelRenderFunction" />
</template>
