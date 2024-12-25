<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <RadioGroup v-model="checked">
        <Radio value="apple" disabled>Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="strawberry">Strawberry</Radio>
        <Radio value="mango" disabled>Mango</Radio>
    </RadioGroup>
</template>
