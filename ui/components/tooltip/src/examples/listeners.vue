<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Tooltip listener="click">
        <template #trigger="{ props }">
            <Button v-bind="props">Click Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip listener="hover">
        <template #trigger="{ props }">
            <Button v-bind="props">Hover Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip listener="focus">
        <template #trigger="{ props }">
            <Button v-bind="props" type="submit">Focus Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip :listener="['focus', 'hover']">
        <template #trigger="{ props }">
            <Button v-bind="props">Multiple listener Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip v-model:visible="visible" listener="manual">
        <template #trigger="{ props }">
            <Button v-bind="props" @click="visible = !visible">Manual Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>
</template>
