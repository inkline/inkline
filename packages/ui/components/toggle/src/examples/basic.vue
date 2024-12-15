<script lang="ts" setup>
import { ref } from 'vue';

const toggled = ref(false);
</script>

<template>
    <Toggle v-model="toggled">I accept the terms and conditions</Toggle>
</template>
