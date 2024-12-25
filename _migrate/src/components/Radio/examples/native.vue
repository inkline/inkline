<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <RadioGroup v-model="checked">
        <Radio value="apple" native>Apple</Radio>
        <Radio value="banana" native>Banana</Radio>
        <Radio value="strawberry" native>Strawberry</Radio>
        <Radio value="mango" native>Mango</Radio>
    </RadioGroup>
</template>
