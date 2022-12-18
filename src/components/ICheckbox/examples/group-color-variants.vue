<script lang="ts" setup>
import { ref } from 'vue';

const light = ref('apple');
const dark = ref('apple');
</script>
<template>
    <div>
        <div class="_background:white _display:flex _align-items:center _padding:1">
            <ICheckboxGroup v-model="light" color="light">
                <ICheckbox value="apple">Apple</ICheckbox>
                <ICheckbox value="banana">Banana</ICheckbox>
                <ICheckbox value="strawberry">Strawberry</ICheckbox>
                <ICheckbox value="mango">Mango</ICheckbox>
            </ICheckboxGroup>
        </div>

        <div class="_background:gray-90 _display:flex _align-items:center _padding:1">
            <ICheckboxGroup v-model="dark" color="dark">
                <ICheckbox value="apple">Apple</ICheckbox>
                <ICheckbox value="banana">Banana</ICheckbox>
                <ICheckbox value="strawberry">Strawberry</ICheckbox>
                <ICheckbox value="mango">Mango</ICheckbox>
            </ICheckboxGroup>
        </div>
    </div>
</template>
