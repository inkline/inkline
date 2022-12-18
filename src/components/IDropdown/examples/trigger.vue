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
    <i-dropdown events="click">
        <i-button>Click Dropdown</i-button>
        <template #body>
            <i-dropdown-item>Action</i-dropdown-item>
            <i-dropdown-item>Another action</i-dropdown-item>
            <i-dropdown-item disabled>Disabled action</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </template>
    </i-dropdown>

    <i-dropdown events="hover">
        <i-button>Hover Dropdown</i-button>
        <template #body>
            <i-dropdown-item>Action</i-dropdown-item>
            <i-dropdown-item>Another action</i-dropdown-item>
            <i-dropdown-item disabled>Disabled action</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </template>
    </i-dropdown>

    <i-dropdown events="focus">
        <i-button type="submit">Focus Dropdown</i-button>
        <template #body>
            <i-dropdown-item>Action</i-dropdown-item>
            <i-dropdown-item>Another action</i-dropdown-item>
            <i-dropdown-item disabled>Disabled action</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </template>
    </i-dropdown>

    <i-dropdown :events="['focus', 'hover']">
        <i-button>Multiple Events Dropdown</i-button>
        <template #body>
            <i-dropdown-item>Action</i-dropdown-item>
            <i-dropdown-item>Another action</i-dropdown-item>
            <i-dropdown-item disabled>Disabled action</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </template>
    </i-dropdown>

    <i-dropdown v-model:visible="visible" events="manual">
        <i-button @click="visible = !visible">Manual Dropdown</i-button>
        <template #body>
            <i-dropdown-item>Action</i-dropdown-item>
            <i-dropdown-item>Another action</i-dropdown-item>
            <i-dropdown-item disabled>Disabled action</i-dropdown-item>
            <i-dropdown-divider />
            <i-dropdown-item>Separated item</i-dropdown-item>
        </template>
    </i-dropdown>
</template>
