<script lang="ts" setup>
import { ref } from 'vue';

const sm = ref(['apple']);
const md = ref(['apple']);
const lg = ref(['apple']);
</script>

<template>
    <i-checkbox-group v-model="sm" size="sm">
        <i-checkbox value="apple">Apple</i-checkbox>
        <i-checkbox value="banana">Banana</i-checkbox>
        <i-checkbox value="strawberry">Strawberry</i-checkbox>
        <i-checkbox value="mango">Mango</i-checkbox>
    </i-checkbox-group>

    <i-checkbox-group v-model="md" size="md">
        <i-checkbox value="apple">Apple</i-checkbox>
        <i-checkbox value="banana">Banana</i-checkbox>
        <i-checkbox value="strawberry">Strawberry</i-checkbox>
        <i-checkbox value="mango">Mango</i-checkbox>
    </i-checkbox-group>

    <i-checkbox-group v-model="lg" size="lg">
        <i-checkbox value="apple">Apple</i-checkbox>
        <i-checkbox value="banana">Banana</i-checkbox>
        <i-checkbox value="strawberry">Strawberry</i-checkbox>
        <i-checkbox value="mango">Mango</i-checkbox>
    </i-checkbox-group>
</template>
