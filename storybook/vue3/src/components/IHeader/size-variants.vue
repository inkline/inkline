<script lang="ts">
import { IHeader } from '@inkline/inkline/components';

export default {
    components: {
        IHeader
    }
};
</script>
<template>
    <i-header size="sm" class="_text-align:center">
        <h1>Small Inkline Header</h1>
        <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
        <i-button color="primary">Button</i-button>
    </i-header>
    
    <i-header size="md" class="_text-align:center">
        <h1>Medium Inkline Header</h1>
        <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
        <i-button color="primary">Button</i-button>
    </i-header>
    
    <i-header size="lg" class="_text-align:center">
        <h1>Large Inkline Header</h1>
        <p>This is a small header paragraph lorem ipsum dolor sit amet.</p>
        <i-button color="primary">Button</i-button>
    </i-header>
</template>
