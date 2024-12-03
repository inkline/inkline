<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <RadioGroup v-model="checked">
        <Radio value="small" size="sm">Small</Radio>
        <Radio value="medium" size="md">Medium</Radio>
        <Radio value="large" size="lg">Large</Radio>
    </RadioGroup>
</template>
