<template>
    <Alert color="info">
        <template #icon>
            <Icon name="ink:circle" />
        </template>
        This alert has a custom icon. You can use any icon inside the icon slot.
    </Alert>

    <Alert color="info" :icon="false">
        This alert doesn't have an icon. You can disable the icon by passing false to the icon prop.
    </Alert>
</template>
