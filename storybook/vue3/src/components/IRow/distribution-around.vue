<script lang="ts">
import { IRow } from '@inkline/inkline/components';

export default {
    components: {
        IRow
    }
};
</script>
<template>
    <i-container>
        <i-row around>
            <i-column xs="3"></i-column>
            <i-column xs="3"></i-column>
            <i-column xs="3"></i-column>
        </i-row>
    </i-container>
</template>
