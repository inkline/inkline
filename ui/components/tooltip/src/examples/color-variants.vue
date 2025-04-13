<template>
    <Tooltip color="light">
        <template #trigger="{ props }">
            <Button v-bind="props" color="light">Light Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip color="dark">
        <template #trigger="{ props }">
            <Button v-bind="props" color="dark">Dark Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>
</template>
