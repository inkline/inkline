<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(['apple']);
</script>

<template>
    <ICheckboxGroup v-model="checked">
        <ICheckbox value="apple">Apple</ICheckbox>
        <ICheckbox value="banana">Banana</ICheckbox>
        <ICheckbox value="strawberry">Strawberry</ICheckbox>
        <ICheckbox value="mango">Mango</ICheckbox>
    </ICheckboxGroup>
</template>
