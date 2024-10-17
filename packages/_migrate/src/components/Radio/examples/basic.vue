<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <RadioGroup v-model="checked">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="strawberry">Strawberry</Radio>
        <Radio value="mango">Mango</Radio>
    </RadioGroup>
</template>
