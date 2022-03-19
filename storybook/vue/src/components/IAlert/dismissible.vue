<script lang="ts">
import { IAlert } from '@inkline/inkline/components';

export default {
    components: {
        IAlert
    },
    data () {
        return {
            visible: true
        };
    }
};
</script>
<template>
    <i-alert v-model="visible" dismissible v-bind="$attrs">
        <p>Whoa! Nicely done. {{ visible }}</p>
    </i-alert>
</template>
