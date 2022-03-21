<script lang="ts">
import { IListGroup } from '@inkline/inkline/components';

export default {
    components: {
        IListGroup
    }
};
</script>
<template>
    <i-list-group :border="false">
        <i-list-group-item>List Group Item</i-list-group-item>
        <i-list-group-item>List Group Item</i-list-group-item>
        <i-list-group-item>List Group Item</i-list-group-item>
        <i-list-group-item>List Group Item</i-list-group-item>
    </i-list-group>
</template>
