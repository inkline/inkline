<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <RadioGroup v-model="checked" color="light">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="strawberry">Strawberry</Radio>
        <Radio value="mango">Mango</Radio>
    </RadioGroup>

    <RadioGroup v-model="checked" color="dark">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="strawberry">Strawberry</Radio>
        <Radio value="mango">Mango</Radio>
    </RadioGroup>
</template>
