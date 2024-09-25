<script lang="ts" setup>
import { ref } from 'vue';

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
</script>
<template>
    <ISelect v-model="selected" :options="options" placeholder="Choose something..">
        <template #option="{ option }">
            {{ option.address.city }}, {{ option.address.country }}
        </template>
    </ISelect>
</template>
