<script lang="ts" setup>
import { h, ref } from 'vue';
import type { LabelRenderFunction, RadioButtonOption } from '@inkline/inkline';

const checked = ref('apple');

const options = ref<RadioButtonOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);

const labelRenderFunction: LabelRenderFunction<RadioButtonOption> = (option) =>
    h('strong', option.id);
</script>

<template>
    <IRadioButtons v-model="checked" :options="options" :label="labelRenderFunction" />
</template>
