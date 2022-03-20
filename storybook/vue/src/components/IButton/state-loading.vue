<script lang="ts">
import { IButton } from '@inkline/inkline/components';

export default {
    components: {
        IButton
    }
};
</script>
<template>
    <i-button :loading="true">
        Disabled Default Button
    </i-button>
    
    <i-button :loading="true">
        Button
        <template #loading>
            <i-loader color="dark" class="_margin-right:1/2" />
            Loading
        </template>
    </i-button>
</template>
