<template lang="md" src="./getting-started.md" />
<script>
import View from '@components/View';
import {title} from '@helpers/title';

export default {
    name: 'GettingStartedView',
    layout: 'documentation',
    extends: View,
    head: {
        title: title('Getting Started')
    }
};
</script>
