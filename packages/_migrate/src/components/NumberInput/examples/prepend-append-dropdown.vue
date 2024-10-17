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
    <NumberInput v-model="value" placeholder="Enter a number..">
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
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
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
    </NumberInput>

    <NumberInput v-model="value" placeholder="Enter a number..">
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
    </NumberInput>
</template>
