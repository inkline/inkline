<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(true);
</script>

<template>
    <Checkbox v-model="checked" readonly>Apple</Checkbox>
</template>
