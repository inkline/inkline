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
        :label="renderLabel"
        placeholder="Choose something.."
    >
        <template #option="{ option }">
            {{ option.address.city }}, {{ option.address.country }}
        </template>
    </i-select>
</template>
<script src="./rendering-scoped-slot.js" />
