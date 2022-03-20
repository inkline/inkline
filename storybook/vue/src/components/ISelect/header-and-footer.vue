<script lang="ts">
import { ISelect } from '@inkline/inkline/components';

export default {
    components: {
        ISelect
    }
};
</script>
<template>
    <i-select
        v-model="selected"
        :options="options"
        placeholder="Choose something.."
    >
        <template #header>
            Header
        </template>
        <template #footer>
            Footer
        </template>
    </i-select>
</template>
<script src="./header-and-footer.js" />
