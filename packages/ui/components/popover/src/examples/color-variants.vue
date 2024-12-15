<template>
    <Popover color="light">
        <template #trigger="{ props }">
            <Button v-bind="props" color="light">Light Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover color="dark">
        <template #trigger="{ props }">
            <Button v-bind="props" color="dark">Dark Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>
</template>
