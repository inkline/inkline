<script lang="ts">
import { INumberInput } from '@inkline/inkline/components';

export default {
    components: {
        INumberInput
    }
};
</script>
<template>
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <span>https://</span>
        </template>
    </i-number-input>
    
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #append>
            <span>.com</span>
        </template>
    </i-number-input>
    
    <i-number-input v-model="value" placeholder="Enter a number..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </i-number-input>
</template>
<script src="./prepend-append-text.demo.js" />
