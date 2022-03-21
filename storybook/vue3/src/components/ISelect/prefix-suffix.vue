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
        <template #prefix>
            <span>@</span>
        </template>
    </i-select>
    
    <i-select
        v-model="selected"
        :options="options"
        label="name"
        placeholder="Choose something.."
    >
        <template #suffix>
            <span>@</span>
        </template>
    </i-select>
    
    <i-select
        v-model="selected"
        :options="options"
        label="name"
        placeholder="Choose something.."
    >
        <template #prefix>
            <span>@</span>
        </template>
        <template #suffix>
            <span>@</span>
        </template>
    </i-select>
</template>
<script src="./prefix-suffix.demo.js" />
