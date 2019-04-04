<template lang="md" src="./images.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'ImagesView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Images')
    }
};
</script>
