<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
    <i-alert v-model="visible" dismissible> <p>Whoa! Nicely done.</p> </i-alert>
</template>
