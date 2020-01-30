<template src="./loader.md" lang="md"></template>
<style src="./loader.scss" lang="scss"></style>
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";
import { ILoader } from "@inkline/inkline/src/components";

export default {
    name: 'LoaderView',
    layout: 'documentation',
    extends: View,
    head: head('docs-components-loader'),
    components: {
        ILoader
    }
};
</script>
