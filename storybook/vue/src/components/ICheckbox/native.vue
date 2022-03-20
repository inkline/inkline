<script lang="ts">
import { ICheckbox } from '@inkline/inkline/components';

export default {
    components: {
        ICheckbox
    }
};
</script>
<template>
    <i-checkbox v-model="checked" native>Apple</i-checkbox>
</template>
<script src="./native.js" />
