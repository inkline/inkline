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
    <ITextarea v-model="value" placeholder="Type something..">
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
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
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
    </ITextarea>

    <ITextarea v-model="value" placeholder="Type something..">
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
    </ITextarea>
</template>
