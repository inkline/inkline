<script lang="ts" setup>
import { ref } from 'vue';

const unchecked = ref(false);

const checked = ref(true);
</script>

<template>
    <Toggle v-model="unchecked" disabled>I accept the terms and conditions</Toggle>

    <Toggle v-model="checked" disabled>I accept the terms and conditions</Toggle>
</template>
