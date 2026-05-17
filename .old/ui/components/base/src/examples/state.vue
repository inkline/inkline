<template>
    <BaseComponent
        :variant="{ extends: 'default', background: 'primary' }"
        :hover:variant="{ background: 'secondary' }"
    >
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
    <BaseComponent variant="default" hover:variant="primary--interactive">
        Some quick example text to make up the bulk of the box's content.
    </BaseComponent>
</template>
