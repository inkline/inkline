<script lang="ts">
import { IDropdown } from '@inkline/inkline/components';

export default {
    components: {
        IDropdown
    }
};
</script>
<template>
    <i-dropdown>
        <i-button>Dropdown</i-button>
        <template #body>
            <div class="_padding:1">This is a freeform dropdown example.</div>
        </template>
    </i-dropdown>
</template>
