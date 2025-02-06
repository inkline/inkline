<script lang="ts" setup>
import { defineComponent, h, markRaw, PropType, ref } from 'vue';
import type { RadioGroupOption } from 'inkline';

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

const checked = ref('apple');

const options = ref<RadioGroupOption[]>([
    { id: 'apple' },
    { id: 'banana' },
    { id: 'strawberry' },
    { id: 'mango' }
]);
</script>

<template>
    <RadioGroup v-model="checked" :options="options" :label="LabelRenderComponent" />
</template>
