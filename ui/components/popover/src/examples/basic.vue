<template>
    <Popover>
        <template #trigger="{ props }">
            <Button v-bind="props">Popover</Button>
        </template>
        This is the popover body. Useful information goes here.
    </Popover>
</template>
