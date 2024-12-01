<template>
    <Dropdown>
        <Button>Dropdown</Button>
        <template #body>
            <DropdownItem href="https://inkline.io">Link</DropdownItem>
            <DropdownItem :to="{ path: '/' }">Router Link</DropdownItem>
        </template>
    </Dropdown>
</template>
