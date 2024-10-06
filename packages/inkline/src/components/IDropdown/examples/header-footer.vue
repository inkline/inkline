<template>
    <IDropdown>
        <IButton>Dropdown</IButton>
        <template #header> Dropdown Header </template>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
        <template #footer> Dropdown Footer </template>
    </IDropdown>
</template>
