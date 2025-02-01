<script lang="ts" setup>
import { defineComponent, h, markRaw, ref } from 'vue';
import type { CheckboxGroupOption } from 'inkline';

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

const options = ref<CheckboxGroupOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);
</script>

<template>
    <CheckboxGroup v-model="checked" :options="options" :label="LabelRenderComponent" />
</template>
