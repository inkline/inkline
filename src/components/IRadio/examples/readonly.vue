<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <IRadioGroup v-model="checked">
        <IRadio value="apple" readonly>Apple</IRadio>
        <IRadio value="banana" readonly>Banana</IRadio>
    </IRadioGroup>
</template>
