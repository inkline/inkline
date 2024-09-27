<template>
    <IPopover color="light">
        <IButton color="light">Light Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>

    <IPopover color="dark">
        <IButton color="dark">Dark Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>
</template>
