<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <i-tooltip events="click">
        <i-button>Click Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>

    <i-tooltip events="hover">
        <i-button>Hover Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>

    <i-tooltip events="focus">
        <i-button type="submit">Focus Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>

    <i-tooltip :events="['focus', 'hover']">
        <i-button>Multiple Events Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>

    <i-tooltip v-model="visible" events="manual">
        <i-button @click="visible = !visible">Manual Tooltip</i-button>
        <template #body>Tooltip</template>
    </i-tooltip>
</template>
