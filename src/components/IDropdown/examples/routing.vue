<template>
    <IDropdown>
        <IButton>Dropdown</IButton>
        <template #body>
            <IDropdownItem href="https://inkline.io">Link</IDropdownItem>
            <IDropdownItem :to="{ path: '/docs/components/dropdown' }">Router Link</IDropdownItem>
        </template>
    </IDropdown>
</template>
