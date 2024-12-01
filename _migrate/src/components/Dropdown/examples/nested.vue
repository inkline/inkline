<template>
    <Dropdown>
        <Button>Dropdown</Button>
        <template #body>
            <Dropdown placement="right">
                <DropdownItem>Dropdown here</DropdownItem>
                <template #body>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Separated item</DropdownItem>
                </template>
            </Dropdown>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>
</template>
