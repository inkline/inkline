<template>
    <Popover color="light">
        <template #trigger="{ props }">
            <Button v-bind="props" color="light">Light Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover color="dark">
        <template #trigger="{ props }">
            <Button v-bind="props" color="dark">Dark Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>
</template>
