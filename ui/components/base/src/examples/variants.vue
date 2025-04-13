<template>
    <BaseComponent :variant="{ extends: 'default', background: 'red' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="default">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent :variant="['box', 'light']">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box dark">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box primary" hover:variant="secondary">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box primary:tint">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box secondary">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box secondary:tint">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box info">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box info:tint">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box success">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box success:tint">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box warning">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box warning:tint">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box danger">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="box danger:tint">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
</template>
<script setup lang="ts"></script>
