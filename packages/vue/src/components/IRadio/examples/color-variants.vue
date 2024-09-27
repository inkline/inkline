<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <IRadioGroup v-model="checked" color="light">
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>

    <IRadioGroup v-model="checked" color="dark">
        <IRadio value="apple">Apple</IRadio>
        <IRadio value="banana">Banana</IRadio>
        <IRadio value="strawberry">Strawberry</IRadio>
        <IRadio value="mango">Mango</IRadio>
    </IRadioGroup>
</template>
