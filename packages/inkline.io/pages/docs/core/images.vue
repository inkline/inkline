<template lang="md" src="./images.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    name: 'ImagesView',
    layout: 'documentation',
    extends: View,
    head: head({
        title: 'Images',
        description: 'Documentation and examples for images, using lightweight styles and modifier classes.'
    }),
};
</script>
