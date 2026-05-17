<template>
    <Popover size="sm">
        <template #trigger="{ props }">
            <Button v-bind="props">Small Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover size="md">
        <template #trigger="{ props }">
            <Button v-bind="props">Medium Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover size="lg">
        <template #trigger="{ props }">
            <Button v-bind="props">Large Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>
</template>
