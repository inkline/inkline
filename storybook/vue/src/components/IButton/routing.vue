<script lang="ts">
import { IButton } from '@inkline/inkline/components';

export default {
    components: {
        IButton
    }
};
</script>
<template>
    <i-button href="https://inkline.io">
        Button Link
    </i-button>
    
    <i-button :to="{ name: 'docs-components-button' }">
        Button Route
    </i-button>
</template>
