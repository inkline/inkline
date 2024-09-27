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
    <INumberInput v-model="value" placeholder="Enter a number..">
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
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
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
    </INumberInput>

    <INumberInput v-model="value" placeholder="Enter a number..">
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
    </INumberInput>
</template>
