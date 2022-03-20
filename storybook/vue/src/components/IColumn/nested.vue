<script lang="ts">
import { IColumn } from '@inkline/inkline/components';

export default {
    components: {
        IColumn
    }
};
</script>
<template>
    <i-container>
        <i-row>
            <i-column xs="8">
                <i-row>
                    <i-column xs="3"></i-column>
                    <i-column xs="3"></i-column>
                    <i-column xs="3"></i-column>
                    <i-column xs="3"></i-column>
                </i-row>
            </i-column>
            <i-column xs="4">
                <i-row>
                    <i-column xs="6"></i-column>
                    <i-column xs="6"></i-column>
                </i-row>
            </i-column>
        </i-row>
    </i-container>
</template>
