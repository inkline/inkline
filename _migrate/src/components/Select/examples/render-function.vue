<script lang="ts" setup>
import { ref } from 'vue';
import type { LabelRenderFunction, SelectOption } from '@inkline/inkline';

const selected = ref(null);
const options = ref([
    {
        id: 1,
        address: {
            city: 'London',
            country: 'England'
        }
    },
    {
        id: 2,
        address: {
            city: 'New York',
            country: 'United States'
        }
    },
    {
        id: 3,
        address: {
            city: 'Paris',
            country: 'France'
        }
    },
    {
        id: 4,
        address: {
            city: 'Moscow',
            country: 'Russia'
        }
    },
    {
        id: 5,
        address: {
            city: 'Tokyo',
            country: 'Japan'
        }
    },
    {
        id: 6,
        address: {
            city: 'Dubai',
            country: 'United Arab Emirates'
        }
    }
]);

const renderLabelFunction: LabelRenderFunction<SelectOption> = (option) => {
    return `${option.address.city}, ${option.address.country}`;
};
</script>
<template>
    <Select
        v-model="selected"
        :options="options"
        :label="renderLabelFunction"
        placeholder="Choose something.."
    />
</template>
