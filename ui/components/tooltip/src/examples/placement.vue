<template>
    <Tooltip placement="top">
        <template #trigger="{ props }">
            <Button v-bind="props">Top Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip placement="bottom">
        <template #trigger="{ props }">
            <Button v-bind="props">Bottom Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip placement="left">
        <template #trigger="{ props }">
            <Button v-bind="props">Left Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>

    <Tooltip placement="right">
        <template #trigger="{ props }">
            <Button v-bind="props">Right Tooltip</Button>
        </template>
        <template #content>Tooltip</template>
    </Tooltip>
</template>
