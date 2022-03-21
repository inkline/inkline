<script lang="ts">
import { ITextarea } from '@inkline/inkline/components';

export default {
    components: {
        ITextarea
    }
};
</script>
<template>
    <i-textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
    </i-textarea>
    
    <i-textarea v-model="value" placeholder="Type something..">
        <template #append>
            <span>.com</span>
        </template>
    </i-textarea>
    
    <i-textarea v-model="value" placeholder="Type something..">
        <template #prepend>
            <span>https://</span>
        </template>
        <template #append>
            <span>.com</span>
        </template>
    </i-textarea>
</template>
<script src="./prepend-append-text.demo.js" />
