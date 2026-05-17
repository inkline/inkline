<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref('apple');
</script>
<template>
    <RadioGroup v-model="checked">
        <Radio value="apple" readonly>Apple</Radio>
        <Radio value="banana" readonly>Banana</Radio>
    </RadioGroup>
</template>
