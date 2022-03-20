<script lang="ts">
import { IInput } from '@inkline/inkline/components';

export default {
    components: {
        IInput
    }
};
</script>
<template>
    <i-input v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
    </i-input>
    
    <i-input v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </i-input>
    
    <i-input v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </i-input>
</template>
<script src="./prepend-append-text.demo.js" />
