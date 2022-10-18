<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
<template>
    <i-checkbox v-model="checked" native>Apple</i-checkbox>
</template>
