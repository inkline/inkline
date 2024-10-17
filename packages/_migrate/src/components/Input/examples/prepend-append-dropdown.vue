<script>
export default {
    data() {
        return {
            value: ''
        };
    }
};
</script>
<template>
    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <Dropdown>
                <Button>Dropdown</Button>
                <template #body>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Separated item</DropdownItem>
                </template>
            </Dropdown>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #append>
            <Dropdown>
                <Button>Dropdown</Button>
                <template #body>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Separated item</DropdownItem>
                </template>
            </Dropdown>
        </template>
    </Input>

    <Input v-model="value" placeholder="Type something..">
        <template #prepend>
            <Dropdown>
                <Button>Dropdown</Button>
                <template #body>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Separated item</DropdownItem>
                </template>
            </Dropdown>
        </template>
        <template #append>
            <Dropdown>
                <Button>Dropdown</Button>
                <template #body>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Separated item</DropdownItem>
                </template>
            </Dropdown>
        </template>
    </Input>
</template>
