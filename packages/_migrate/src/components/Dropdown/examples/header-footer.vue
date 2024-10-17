<template>
    <Dropdown>
        <Button>Dropdown</Button>
        <template #header> Dropdown Header </template>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
        <template #footer> Dropdown Footer </template>
    </Dropdown>
</template>
