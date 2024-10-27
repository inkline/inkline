<template>
    <Popover>
        <template #trigger="{ props }">
            <Button v-bind="props">Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>
</template>
