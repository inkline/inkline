<script lang="ts" setup>
import { ref } from 'vue';

const sm = ref(['apple']);
const md = ref(['apple']);
const lg = ref(['apple']);
</script>

<template>
    <ICheckboxGroup v-model="sm" size="sm">
        <ICheckbox value="apple">Apple</ICheckbox>
        <ICheckbox value="banana">Banana</ICheckbox>
        <ICheckbox value="strawberry">Strawberry</ICheckbox>
        <ICheckbox value="mango">Mango</ICheckbox>
    </ICheckboxGroup>

    <ICheckboxGroup v-model="md" size="md">
        <ICheckbox value="apple">Apple</ICheckbox>
        <ICheckbox value="banana">Banana</ICheckbox>
        <ICheckbox value="strawberry">Strawberry</ICheckbox>
        <ICheckbox value="mango">Mango</ICheckbox>
    </ICheckboxGroup>

    <ICheckboxGroup v-model="lg" size="lg">
        <ICheckbox value="apple">Apple</ICheckbox>
        <ICheckbox value="banana">Banana</ICheckbox>
        <ICheckbox value="strawberry">Strawberry</ICheckbox>
        <ICheckbox value="mango">Mango</ICheckbox>
    </ICheckboxGroup>
</template>
