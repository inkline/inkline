<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(true);
</script>

<template>
    <ICheckbox v-model="checked" readonly>Apple</ICheckbox>
</template>
