<template>
    <BaseComponent :variant="{ extends: 'default', borderStyle: 'solid' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderStyle: 'dashed' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderStyle: 'dotted' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderStyle: 'double', borderWidth: 'thick' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderStyle: 'groove', borderWidth: 'thick' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderWidth: '0' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderWidth: 'thin' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderWidth: 'medium' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderWidth: 'thick' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderColor: 'primary' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderColor: 'secondary' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderColor: 'success' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderColor: 'danger' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderColor: 'warning' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderColor: 'info' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent
        :variant="{
            extends: 'default',
            borderTopStyle: 'solid',
            borderRightStyle: 'dashed',
            borderBottomStyle: 'dotted',
            borderLeftStyle: 'double',
            borderWidth: 'thick'
        }"
    >
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent
        :variant="{
            extends: 'default',
            borderTopColor: 'primary',
            borderRightColor: 'secondary',
            borderBottomColor: 'success',
            borderLeftColor: 'danger',
            borderWidth: 'medium'
        }"
    >
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent
        :variant="{
            extends: 'default',
            borderTopWidth: 'thin',
            borderRightWidth: 'medium',
            borderBottomWidth: 'thick',
            borderLeftWidth: 'none'
        }"
    >
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
</template>
