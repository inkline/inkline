<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
const options = ref([{ id: 'apple' }, { id: 'banana' }, { id: 'strawberry' }, { id: 'mango' }]);
</script>

<template>
    <RadioButtons v-model="checked" :options="options">
        <template #option="{ option }">
            {{ option.id }}
        </template>
    </RadioButtons>
</template>
