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
        <i-progress-bar color="success" value="40" />
        <i-progress-bar color="warning" value="20" />
        <i-progress-bar color="danger" value="10" />
    </i-progress>
</template>
