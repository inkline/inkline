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
        size="sm"
    />
    
    <i-select
        v-model="selected"
        :options="options"
        placeholder="Choose something.."
        size="md"
    />
    
    <i-select
        v-model="selected"
        :options="options"
        placeholder="Choose something.."
        size="lg"
    />
</template>
<script src="./size-variants.demo.js" />
