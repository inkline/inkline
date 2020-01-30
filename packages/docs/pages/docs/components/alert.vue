<template src="./alert.md" lang="md"></template>
<script>
import View from '@components/docs/View';
import { IAlert } from '@inkline/inkline/src/index';
import { head } from "@helpers/head";

export default {
    name: 'AlertView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-alert'),
    components: { IAlert },
    data() {
        return {
            visible: true
        };
    }
};
</script>
