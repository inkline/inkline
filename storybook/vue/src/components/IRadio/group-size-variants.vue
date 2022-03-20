<script lang="ts">
import { IRadio } from '@inkline/inkline/components';

export default {
    components: {
        IRadio
    }
};
</script>
<template>
    <i-radio-group v-model="checked" size="sm">
        <i-radio value="apple">Apple</i-radio>
        <i-radio value="banana">Banana</i-radio>
        <i-radio value="strawberry">Strawberry</i-radio>
        <i-radio value="mango">Mango</i-radio>
    </i-radio-group>
    
    <i-radio-group v-model="checked" size="md">
        <i-radio value="apple">Apple</i-radio>
        <i-radio value="banana">Banana</i-radio>
        <i-radio value="strawberry">Strawberry</i-radio>
        <i-radio value="mango">Mango</i-radio>
    </i-radio-group>
    
    <i-radio-group v-model="checked" size="lg">
        <i-radio value="apple">Apple</i-radio>
        <i-radio value="banana">Banana</i-radio>
        <i-radio value="strawberry">Strawberry</i-radio>
        <i-radio value="mango">Mango</i-radio>
    </i-radio-group>
</template>
<script src="./group-size-variants.demo.js" />
