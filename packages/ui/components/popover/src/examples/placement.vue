<template>
    <Popover placement="top">
        <template #trigger="{ props }">
            <Button v-bind="props">Top Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover placement="bottom">
        <template #trigger="{ props }">
            <Button v-bind="props">Bottom Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover placement="left">
        <template #trigger="{ props }">
            <Button v-bind="props">Left Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover placement="right">
        <template #trigger="{ props }">
            <Button v-bind="props">Right Popover</Button>
        </template>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>
</template>
