<template>
    <IDropdown color="light">
        <IButton color="light">Light Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>

    <IDropdown color="dark">
        <IButton color="dark">Dark Dropdown</IButton>
        <template #body>
            <IDropdownItem>Action</IDropdownItem>
            <IDropdownItem>Another action</IDropdownItem>
            <IDropdownItem disabled>Disabled action</IDropdownItem>
            <IDropdownDivider />
            <IDropdownItem>Separated item</IDropdownItem>
        </template>
    </IDropdown>
</template>
