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
    <IDropdown events="click">
        <IButton>Click Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>

    <IDropdown events="hover">
        <IButton>Hover Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>

    <IDropdown events="focus">
        <IButton type="submit">Focus Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>

    <IDropdown :events="['focus', 'hover']">
        <IButton>Multiple Events Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>

    <IDropdown v-model:visible="visible" events="manual">
        <IButton @click="visible = !visible">Manual Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>
</template>
