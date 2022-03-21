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
        label="name"
        placeholder="Choose something.."
    >
        <template #prepend>
            <span>I choose</span>
        </template>
    </i-select>
    
    <i-select
        v-model="selected"
        :options="options"
        label="name"
        placeholder="Choose something.."
    >
        <template #append>
            <span>as an example</span>
        </template>
    </i-select>
    
    <i-select
        v-model="selected"
        :options="options"
        label="name"
        placeholder="Choose something.."
    >
        <template #prepend>
            <span>I choose</span>
        </template>
        <template #append>
            <span>as an example</span>
        </template>
    </i-select>
    
</template>
<script src="./prepend-append-text.demo.js" />
