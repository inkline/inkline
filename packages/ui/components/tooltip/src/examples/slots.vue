<template>
    <Tooltip>
        <template #trigger="{ props }">
            <Button v-bind="props">Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>
</template>
