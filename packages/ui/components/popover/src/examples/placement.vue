<template>
    <Popover placement="top">
        <template #trigger="{ props }">
            <Button v-bind="props">Top Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover placement="bottom">
        <template #trigger="{ props }">
            <Button v-bind="props">Bottom Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover placement="left">
        <template #trigger="{ props }">
            <Button v-bind="props">Left Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>

    <Popover placement="right">
        <template #trigger="{ props }">
            <Button v-bind="props">Right Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>
</template>
