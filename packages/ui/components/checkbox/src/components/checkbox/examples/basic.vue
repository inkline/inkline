<script lang="ts" setup>
import { ref } from 'vue';
const checked = ref(false);
</script>

<template>
    <Checkbox v-model="checked">Apple</Checkbox>
</template>
