<script lang="ts">
import { IRadio } from '@inkline/inkline/components';

export default {
    components: {
        IRadio
    }
};
</script>
<template>
    <i-radio-group v-model="checked">
        <i-radio value="apple" native>Apple</i-radio>
        <i-radio value="banana" native>Banana</i-radio>
        <i-radio value="strawberry" native>Strawberry</i-radio>
        <i-radio value="mango" native>Mango</i-radio>
    </i-radio-group>
</template>
<script src="./native.js" />
