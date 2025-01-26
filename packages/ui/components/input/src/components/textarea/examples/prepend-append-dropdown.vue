<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
    <Textarea v-model="value" placeholder="Type something..">
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
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
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
    </Textarea>

    <Textarea v-model="value" placeholder="Type something..">
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
    </Textarea>
</template>
