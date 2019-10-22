<template src="./loader.md" lang="md"></template>
<style src="./loader.scss" lang="scss"></style>
<script>
import View from '@components/docs/View';
import { head } from "@helpers/head";

export default {
    name: 'LoaderView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Loader',
        description: 'Provide a loading state for a component or page using Inkline\'s customizable loading spinner.'
    })
};
</script>
