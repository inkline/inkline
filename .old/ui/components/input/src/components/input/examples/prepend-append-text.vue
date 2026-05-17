<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </Input>
</template>
