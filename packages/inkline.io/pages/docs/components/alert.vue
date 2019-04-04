<template src="./alert.md" lang="md"></template>
<script>
import View from '@components/View';
import {title} from '@helpers/title';
import { IAlert } from '@inkline/inkline';

export default {
    name: 'AlertView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Alert')
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
