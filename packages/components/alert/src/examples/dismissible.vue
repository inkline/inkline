<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
    <Alert v-model="visible" dismissible> Whoa! Nicely done. </Alert>
</template>
