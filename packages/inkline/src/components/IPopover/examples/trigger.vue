<script>
export default {
    data() {
        return {
            visible: false
        };
    }
};
</script>
<template>
    <IPopover events="click">
        <IButton>Click Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>

    <IPopover events="hover">
        <IButton>Hover Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>

    <IPopover events="focus">
        <IButton type="submit">Focus Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>

    <IPopover :events="['focus', 'hover']">
        <IButton>Multiple Events Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>

    <IPopover v-model:visible="visible" events="manual">
        <IButton @click="visible = !visible">Manual Popover</IButton>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </IPopover>
</template>
