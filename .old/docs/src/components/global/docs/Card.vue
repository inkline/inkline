<script setup lang="ts">
defineProps<{
    title?: string;
}>();
</script>

<template>
    <Card class="docs-card">
        <div v-if="$slots.header || title" class="card-header">
            <slot name="header">
                <Typography font-weight="semibold">{{ title }}</Typography>
            </slot>
        </div>
        <slot />
    </Card>
</template>

<style>
.docs-card {
    .card-header {
        padding: var(--spacing);
        margin: calc(var(--spacing) * -1) calc(var(--spacing) * -1) var(--spacing)
            calc(var(--spacing) * -1);
        border-bottom: 1px solid var(--border-bottom-color);
    }

    margin-bottom: var(--spacing-xl);

    .app-table {
        margin: 0;
        padding: 0;
        border-top: none;
        border-bottom: none;

        .tr {
            &:first-child {
                padding-top: 0;
            }

            &:last-child {
                padding-bottom: 0;
            }
        }
    }

    p:last-child {
        margin-bottom: 0;
    }
}
</style>
