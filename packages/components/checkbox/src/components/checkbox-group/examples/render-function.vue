<script lang="ts" setup>
import { h, ref } from 'vue';
import type { RenderFunction, CheckboxGroupOption } from 'inkline';

const checked = ref(['apple']);

const options = ref<CheckboxGroupOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);

const labelRenderFunction: RenderFunction<CheckboxGroupOption> = (option) => h('strong', option.id);
</script>

<template>
    <CheckboxGroup v-model="checked" :options="options" :label="labelRenderFunction" />
</template>
