<script lang="ts" setup>
defineProps<{
    title: string;
    number: number;
}>();
</script>
<template>
    <div class="install-step _margin-top:2">
        <div class="install-step-title">
            <span class="install-step-number">{{ number }}</span> {{ title }}
        </div>
        <slot />
    </div>
</template>
<style>
.install-step {
    --step-number-size: 32px;

    display: block;
    position: relative;
    padding-left: var(--step-number-size);
    padding-bottom: var(--spacing);
    margin-left: calc(var(--step-number-size) / 2);
    border-left-width: 1px;
    border-left-style: solid;
    border-color: var(--border-color);

    .install-step-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        display: flex;
        align-items: center;
        margin-bottom: var(--spacing);
    }

    > p:first-child {
        margin-top: 0;
    }

    .install-step-number {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: var(--step-number-size);
        height: var(--step-number-size);
        position: absolute;
        left: calc(var(--step-number-size) / -2);
        top: -4px;
        border-width: 1px;
        border-style: solid;
        border-color: var(--border-color);
        border-radius: 50%;
        background: var(--color-white);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-normal);

        .inkline.dark-theme & {
            background: var(--color-dark);
        }
    }
}
</style>
