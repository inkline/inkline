<template src="./alert.md" lang="md"></template>
<script>
import View from '~/components/layout/NuxtContentView';

export default {
    name: 'AlertView',
    extends: View,
    data() {
        return {
            visible: true
        };
    }
};
</script>
