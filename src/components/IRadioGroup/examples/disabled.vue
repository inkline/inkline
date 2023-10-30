<script lang="ts" setup>
import { ref } from 'vue';
import type { RadioGroupOption } from '@inkline/inkline';

const checked = ref(['apple']);
const options = ref<RadioGroupOption[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'mango', label: 'Mango' }
]);
</script>
<template>
    <IRadioGroup v-model="checked" :options="options" disabled>
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>
</template>
