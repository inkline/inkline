<template src="./alert.md" lang="md"></template>
<script>
import View from '@components/View';
import { IAlert } from '@inkline/inkline';

export default {
    name: 'AlertView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Alert'
    },
    components: {
        IAlert
    },
    data() {
        return {
            visible: true
        };
    }
};
</script>
