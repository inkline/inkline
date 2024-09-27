<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);
</script>

<template>
    <ICheckbox v-model="checked" indeterminate>Apple</ICheckbox>
</template>
