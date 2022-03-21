<script lang="ts">
import { ICheckbox } from '@inkline/inkline/components';

export default {
    components: {
        ICheckbox
    }
};
</script>
<template>
    <i-checkbox v-model="checked" indeterminate>Apple</i-checkbox>
</template>
<script src="./indeterminate.js" />
