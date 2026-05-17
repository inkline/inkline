<template>
    <Tooltip size="sm">
        <template #trigger="{ props }">
            <Button v-bind="props">Small Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip size="md">
        <template #trigger="{ props }">
            <Button v-bind="props">Medium Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip size="lg">
        <template #trigger="{ props }">
            <Button v-bind="props">Large Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>
</template>
