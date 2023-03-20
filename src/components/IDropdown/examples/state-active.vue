<template>
    <IDropdown>
        <IButton>Dropdown</IButton>
        <template #body>
            <IDropdownItem :to="{ path: '/docs/components/dropdown' }" exact-active-class="-active">
                Active Router Link
            </IDropdownItem>
            <IDropdownItem active>Active Item</IDropdownItem>
        </template>
    </IDropdown>
</template>
