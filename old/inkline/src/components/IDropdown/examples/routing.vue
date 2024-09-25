<template>
    <IDropdown>
        <IButton>Dropdown</IButton>
        <template #body>
            <IDropdownItem href="https://inkline.io">Link</IDropdownItem>
            <IDropdownItem :to="{ path: '/' }">Router Link</IDropdownItem>
        </template>
    </IDropdown>
</template>
