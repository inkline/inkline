<script lang="ts" setup>
defineProps<{
    label?: string;
}>();
</script>

<template>
    <Badge class="docs-badge" size="inherit">
        <slot mdc-unwrap="p">
            {{ label }}
        </slot>
    </Badge>
</template>
