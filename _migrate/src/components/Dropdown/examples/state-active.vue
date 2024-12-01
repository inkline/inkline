<template>
    <Dropdown>
        <Button>Dropdown</Button>
        <template #body>
            <DropdownItem :to="{ path: '/' }" exact-active-class="-active">
                Active Router Link
            </DropdownItem>
            <DropdownItem active>Active Item</DropdownItem>
        </template>
    </Dropdown>
</template>
