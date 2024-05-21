<script>
export default {
    data() {
        return {
            value: ''
        };
    }
};
</script>
<template>
    <IInput v-model="value" placeholder="Type something..">
        <template #prepend>
            <IDropdown>
                <IButton>Dropdown</IButton>
                <template #body>
                    <IDropdownItem>Action</IDropdownItem>
                    <IDropdownItem>Another action</IDropdownItem>
                    <IDropdownItem disabled>Disabled action</IDropdownItem>
                    <IDropdownDivider />
                    <IDropdownItem>Separated item</IDropdownItem>
                </template>
            </IDropdown>
        </template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #append>
            <IDropdown>
                <IButton>Dropdown</IButton>
                <template #body>
                    <IDropdownItem>Action</IDropdownItem>
                    <IDropdownItem>Another action</IDropdownItem>
                    <IDropdownItem disabled>Disabled action</IDropdownItem>
                    <IDropdownDivider />
                    <IDropdownItem>Separated item</IDropdownItem>
                </template>
            </IDropdown>
        </template>
    </IInput>

    <IInput v-model="value" placeholder="Type something..">
        <template #prepend>
            <IDropdown>
                <IButton>Dropdown</IButton>
                <template #body>
                    <IDropdownItem>Action</IDropdownItem>
                    <IDropdownItem>Another action</IDropdownItem>
                    <IDropdownItem disabled>Disabled action</IDropdownItem>
                    <IDropdownDivider />
                    <IDropdownItem>Separated item</IDropdownItem>
                </template>
            </IDropdown>
        </template>
        <template #append>
            <IDropdown>
                <IButton>Dropdown</IButton>
                <template #body>
                    <IDropdownItem>Action</IDropdownItem>
                    <IDropdownItem>Another action</IDropdownItem>
                    <IDropdownItem disabled>Disabled action</IDropdownItem>
                    <IDropdownDivider />
                    <IDropdownItem>Separated item</IDropdownItem>
                </template>
            </IDropdown>
        </template>
    </IInput>
</template>
