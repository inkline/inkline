<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Input v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #suffix>@</template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #prefix>@</template>
        <template #suffix>@</template>
    </Input>
</template>
