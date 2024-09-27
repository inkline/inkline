<script lang="ts" setup>
import { defineComponent, h, markRaw, ref } from 'vue';
import type { RadioButtonOption } from '@inkline/inkline';

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

const checked = ref('apple');

const options = ref<RadioButtonOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);
</script>

<template>
    <IRadioButtons v-model="checked" :options="options" :label="LabelRenderComponent" />
</template>
