<template>
    <Dropdown color="light">
        <Button color="light">Light Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>

    <Dropdown color="dark">
        <Button color="dark">Dark Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>
</template>
