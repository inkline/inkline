<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <Button>Button</Button>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #append>
            <Button>Button</Button>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <Button>Button</Button>
        </template>
        <template #append>
            <Button>Button</Button>
        </template>
    </Input>
</template>
