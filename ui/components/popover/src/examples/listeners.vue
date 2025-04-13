<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <Popover listener="click">
        <template #trigger="{ props }">
            <Button v-bind="props">Click Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover listener="hover">
        <template #trigger="{ props }">
            <Button v-bind="props">Hover Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover listener="focus">
        <template #trigger="{ props }">
            <Button v-bind="props" type="submit">Focus Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover :listener="['focus', 'hover']">
        <template #trigger="{ props }">
            <Button v-bind="props">Multiple listener Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover v-model:visible="visible" listener="manual">
        <template #trigger="{ props }">
            <Button v-bind="props" @click="visible = !visible">Manual Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>
</template>
