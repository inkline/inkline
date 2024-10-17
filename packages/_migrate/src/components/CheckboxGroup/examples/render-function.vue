<script lang="ts" setup>
import { h, ref } from 'vue';
import type { LabelRenderFunction, CheckboxButtonOption } from '@inkline/inkline';

const checked = ref(['apple']);

const options = ref<CheckboxButtonOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);

const labelRenderFunction: LabelRenderFunction<CheckboxButtonOption> = (option) =>
    h('strong', option.id);
</script>

<template>
    <CheckboxGroup v-model="checked" :options="options" :label="labelRenderFunction" />
</template>
