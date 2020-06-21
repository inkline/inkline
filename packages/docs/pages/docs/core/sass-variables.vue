<template lang="md" src="./sass-variables.md" />
<script>
import View from '~/components/layout/NuxtContentView';

import { IAlert, IIcon } from '@inkline/inkline/src/components';

export default {
    name: 'SassVariablesView',
    layout: 'documentation',
    extends: View,
    components: {
        IAlert,
        IIcon
    }
};
</script>
