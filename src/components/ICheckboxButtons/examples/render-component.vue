<script lang="ts" setup>
import { defineComponent, h, markRaw, ref } from 'vue';
import type { CheckboxButtonOption } from '@inkline/inkline';

const LabelRenderComponent = markRaw(
    defineComponent({
        props: {
            ctx: {
                type: Object,
                default: () => ({})
            }
        },
        setup(props) {
            return () => h('strong', props.ctx.id);
        }
    })
);

const checked = ref(['apple']);

const options = ref<CheckboxButtonOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);
</script>

<template>
    <ICheckboxButtons v-model="checked" :options="options" :label="LabelRenderComponent" />
</template>
