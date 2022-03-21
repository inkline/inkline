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
        color="light"
    />
    
    <i-select
        v-model="selected"
        :options="options"
        placeholder="Choose something.."
        color="dark"
    />
</template>
<script src="./color-variants.demo.js" />
