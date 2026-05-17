<script>
export default {
    data() {
        return {
            visible: false
        };
    }
};
</script>
<template>
    <Dropdown events="click">
        <Button>Click Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>

    <Dropdown events="hover">
        <Button>Hover Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>

    <Dropdown events="focus">
        <Button type="submit">Focus Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>

    <Dropdown :events="['focus', 'hover']">
        <Button>Multiple Events Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>

    <Dropdown v-model:visible="visible" events="manual">
        <Button @click="visible = !visible">Manual Dropdown</Button>
        <template #body>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated item</DropdownItem>
        </template>
    </Dropdown>
</template>
