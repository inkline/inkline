<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(true);
</script>

<template>
    <i-checkbox v-model="checked" readonly>Apple</i-checkbox>
</template>
