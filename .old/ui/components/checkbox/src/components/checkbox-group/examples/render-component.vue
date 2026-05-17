<script lang="ts" setup>
import { defineComponent, h, markRaw, ref } from 'vue';
import type { CheckboxGroupOption } from 'inkline';

const LabelRenderComponent = markRaw(
    defineComponent({
        props: {
            id: {
                type: String,
                required: true
            }
        },
        setup(props) {
            return () => h('strong', props.id);
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
