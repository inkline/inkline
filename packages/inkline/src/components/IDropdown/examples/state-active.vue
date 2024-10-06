<template>
    <IDropdown>
        <IButton>Dropdown</IButton>
        <template #body>
            <IDropdownItem :to="{ path: '/' }" exact-active-class="-active">
                Active Router Link
            </IDropdownItem>
            <IDropdownItem active>Active Item</IDropdownItem>
        </template>
    </IDropdown>
</template>
