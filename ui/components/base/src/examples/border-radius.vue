<template>
    <BaseComponent :variant="{ extends: 'default', borderRadius: 'none' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderRadius: 'xs' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderRadius: 'sm' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderRadius: 'md' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderRadius: 'lg' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent :variant="{ extends: 'default', borderRadius: 'xl' }">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>

    <BaseComponent
        :variant="{
            extends: 'default',
            borderTopLeftRadius: 'sm',
            borderTopRightRadius: 'md',
            borderBottomLeftRadius: 'lg',
            borderBottomRightRadius: 'xl'
        }"
    >
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
</template>
