<script lang="ts">
import { ICheckbox } from '@inkline/inkline/components';

export default {
    components: {
        ICheckbox
    }
};
</script>
<template>
    <i-checkbox-group v-model="checked">
        <i-checkbox value="apple">Apple</i-checkbox>
        <i-checkbox value="banana">Banana</i-checkbox>
        <i-checkbox value="strawberry">Strawberry</i-checkbox>
        <i-checkbox value="mango">Mango</i-checkbox>
    </i-checkbox-group>
</template>
<script src="./group.js" />
