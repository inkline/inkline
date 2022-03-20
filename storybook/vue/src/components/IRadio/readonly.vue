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
        <i-radio value="apple" readonly>Apple</i-radio>
    </i-radio-group>
</template>
<script src="./readonly.js" />
