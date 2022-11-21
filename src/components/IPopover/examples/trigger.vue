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
    <i-popover events="click">
        <i-button>Click Popover</i-button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </i-popover>

    <i-popover events="hover">
        <i-button>Hover Popover</i-button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </i-popover>

    <i-popover events="focus">
        <i-button type="submit">Focus Popover</i-button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </i-popover>

    <i-popover :events="['focus', 'hover']">
        <i-button>Multiple Events Popover</i-button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </i-popover>

    <i-popover v-model="visible" events="manual">
        <i-button @click="visible = !visible">Manual Popover</i-button>
        <template #header> Popover Header </template>
        <template #body> This is the popover body. Useful information goes here. </template>
        <template #footer> Popover Footer </template>
    </i-popover>
</template>
