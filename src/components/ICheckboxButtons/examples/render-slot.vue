<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['apple']);
const options = ref([{ id: 'apple' }, { id: 'banana' }, { id: 'strawberry' }, { id: 'mango' }]);
</script>

<template>
    <ICheckboxButtons v-model="checked" :options="options">
        <template #option="{ option }">
            {{ option.id }}
        </template>
    </ICheckboxButtons>
</template>
