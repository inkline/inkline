<script lang="ts">
import { IFormLabel } from '@inkline/inkline/components';

export default {
    components: {
        IFormLabel
    }
};
</script>
<template>
    <i-form-group>
        <i-form-label>Input Label Default</i-form-label>
        <i-input v-model="value" placeholder="Type something.." />
    </i-form-group>
</template>
<script src="./basic.demo.js" />
