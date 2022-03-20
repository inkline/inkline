<script lang="ts">
import { IProgress } from '@inkline/inkline/components';

export default {
    components: {
        IProgress
    }
};
</script>
<template>
    <i-progress>
        <i-progress-bar :value="65" />
    </i-progress>
</template>
