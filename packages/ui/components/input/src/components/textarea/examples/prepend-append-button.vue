<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <Button>Button</Button>
        </template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #append>
            <Button>Button</Button>
        </template>
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <Button>Button</Button>
        </template>
        <template #append>
            <Button>Button</Button>
        </template>
    </Textarea>
</template>
