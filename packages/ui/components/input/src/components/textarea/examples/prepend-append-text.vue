<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </Textarea>
</template>
