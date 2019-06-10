<template src="./alert.md" lang="md"></template>
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'AlertView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Alert',
        description: 'Provide contextual feedback messages for typical user actions using Inkline\'s Alert component.'
    }),
    data() {
        return {
            visible: true
        };
    }
};
</script>
