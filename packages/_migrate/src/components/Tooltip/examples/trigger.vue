<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Tooltip events="click">
        <Button>Click Tooltip</Button>
        <template #body>Tooltip</template>
    </Tooltip>

    <Tooltip events="hover">
        <Button>Hover Tooltip</Button>
        <template #body>Tooltip</template>
    </Tooltip>

    <Tooltip events="focus">
        <Button type="submit">Focus Tooltip</Button>
        <template #body>Tooltip</template>
    </Tooltip>

    <Tooltip :events="['focus', 'hover']">
        <Button>Multiple Events Tooltip</Button>
        <template #body>Tooltip</template>
    </Tooltip>

    <Tooltip v-model:visible="visible" events="manual">
        <Button @click="visible = !visible">Manual Tooltip</Button>
        <template #body>Tooltip</template>
    </Tooltip>
</template>
