<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
    <ITooltip events="click">
        <IButton>Click Tooltip</IButton>
        <template #body>Tooltip</template>
    </ITooltip>

    <ITooltip events="hover">
        <IButton>Hover Tooltip</IButton>
        <template #body>Tooltip</template>
    </ITooltip>

    <ITooltip events="focus">
        <IButton type="submit">Focus Tooltip</IButton>
        <template #body>Tooltip</template>
    </ITooltip>

    <ITooltip :events="['focus', 'hover']">
        <IButton>Multiple Events Tooltip</IButton>
        <template #body>Tooltip</template>
    </ITooltip>

    <ITooltip v-model:visible="visible" events="manual">
        <IButton @click="visible = !visible">Manual Tooltip</IButton>
        <template #body>Tooltip</template>
    </ITooltip>
</template>
