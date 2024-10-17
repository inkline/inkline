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
    <Popover events="click">
        <Button>Click Popover</Button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover events="hover">
        <Button>Hover Popover</Button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover events="focus">
        <Button type="submit">Focus Popover</Button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover :events="['focus', 'hover']">
        <Button>Multiple Events Popover</Button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>

    <Popover v-model:visible="visible" events="manual">
        <Button @click="visible = !visible">Manual Popover</Button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </Popover>
</template>
