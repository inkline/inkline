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
        <i-radio value="apple">Apple</i-radio>
        <i-radio value="banana">Banana</i-radio>
        <i-radio value="strawberry">Strawberry</i-radio>
        <i-radio value="mango" disabled>Mango</i-radio>
    </i-radio-group>
</template>
<script src="./disabled.js" />
