<template>
    <Popover size="sm">
        <template #trigger="{ props }">
            <Button v-bind="props">Small Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover size="md">
        <template #trigger="{ props }">
            <Button v-bind="props">Medium Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover size="lg">
        <template #trigger="{ props }">
            <Button v-bind="props">Large Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>
</template>
