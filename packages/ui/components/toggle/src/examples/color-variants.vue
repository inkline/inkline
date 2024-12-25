<script lang="ts" setup>
import { ref } from 'vue';

const toggled = ref(false);
</script>

<template>
    <Toggle v-model="toggled" color="light">I accept the terms and conditions</Toggle>

    <Toggle v-model="toggled" color="dark">I accept the terms and conditions</Toggle>
</template>
