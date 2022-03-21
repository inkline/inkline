<script lang="ts">
import { IProgress } from '@inkline/inkline/components';

export default {
    components: {
        IProgress
    }
};
</script>
<template>
    <i-progress :min="100" :max="200" >
        <i-progress-bar :value="150" />
    </i-progress>
</template>
